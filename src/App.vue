<template>
  <div id="app">
    <snackbar></snackbar>
    <Map></Map>
  </div>
</template>

<script>
import Snackbar from "@/components/common/Snackbar.vue";
import Map from "@/views/map/Map.vue";

export default {
  name: "App",
  components: {
    Snackbar,
    Map,
  },
  data() {
    return {};
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
