<template>
  <div id="app">
    <Map ref="map" @showCultureDetailModal="showCultureDetailModal"></Map>
    <item-list-handler ref="handler"></item-list-handler>
    <item-detail-modal ref="item-detail-modal"></item-detail-modal>
    <snackbar></snackbar>
  </div>
</template>

<script>
import cultureAPI from "@/services/api/culture";
import SnackbarType from "@/utils/define/SnackbarType";
import Map from "@/components/map/Map.vue";
import Snackbar from "@/components/common/Snackbar.vue";
import ItemListHandler from "./components/item-list/ItemListHandler.vue";
import ItemDetailModal from "./components/map/ItemDetailModal.vue";
import { mapState, mapMutations } from "vuex";

export default {
  name: "App",
  components: {
    Map,
    ItemListHandler,
    ItemDetailModal,
    Snackbar,
  },
  data() {
    return {
      // cultureList: null,
    };
  },
  created() {
    this.loadCultureList();
  },
  computed: {
    ...mapState("culture", ["rawCultures"]),
  },
  methods: {
    ...mapMutations("culture", ["initCultures"]),
    async loadCultureList() {
      try {
        const response = await cultureAPI.lookupCultureList();
        console.log("response >", response?.data?.culturalEventInfo?.row);
        // this.setRawCultures(response?.data?.culturalEventInfo?.row);
        this.initCultures(response?.data?.culturalEventInfo?.row);
        // this.cultureList = response?.data?.culturalEventInfo?.row;
        // this.$refs['map'].setCultureList(this.cultureList);
        // this.$refs.handler.setCultures(this.cultureList);
      } catch (error) {
        this.$root.showSnackbar(SnackbarType.ERROR, error);
      }
    },
    showCultureDetailModal(culture) {
      this.$refs["item-detail-modal"].show(culture);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./assets/css/reset.css";
@import "./styles/global.scss";

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
