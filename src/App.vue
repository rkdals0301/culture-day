<template>
  <div class="app-layout">
    <CultureMap ref="map" />
    <sidebar ref="handler" @onClickItem="onClickItem" />
    <snackbar />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import SnackbarType from '@/utils/define/SnackbarType';
import CultureMap from '@/components/map/Map.vue';
import Sidebar from '@/components/sidebar/Sidebar.vue';
import Snackbar from '@/components/common/Snackbar.vue';

export default {
  name: 'App',
  components: {
    CultureMap,
    Sidebar,
    Snackbar,
  },
  created() {
    this.loadCultures();
  },
  methods: {
    ...mapActions('culture', ['fetchCultures']),
    ...mapActions('snackbar', ['showSnackbar']),
    async loadCultures() {
      try {
        await this.fetchCultures();
        await this.$nextTick();
        this.$refs['map'].addMarkers();
      } catch (error) {
        this.showSnackbar({ type: SnackbarType.ERROR, text: error });
      }
    },
    onClickItem(id) {
      this.$refs['map'].onClickMarker(id, true);
    },
  },
};
</script>

<style lang="scss" scoped>
.app-layout {
  width: 100dvw;
  height: 100dvh;
  position: relative;
}
</style>
