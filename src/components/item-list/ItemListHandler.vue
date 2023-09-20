<template>
  <div
    class="list-wrapper"
    :style="`height: ${listVisibleStatus ? '100%' : 'auto'}`"
  >
    <div
      class="list-container"
      :style="
        listVisibleStatus ? 'box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.24)' : ''
      "
    >
      <search-box ref="search" @open="openList" @search="search"></search-box>
    </div>
    <div v-show="listVisibleStatus">
      <transition name="fade">
        <item-list
          ref="list"
          v-show="listVisibleStatus"
          :cultures="cultures"
        ></item-list>
      </transition>
    </div>
  </div>
</template>

<script>
import ItemList from "./ItemList.vue";
import SearchBox from "./SearchBox.vue";
export default {
    components: { ItemList, SearchBox },
    name: "ItemListHandler",
    data() {
        return {
            cultures: [],
            listVisibleStatus: false,
        };
    },

    methods: {
        setCultures(cultures = []) {
            this.cultures = cultures;
        },
        openList() {
            this.listVisibleStatus = true;
        },
        search(keyword = "") {
            console.log("...", keyword);
        },
    },
};
</script>

<style scoped>
.list-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 330px;
}
.list-container {
  position: relative;
  width: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
