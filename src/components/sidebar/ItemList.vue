<template>
  <div class="item-list-wrapper">
    <!-- <div class="item-list-header-wrapper">
        <div style="color: #2a6b39; font-weight: 700;">전체보기</div>
        <div>이번주</div>
        <div>무료</div>
        <div>축제</div>
        <div>음악회</div>
        <div style="color: red; font-weight: 700;">핫이슈</div>
    </div> -->
    <div class="item-list-content-wrapper">
      <template v-if="isLoading">
        <div class="list-wrapper">
          <skeleton :count="10" />
        </div>
      </template>
      <template v-else>
        <template v-if="isData">
          <recycle-scroller
            v-slot="{ item, index }"
            :items="filteredCultures"
            key-field="id"
            :item-size="140"
            :buffer="50"
            class="list-wrapper"
          >
            <item :isSidebar="true" :culture="item" :index="index" @onClickItem="onClickItem(item.id)" />
          </recycle-scroller>
        </template>
        <template v-else>
          <div class="no-data">조회된 문화행사가 없습니다.</div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { RecycleScroller } from 'vue-virtual-scroller';
import Skeleton from './Skeleton.vue';
import Item from './Item.vue';

export default {
  name: 'ItemList',
  components: { RecycleScroller, Skeleton, Item },
  computed: {
    ...mapState('culture', ['isLoading', 'filteredCultures']),
    isData() {
      return this.filteredCultures.length > 0;
    },
  },
  methods: {
    onClickItem(id) {
      this.$emit('onClickItem', id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

.item-list-wrapper {
  width: 100%;
  height: 100dvh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: $background_color;
  // .item-list-header-wrapper {
  //     width: 100%;
  //     margin-top: 50px;
  //     height: 50px;
  //     padding: 10px;
  //     box-sizing: border-box;
  //     display: flex;
  //     align-items: center;
  //     & > div {
  //         padding: 5px;
  //         font-size: 0.875rem;
  //     }
  // }

  .item-list-content-wrapper {
    height: calc(100dvh - 60px);
    margin-top: 60px;
    .list-wrapper {
      height: calc(100dvh - 60px);
      overflow: auto;
    }
    .no-data {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $font_color;
    }
  }
}
</style>
