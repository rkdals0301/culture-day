<template>
  <div
    class="search-box-wrapper"
    :style="`background: ${visibleStatus ? '#fff' : 'transparent'}`"
  >
    <div
      class="search-box"
      :style="`border: ${visibleStatus ? '1px solid #e5e5e5' : 'none'}`"
    >
      <div class="search-inp-wrapper">
        <input
          type="text"
          class="search-inp"
          @focus="test"
          @blur="test2"
          placeholder="찾으실 행사명을 입력해 주세요"
        />
      </div>
      <div class="search-btn-wrapper">
        <button class="search-btn">
          <img src="@/assets/icon_search.svg" width="100%" height="100%" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBox",
  data() {
    return {
      visibleStatus: true,
    };
  },
  methods: {
    test() {
      console.log("focus!");
    },
    test2() {
      console.log("blur!");
    },
  },
};
</script>

<style scoped>
.search-box-wrapper {
  width: 100%;
  height: 60px;
  background-color: transparent;
  padding: 10px;
  box-sizing: border-box;
  position: absolute;
  z-index: 1;
}
.search-box-wrapper > .search-box {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 15px;
  display: flex;
}
.search-box > .search-inp-wrapper {
  width: 100%;
  height: 100%;
}
.search-box > .search-btn-wrapper {
  width: 50px;
  height: 100%;
}
.search-inp {
  width: 90%;
  height: 100%;
  background-color: transparent;
  border: none;
  padding: 0;
}
.search-inp:focus {
  outline: none;
}
.search-btn {
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
}
</style>
