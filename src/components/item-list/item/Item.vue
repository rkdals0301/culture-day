<template>
  <div class="item-wrapper">
    <div class="content-wrapper">
      <div class="content-title">{{ culture.title }}</div>
      <div class="content-place">{{ culture.place }}</div>
      <div class="content-date">
        {{ culture.startDate }} ~ {{ culture.endDate }}
      </div>
    </div>
    <div
      class="image-wrapper"
      :style="`background-image: url(${culture.url})`"
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
  },
};
</script>

<style scoped>
.item-wrapper {
  width: 100%;
  height: 130px;
  border-bottom: 1px solid #f4f4f4;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
}
.item-wrapper:hover {
  background-color: rgb(248, 255, 219);
  cursor: pointer;
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
