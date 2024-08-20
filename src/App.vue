<template>
  <div id="app">
    <Map ref="map" />
    <sidebar ref="handler" @onClickItem="onClickItem" />
    <snackbar />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import SnackbarType from '@/utils/define/SnackbarType';
import Map from '@/components/map/Map.vue';
import Sidebar from '@/components/sidebar/Sidebar.vue';
import Snackbar from '@/components/common/Snackbar.vue';

export default {
  name: 'App',
  components: {
    Map,
    Sidebar,
    Snackbar,
  },
  created() {
    this.loadCultures();
  },
  methods: {
    ...mapActions('culture', ['fetchCultures']),
    async loadCultures() {
      try {
        await this.fetchCultures();
        await this.$nextTick();
        this.$refs['map'].addMarkers();
      } catch (error) {
        this.$root.showSnackbar(SnackbarType.ERROR, error);
      }
    },
    onClickItem(id) {
      this.$refs['map'].onClickMarker(id);
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  width: 100dvw;
  height: 100dvh;
  position: relative;
}
</style>
