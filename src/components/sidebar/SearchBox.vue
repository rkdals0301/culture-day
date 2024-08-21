<template>
  <div class="search-box-wrapper">
    <div class="search-box">
      <button v-if="listVisibleStatus" class="back-btn" @click="goBack">
        <img src="@/assets/icon_back.svg" alt="icon_back" class="back-img" />
      </button>
      <div class="search-input-wrapper">
        <input
          v-model="keyword"
          type="text"
          class="search-input"
          placeholder="찾으실 행사명을 입력해 주세요"
          @focus="open"
          @keyup.enter="search"
        />
      </div>
      <!-- <div class="search-btn-wrapper"> -->
      <button class="search-btn" @click="search">
        <img src="@/assets/icon_search.svg" alt="icon_search" class="search-img" />
      </button>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SearchBox',
  props: {
    listVisibleStatus: {
      type: Boolean,
      default: false,
    },
  },
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
    close() {
      this.$emit('close');
    },
    search() {
      this.open();
      this.fetchFilteredCultures({ keyword: this.keyword });
    },
    goBack() {
      this.close();
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
    padding: 0 15px;
    justify-content: space-between;
    align-items: center;
    .back-btn {
      width: 24px;
      height: 24px;
      border: none;
      background-color: transparent;
      .back-img {
        width: 100%;
        height: 100%;
      }
      &:hover {
        cursor: pointer;
      }
    }
    .search-input-wrapper {
      flex-grow: 1;
      height: 100%;
      .search-input {
        width: 100%;
        height: 100%;
        color: #fff;
        background-color: transparent;
        border: none;
        padding-left: 15px;
        border-radius: 10px 0 0 10px;
        font-size: 0.875rem;
        &:focus {
          outline: none;
        }
      }
    }
    .search-btn {
      width: 24px;
      height: 24px;
      border: none;
      background-color: transparent;
      .search-img {
        width: 100%;
        height: 100%;
      }
      &:hover {
        cursor: pointer;
      }
    }

    // .search-btn-wrapper {
    //   width: 24px;
    //   height: 100%;
    //   display: flex;
    //   align-items: center;
    //   .search-btn {
    //     background-image: url('@/assets/icon_search.svg');
    //     background-size: cover;
    //     background-repeat: no-repeat;
    //     background-color: transparent;
    //     border: none;
    //     padding: 0;
    //     width: 24px;
    //     height: 24px;
    //     &:hover {
    //       cursor: pointer;
    //     }
    //   }
    // }
  }
}
</style>
