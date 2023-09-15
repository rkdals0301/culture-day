<template>
  <div id="app">
    <snackbar></snackbar>
    <Map ref="map"></Map>
  </div>
</template>

<script>
import Snackbar from "@/components/common/Snackbar.vue";
import Map from "@/components/map/Map.vue";

export default {
  name: "App",
  components: {
    Snackbar,
    Map,
  },
  data() {
    return {};
  },
  created() {
    console.log("hi");
  },
  mounted() {
    this.$refs.map.init();
  },
};
</script>

<style lang="scss">
@import "./assets/css/reset.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}
</style>
