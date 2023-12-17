<template>
    <div id="map" style="height: 100%" />
</template>

<script>
import { makeMarkerClustering } from "@/plugins/MarkerClustering.js";
import { mapState } from "vuex";

export default {
    name: "Map",
    data() {
        return {
            map: null,
            markers: [],
            markerMap: new Map(),
            infoWindow: {},
        };
    },
    computed: {
        ...mapState("culture", ["cultures", "cultureMap"]),
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            const script = document.createElement("script");
            const mapUrl = process.env.VUE_APP_MAP_URL;
            const clientId = process.env.VUE_APP_MAP_CLIENT_ID;
            script.src = `${mapUrl}?ncpClientId=${clientId}`;
            document.head.appendChild(script);

            script.onload = () => {
                this.initMap();
                this.addEventListener();
            };
        },
        initMap() {
            this.map = new window.naver.maps.Map("map", {
                center: new window.naver.maps.LatLng(37.566655, 126.978379),
                zoom: 15,
            });
        },
        addEventListener() {
            window.naver.maps.Event.addListener(this.map, "idle", () => {});
            window.naver.maps.Event.addListener(this.map, "click", () => {
                if (
                    !this.$_.isEmpty(this.infoWindow) &&
                    this.infoWindow.getMap()
                ) {
                    this.infoWindow.close();
                }
            });
        },
        addMarkers() {
            this.markers = [];
            this.markerMap = new Map();

            this.markers = this.cultures.map(
                ({ id: id, lot: lat, lat: lng }) => {
                    return new window.naver.maps.Marker({
                        id: id,
                        position: new window.naver.maps.LatLng(lat, lng),
                    });
                }
            );

            this.markers.forEach((marker) => {
                window.naver.maps.Event.addListener(marker, "click", () =>
                    this.onClickMarker(marker.id)
                );

                this.markerMap.set(marker.id, marker);
            });

            this.updateMarkers();
        },
        onClickMarker(id) {
            const marker = this.markerMap.get(id);
            this.map.setZoom(15);
            this.map.setCenter(marker.getPosition());

            this.createInfoWindow(id);
            this.infoWindow.open(this.map, marker);
            const infoWindowId = `info-window-wrapper-${id}`;
            const infoWindowWrapperElement =
                document.getElementById(infoWindowId);
            infoWindowWrapperElement.addEventListener("click", () => {
                this.showCultureDetailModal(id); // TODO.. BUG 이벤트 처리
            });
        },
        createInfoWindow(id) {
            const {
                title: title,
                codename: codeName,
                date: date,
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
            const htmlMarker1 = {
                content:
                    '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:0.625rem;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-1.png);background-size:contain;"></div>',
                size: window.naver.maps.Size(40, 40),
                anchor: window.naver.maps.Point(20, 20),
            };
            const htmlMarker2 = {
                content:
                    '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:0.625rem;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-2.png);background-size:contain;"></div>',
                size: window.naver.maps.Size(40, 40),
                anchor: window.naver.maps.Point(20, 20),
            };
            const htmlMarker3 = {
                content:
                    '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:0.625rem;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-3.png);background-size:contain;"></div>',
                size: window.naver.maps.Size(40, 40),
                anchor: window.naver.maps.Point(20, 20),
            };
            const htmlMarker4 = {
                content:
                    '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:0.625rem;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-4.png);background-size:contain;"></div>',
                size: window.naver.maps.Size(40, 40),
                anchor: window.naver.maps.Point(20, 20),
            };
            const htmlMarker5 = {
                content:
                    '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:0.625rem;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-5.png);background-size:contain;"></div>',
                size: window.naver.maps.Size(40, 40),
                anchor: window.naver.maps.Point(20, 20),
            };

            const MarkerClustering = makeMarkerClustering(window.naver);
            new MarkerClustering({
                minClusterSize: 2,
                maxZoom: 14,
                map: this.map,
                markers: this.markers,
                disableClickZoom: false,
                gridSize: 500,
                icons: [
                    htmlMarker1,
                    htmlMarker2,
                    htmlMarker3,
                    htmlMarker4,
                    htmlMarker5,
                ],
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
:deep(.info-window-wrapper) {
    width: 400px;
    height: fit-content;
    position: relative;
    background: rgb(255, 255, 255);
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 4px 0px;
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
