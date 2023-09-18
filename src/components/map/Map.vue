<template>
  <div id="map" style="width: 100%; height: 100%"></div>
</template>

<script>
import { makeMarkerClustering } from '@/plugins/MarkerClustering.js'

export default {
  name: "Map",
  props: {
    cultureList: {
      type: Array,
      default: () => []
    }
  },
  watch: {
		cultureList: {
      deep: true,
			handler() {
				this.addMarkerList()
			},
		}
	},
  data() {
    return {
      map: null,
      markers: null,
      infoWindows: null,
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const script = document.createElement("script");
      const mapUrl = process.env.VUE_APP_MAP_URL;
      const clientId = process.env.VUE_APP_MAP_CLIENT_ID;
      script.src = `${mapUrl}?ncpClientId=${clientId}`;
      document.head.appendChild(script);

      script.onload = () => {
        this.initMap()
        this.addEventListener()
      };
    },
    initMap() {
      this.map = new window.naver.maps.Map("map", {
        center: new window.naver.maps.LatLng(37.566655, 126.978379),
        zoom: 15
      });

      
    },
    addEventListener() {
      window.naver.maps.Event.addListener(this.map, 'idle', () => {
        if (!this.$_.isEmpty(this.infoWindows)) {
          this.infoWindows.forEach((infoWindow) => {
            if (infoWindow.getMap()) {
                infoWindow.close();
            }
          })
        }
      });
    },
    addMarkerList() {
      this.markers = []
      this.infoWindows = []
      this.cultureList.forEach(({ LOT: lat, LAT: lng, TITLE: title, CODENAME: codeName, IS_FREE: isFree, DATE: date }, index) => {
        var contentElement = 
        `<div style="width: 300px; height: fit-content; background: rgb(255, 255, 255); box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 4px 0px; border-radius: 4px; border: 1px solid rgba(0, 0, 0, 0.05);">
          <div style="height: 100%; padding: 15px 20px; font-size: 14px; font-weight: 700; color: grey; display: flex; flex-direction: column; justify-content: center; gap: 5px;">
            <div style="font-size: 16px; color: rgb(0, 104, 195);">${title}</div>
            <div>${codeName}</div>
            <div>${date}</div>
            <div>${isFree}</div>
            <div style="display: flex; justify-content: flex-end;">
              <button type="button">상세보기</button>  
            </div>
          </div>
        </div>`

        this.infoWindows.push(new window.naver.maps.InfoWindow({
          borderWidth: 0,
          disableAnchor: true,
          backgroundColor: 'transparent',
          pixelOffset: new window.naver.maps.Point(0, -28),
          content: contentElement  
        }));

        this.markers.push(new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(lat, lng),
        }));

        window.naver.maps.Event.addListener(this.markers[index], "click", () => {
          this.map.setCenter(new window.naver.maps.LatLng(lat, lng),);
          if (this.infoWindows[index].getMap()) {
              this.infoWindows[index].close();
          } else {
              this.infoWindows[index].open(this.map, this.markers[index]);
          }
        });
      })

      this.updateMarkers();
    },
    updateMarkers() {
      const htmlMarker1 = {
        content:
          '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-1.png);background-size:contain;"></div>',
        size: window.naver.maps.Size(40, 40),
        anchor: window.naver.maps.Point(20, 20),
      }
      const htmlMarker2 = {
        content:
          '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-2.png);background-size:contain;"></div>',
        size: window.naver.maps.Size(40, 40),
        anchor: window.naver.maps.Point(20, 20),
      }
      const htmlMarker3 = {
        content:
          '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-3.png);background-size:contain;"></div>',
        size: window.naver.maps.Size(40, 40),
        anchor: window.naver.maps.Point(20, 20),
      }
      const htmlMarker4 = {
        content:
          '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-4.png);background-size:contain;"></div>',
        size: window.naver.maps.Size(40, 40),
        anchor: window.naver.maps.Point(20, 20),
      }
      const htmlMarker5 = {
        content:
          '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-5.png);background-size:contain;"></div>',
        size: window.naver.maps.Size(40, 40),
        anchor: window.naver.maps.Point(20, 20),
      }

      const MarkerClustering = makeMarkerClustering(window.naver)
      new MarkerClustering({
        minClusterSize: 2,
        maxZoom: 14,
        map: this.map,
        markers: this.markers,
        disableClickZoom: false,
        gridSize: 500,
        icons: [htmlMarker1, htmlMarker2, htmlMarker3, htmlMarker4, htmlMarker5],
        indexGenerator: [10, 100, 200, 500, 1000],
        stylingFunction: function(clusterMarker, count) {
          clusterMarker.getElement().querySelector('div:first-child').innerText = count
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
