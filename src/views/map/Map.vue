<template>
  <div id="map" style="width: 100%; height: 100%"></div>
</template>

<script>
export default {
  name: "Map",

  mounted() {
    this.init();
  },

  methods: {
    init() {
      // load naver maps API
      const script = document.createElement("script");
      const mapUrl = process.env.VUE_APP_MAP_URL;
      const key = process.env.VUE_APP_MAP_CLIENT_ID;

      script.src = mapUrl + "=" + key;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      script.onload = () => {
        // create naver maps
        new window.naver.maps.Map("map", {
          center: new window.naver.maps.LatLng(37.5670135, 126.978374),
          zoom: 14,
        });
      };
    },
  },
};
</script>

<style scoped></style>
