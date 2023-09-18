<template>
  <div id="app">
    <Map ref="map" :cultureList="cultureList"></Map>
    <item-list-handler></item-list-handler>
    <snackbar></snackbar>
  </div>
</template>

<script>
import cultureAPI from "@/services/api/culture";
import SnackbarType from "@/utils/define/SnackbarType";
import Map from "@/components/map/Map.vue";
import Snackbar from "@/components/common/Snackbar.vue";
import ItemListHandler from "./components/item-list/ItemListHandler.vue";

export default {
  name: "App",
  components: {
    Snackbar,
    Map,
    ItemListHandler,
  },
  data() {
    return {
      cultureList: null
    }
  },
  created() {
    this.loadCultureList();
  },
  methods: {
    async loadCultureList() {
      try {
        const response = await cultureAPI.lookupCultureList()
        this.cultureList = response?.data?.culturalEventInfo?.row
        console.log('response >', response?.data?.culturalEventInfo?.row)
      } catch (error) {
        this.$root.showSnackbar(SnackbarType.ERROR, error);
      }
    },
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
  position: relative;
}
</style>
