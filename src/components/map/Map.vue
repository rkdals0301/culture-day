<template>
    <div id="map" class="map" />
</template>

<script>
import { makeMarkerClustering } from "@/plugins/MarkerClustering.js";
import { MarkerOverlappingRecognizer } from "@/plugins/MarkerOverlappingRecognizer.js";
import { mapState } from "vuex";
import icon_marker from "@/assets/icon_marker.png";
import icon_marker_selected from "@/assets/icon_marker_selected.png";

export default {
    name: "Map",
    data() {
        return {
            map: null,
            recognizer: null,
            marker: {},
            markers: [],
            markerMap: new Map(),
            infoWindow: {},
            markerIcon: {},
            selectedMarkerIcon: {},
        };
    },
    computed: {
        ...mapState("culture", ["cultures", "cultureMap"]),
    },
    mounted() {
        this.init();
    },
    beforeDestroy() {
        this.removeEventListener();
    },
    methods: {
        init() {
            const script = document.createElement("script");
            const mapUrl = process.env.VUE_APP_MAP_URL;
            const clientId = process.env.VUE_APP_MAP_CLIENT_ID;
            script.src = `${mapUrl}?ncpClientId=${clientId}`;
            script.defer = true;
            script.addEventListener("load", () => {
                this.initMap();
            });

            document.head.appendChild(script);
        },
        initMap() {
            this.map = new window.naver.maps.Map("map", {
                center: new window.naver.maps.LatLng(37.5665, 126.978), // Seoul
                zoom: 15,
                scaleControl: false,
                mapDataControl: false,
                mapTypeControl: false,
                zoomControl: true,
                zoomControlOptions: {
                    style: window.naver.maps.ZoomControlStyle.SMALL,
                    position: window.naver.maps.Position.BOTTOM_RIGHT,
                },
                logoControlOptions: {
                    position: window.naver.maps.Position.BOTTOM_LEFT,
                },
            });

            this.recognizer = new MarkerOverlappingRecognizer({
                highlightRect: false,
                tolerance: 5,
            });

            this.recognizer.setMap(this.map);

            window.naver.maps.Event.once(this.map, "init", () => {
                this.addEventListener();
            });
        },
        addEventListener() {
            window.naver.maps.Event.addListener(
                this.map,
                "idle",
                this.idleEventHandler
            );
            window.naver.maps.Event.addListener(
                this.map,
                "click",
                this.clickEventHandler
            );
            window.naver.maps.Event.addListener(
                this.map,
                "zoom_changed",
                this.zoomChangedEventHandler
            );
            window.naver.maps.Event.addListener(
                this.recognizer,
                "clickItem",
                this.clickItemEventHandler
            );
        },
        removeEventListener() {
            window.naver.maps.Event.removeListener(
                this.map,
                "idle",
                this.idleEventHandler
            );
            window.naver.maps.Event.removeListener(
                this.map,
                "click",
                this.clickEventHandler
            );
            window.naver.maps.Event.removeListener(
                this.map,
                "zoom_changed",
                this.zoomChangedEventHandler
            );
            window.naver.maps.Event.removeListener(
                this.recognizer,
                "clickItem",
                this.clickItemEventHandler
            );
        },
        idleEventHandler() {},
        clickEventHandler() {
            if (!this.$_.isEmpty(this.marker)) {
                this.marker.setZIndex(100);
                this.marker.setIcon(this.markerIcon);
            }
            if (!this.$_.isEmpty(this.infoWindow) && this.infoWindow.getMap()) {
                this.infoWindow.close();
            }
        },
        zoomChangedEventHandler(zoom) {
            if (zoom < 16) {
                this.clickEventHandler();
            }
        },
        clickItemEventHandler() {
            this.recognizer.hide();
        },
        addMarkers(tryCount = 0) {
            if (tryCount >= 10) {
                alert("Error Load Naver Map");
                return;
            }

            if (this.$_.isEmpty(this.map)) {
                setTimeout(() => {
                    this.addMarkers(tryCount + 1);
                }, 250);
            }

            this.marker = {};
            this.markers = [];
            this.markerMap = new Map();

            const commonIcon = {
                size: new window.naver.maps.Size(32, 32),
                scaledSize: new window.naver.maps.Size(32, 32),
                origin: new window.naver.maps.Point(0, 0),
                anchor: new window.naver.maps.Point(16, 24),
            };

            this.markerIcon = {
                url: icon_marker,
                ...commonIcon,
            };

            this.selectedMarkerIcon = {
                url: icon_marker_selected,
                ...commonIcon,
            };

            this.markers = this.cultures.map(
                ({ id, lot: lat, lat: lng, title }) =>
                    new window.naver.maps.Marker({
                        id,
                        position: new window.naver.maps.LatLng(lat, lng),
                        title,
                        icon: this.markerIcon,
                        zIndex: 100,
                    })
            );

            this.markers.forEach((marker) => {
                window.naver.maps.Event.addListener(marker, "click", () => {
                    this.onClickMarker(marker.id);
                });

                this.recognizer.add(marker);
                this.markerMap.set(marker.id, marker);
            });

            this.updateMarkers();
        },
        onClickMarker(id) {
            if (!this.$_.isEmpty(this.marker) && this.marker.id !== id) {
                this.marker.setIcon(this.markerIcon);
                this.marker.setZIndex(100);
            }

            this.marker = this.markerMap.get(id);
            this.marker.setIcon(this.selectedMarkerIcon);
            this.marker.setZIndex(1000);
            this.map.setZoom(16);
            this.map.setCenter(this.marker.getPosition());

            this.createInfoWindow(id);
            this.infoWindow.open(this.map, this.marker);
            const infoWindowId = `info-window-wrapper-${id}`;
            const infoWindowWrapperElement =
                document.getElementById(infoWindowId);
            infoWindowWrapperElement.addEventListener("click", () => {
                this.showCultureDetailModal(id);
            });
        },
        createInfoWindow(id) {
            const {
                title,
                codename: codeName,
                date,
                is_free: isFree,
                use_fee: useFee,
            } = this.cultureMap.get(id);
            const infoWindowId = `info-window-wrapper-${id}`;
            const content = `<div id=${infoWindowId} class="info-window-wrapper">
                        <div class="info-window">
                            <div class="title">${title || "-"}</div>
                            <div class="content">${date || "-"}</div>
                            <div class="content">${isFree || "-"} / ${
                codeName || "-"
            }</div>
                            <div class="content">${useFee || "-"}</div>
                        </div>
                    </div>`;

            this.infoWindow = new window.naver.maps.InfoWindow({
                id: infoWindowId,
                borderWidth: 0,
                disableAnchor: true,
                backgroundColor: "transparent",
                pixelOffset: new window.naver.maps.Point(0, -10),
                content,
            });
        },
        showCultureDetailModal(id) {
            const culture = this.cultureMap.get(id);
            this.$emit("showCultureDetailModal", culture);
        },
        updateMarkers() {
            const size = window.naver.maps.Size(40, 40);
            const anchor = window.naver.maps.Point(20, 20);
            const images = [
                "cluster-marker-1.png",
                "cluster-marker-2.png",
                "cluster-marker-3.png",
                "cluster-marker-4.png",
                "cluster-marker-5.png",
            ];
            const htmlMarkers = images.map((image) => {
                return {
                    content: `<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:0.625rem;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/${image});background-size:contain;"></div>`,
                    size,
                    anchor,
                };
            });
            const MarkerClustering = makeMarkerClustering(window.naver);
            new MarkerClustering({
                minClusterSize: 1,
                maxZoom: 16,
                map: this.map,
                markers: this.markers,
                disableClickZoom: false,
                averageCenter: true,
                gridSize: 400,
                icons: htmlMarkers,
                indexGenerator: [10, 100, 200, 500, 1000],
                stylingFunction: (clusterMarker, count) => {
                    clusterMarker
                        .getElement()
                        .querySelector("div:first-child").innerText = count;
                },
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.map {
    height: 100dvh;
}

:deep(.info-window-wrapper) {
    width: 400px;
    height: fit-content;
    position: relative;
    background: rgb(255, 255, 255);
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px 0px;
    cursor: pointer;
    ::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-top-color: #ffffff;
        border-bottom: 0;
        margin-left: -6px;
        margin-bottom: -6px;
    }
    .info-window {
        padding: 15px 20px;
        font-weight: 700;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 5px;
        .title {
            font-size: 1rem;
            color: rgb(0, 104, 195);
        }
        .content {
            font-size: 0.875rem;
            color: grey;
        }
        .button-wrapper {
            display: flex;
            justify-content: flex-end;
        }
    }
}
</style>
