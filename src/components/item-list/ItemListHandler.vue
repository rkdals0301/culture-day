<template>
  <div class="list-wrapper">
    <div class="list-container">
      <search-box ref="search"></search-box>
      <item-list ref="list"></item-list>
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
    return {};
  },
};
</script>

<style scoped>
.list-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 330px;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;

  /*
  border: 1px solid red;
  background: rgba(255, 0, 0, 0.3);
  */
}
.list-container {
  position: relative;
  width: 100%;
  height: 100%;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.24);
}
</style>
