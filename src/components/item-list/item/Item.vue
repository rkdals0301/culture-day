<template>
  <div
    class="item-wrapper"
    :style="idx < 1 ? 'border-top: 1px solid #e5e5e5;' : ''"
  >
    <div class="content-wrapper">
      <div class="content-title">{{ culture["TITLE"] }}</div>
      <div class="content-place">
        {{ culture["PLACE"] }}
      </div>
      <div class="content-date">
        <!-- {{ culture.startDate }} ~ {{ culture.endDate }} -->
        {{ culture["DATE"] }}
      </div>
      <!-- 임시 -->
      <div class="content-date" style="color: #b4b4b4">
        {{ culture["IS_FREE"] }} / {{ culture["CODENAME"] }}
      </div>
    </div>
    <div
      class="image-wrapper"
      :style="`background-image: url(${culture['MAIN_IMG']})`"
    ></div>
  </div>
</template>

<script>
export default {
    name: "Item",
    props: {
        culture: {
            type: Object,
            default: () => {},
        },
        idx: Number,
    },
    mounted() {},
};
</script>

<style scoped>
.item-wrapper {
  width: 100%;
  height: 130px;
  border-bottom: 1px solid #e5e5e5;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  text-align: left;
}
.item-wrapper:hover {
  background-color: #e2f7ef;
  cursor: pointer;
  transition: ease-out 0.3s;
}
.item-wrapper:hover .content-title {
  color: #2a6b39;
  transition: ease-out 0.3s;
}
.content-wrapper {
  width: 100%;
  height: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 13px;
}
.content-wrapper > .content-title {
  font-weight: bold;
  font-size: 14px;
}
.image-wrapper {
  width: 40%;
  height: 100%;
  background-size: cover;
  border-radius: 10px;
}
</style>
