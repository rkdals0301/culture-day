<template>
  <div id="app">
    <Map ref="map"></Map>
    <snackbar></snackbar>
  </div>
</template>

<script>
import cultureAPI from '@/services/api/culture'
import SnackbarType from '@/utils/define/SnackbarType'
import Map from "@/components/map/Map.vue"
import Snackbar from "@/components/common/Snackbar.vue"

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
    this.loadCultureList()
  },
  mounted() {
    this.$refs.map.init();
  },
  methods: {
    async loadCultureList() {
      try {
        const response = await cultureAPI.lookupCultureList()
        console.log('response >', response?.data?.culturalEventInfo)
      } catch (error) {
        this.$root.showSnackbar(SnackbarType.ERROR, error)
      }
    }
  }
}
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
