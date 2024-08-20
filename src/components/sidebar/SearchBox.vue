<template>
  <div class="search-box-wrapper">
    <div class="search-box">
      <div class="search-inp-wrapper">
        <input
          v-model="keyword"
          type="text"
          class="search-inp"
          placeholder="찾으실 행사명을 입력해 주세요"
          @focus="open"
          @keyup.enter="search"
        />
      </div>
      <div class="search-btn-wrapper">
        <button class="search-btn" @click="search"></button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SearchBox',
  data() {
    return {
      keyword: '',
    };
  },
  methods: {
    ...mapActions('culture', ['fetchFilteredCultures']),
    open() {
      this.$emit('open');
    },
    search() {
      this.open();
      this.fetchFilteredCultures({ keyword: this.keyword });
    },
  },
};
</script>

<style lang="scss" scoped>
.search-box-wrapper {
  width: 100%;
  height: 60px;
  background-color: transparent;
  padding: 10px;
  position: absolute;
  z-index: 1;
  .search-box {
    width: 100%;
    height: 100%;
    background-color: $item_background_color;
    border-radius: 10px;
    display: flex;
    padding-right: 15px;
    .search-inp-wrapper {
      width: calc(100% - 24px);
      height: 100%;
      .search-inp {
        width: 100%;
        height: 100%;
        color: #fff;
        background-color: $item_background_color;
        border: none;
        padding-left: 15px;
        border-radius: 10px 0 0 10px;
      }
      .search-inp:focus {
        outline: none;
      }
    }
    .search-btn-wrapper {
      width: 24px;
      height: 100%;
      display: flex;
      align-items: center;
      .search-btn {
        background-image: url('@/assets/icon_search.svg');
        background-size: cover;
        background-repeat: no-repeat;
        background-color: transparent;
        border: none;
        padding: 0;
        width: 24px;
        height: 24px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
