<template>
  <div>
    <div ref="side-menu" class="sidebar-wrapper" :style="`height: ${listVisibleStatus ? '100dvh' : 'auto'}`">
      <search-box ref="search" :listVisibleStatus="listVisibleStatus" @open="openList" @close="closeList" />
      <item-list v-show="listVisibleStatus" @onClickItem="onClickItem" />
    </div>
    <!-- <div v-show="listVisibleStatus" class="overlay" :class="{ show: listVisibleStatus }" @click="closeList"></div> -->
  </div>
</template>

<script>
import ItemList from './ItemList.vue';
import SearchBox from './SearchBox.vue';

export default {
  name: 'Sidebar',
  components: { ItemList, SearchBox },
  data() {
    return {
      listVisibleStatus: false,
    };
  },
  methods: {
    openList() {
      this.listVisibleStatus = true;
    },
    closeList() {
      this.listVisibleStatus = false;
    },
    onClickItem(id) {
      this.closeList();
      this.$emit('onClickItem', id);
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar-wrapper {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100; // naver map logo : 99
}

// .fade-enter-active,
// .fade-leave-active {
//   transition: opacity 0.5s;
// }
// .fade-enter,
// .fade-leave-to {
//   opacity: 0;
// }
// .overlay {
//   width: 100dvw;
//   height: 100dvh;
//   background-color: rgba(0, 0, 0, 0.1);
//   position: absolute;
//   top: 0;
//   left: 0;
//   display: none;
//   &.show {
//     display: block;
//   }
// }
</style>
