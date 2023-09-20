<template>
  <div class="item-list-wrapper">
    <div class="item-list-header-wrapper">
      <div style="color: #2a6b39; font-weight: bold">전체보기</div>
      <div>이번주</div>
      <div>무료</div>
      <div>축제</div>
      <div>음악회</div>
      <!-- <div style="color: red; font-weight: bold">핫이슈</div> -->
    </div>
    <div class="item-list-content-wrapper">
      <item
        v-for="(culture, idx) in cultures"
        :key="`${culture['TITLE']}-${idx}`"
        :culture="culture"
        :idx="idx"
      ></item>
    </div>
  </div>
</template>

<script>
import Item from "./item/Item.vue";

export default {
    name: "ItemList",
    components: { Item },
    props: {
        cultures: Array,
    },
    data() {
        return {};
    },
    mounted() {
        
    },
};
</script>

<style scoped>
.item-list-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.item-list-header-wrapper {
  width: 100%;
  margin-top: 50px;
  height: 50px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.item-list-header-wrapper > div {
  padding: 5px;
  font-size: 14px;
}
.item-list-content-wrapper {
  width: 100%;
  height: calc(100% - 100px);
  overflow-y: auto;
}
</style>
