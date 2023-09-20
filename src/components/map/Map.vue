<template>
    <div id="map" style="width: 100%; height: 100%"></div>
</template>

<script>
import { makeMarkerClustering } from "@/plugins/MarkerClustering.js";
import { mapState } from 'vuex';

export default {
    name: "Map",
    data() {
        return {
            map: null,
            markerList: null,
            infoWindows: null,
        };
    },
    watch: {
        // TODO: 타이밍 이슈
        "rawCultures": {
            handler() {
                this.addMarkerList()
            },
        }
    },
    computed: {
        ...mapState('culture', ['rawCultures', 'cultures']),
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
            window.naver.maps.Event.addListener(this.map, 'idle', () => {
        
            });
            window.naver.maps.Event.addListener(this.map, 'click', () => {
                if (!this.$_.isEmpty(this.infoWindows)) {
                    this.infoWindows.forEach((infoWindow) => {
                        if (infoWindow.getMap()) {
                            infoWindow.close();
                        }
                    });
                }
            });
        },
        addMarkerList() {
            this.markerList = [];
            this.infoWindows = [];
            this.rawCultures.forEach(({ LOT: lat, LAT: lng, TITLE: title, CODENAME: codeName, IS_FREE: isFree, DATE: date }, index) => {
                const content = 
                `<div class="info-window-wrapper">
                    <div class="info-window">
                        <div class="title">${title}</div>
                        <div class="content">${codeName}</div>
                        <div class="content">${date}</div>
                        <div class="content">${isFree}</div>
                        <div class="button-wrapper">
                        <button type="button" id="detail_button_${index}">상세보기</button>  
                        </div>
                    </div>
                </div>`;

                this.infoWindows.push(new window.naver.maps.InfoWindow({
                    borderWidth: 0,
                    disableAnchor: true,
                    backgroundColor: 'transparent',
                    pixelOffset: new window.naver.maps.Point(0, -10),
                    content  
                }));

                this.markerList.push(
                    new window.naver.maps.Marker({
                        position: new window.naver.maps.LatLng(lat, lng),
                    })
                );

                window.naver.maps.Event.addListener(this.markerList[index], "click", () => {
                    if (this.infoWindows[index].getMap()) {
                        this.infoWindows[index].close();
                    } else {
                        this.infoWindows[index].open(this.map, this.markerList[index]);
                        const clickButton = document.getElementById(`detail_button_${index}`)
                        clickButton.addEventListener('click', () => {
                            this.showCultureDetailModal(this.rawCultures[index]);
                        })
                    }
                });
            })

            this.updateMarkerList();
        },
        showCultureDetailModal(culture) {
            this.$emit('showCultureDetailModal', culture);
        },
        moveTo() {
            // this.map.panTo(new window.naver.maps.LatLng(lat, lng));
        },
        updateMarkerList() {
            const htmlMarker1 = {
                content: '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-1.png);background-size:contain;"></div>',
                size: window.naver.maps.Size(40, 40),
                anchor: window.naver.maps.Point(20, 20),
            };
            const htmlMarker2 = {
                content: '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-2.png);background-size:contain;"></div>',
                size: window.naver.maps.Size(40, 40),
                anchor: window.naver.maps.Point(20, 20),
            };
            const htmlMarker3 = {
                content: '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-3.png);background-size:contain;"></div>',
                size: window.naver.maps.Size(40, 40),
                anchor: window.naver.maps.Point(20, 20),
            };
            const htmlMarker4 = {
                content: '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-4.png);background-size:contain;"></div>',
                size: window.naver.maps.Size(40, 40),
                anchor: window.naver.maps.Point(20, 20),
            };
            const htmlMarker5 = {
                content: '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-5.png);background-size:contain;"></div>',
                size: window.naver.maps.Size(40, 40),
                anchor: window.naver.maps.Point(20, 20),
            };

            const MarkerClustering = makeMarkerClustering(window.naver);
            new MarkerClustering({
                minClusterSize: 2,
                maxZoom: 14,
                map: this.map,
                markers: this.markerList,
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
                    clusterMarker.getElement().querySelector('div:first-child').innerText = count;
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
::v-deep .info-window-wrapper  {
    width: 300px; 
    height: fit-content; 
    position: relative;
    background: rgb(255, 255, 255); 
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 4px; 
    box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 4px 0px; 
    ::after {
        content: '';
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
            font-size: 16px; 
            color: rgb(0, 104, 195); 
            line-height: 22px;
        }
        .content {
            font-size: 14px; 
            color: grey; 
        }
        .button-wrapper {
            display: flex; 
            justify-content: flex-end;
        }
    }
}
</style>
