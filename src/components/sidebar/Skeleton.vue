<template>
  <div class="skeleton-wrapper">
    <div v-for="skeleton of skeletons" :key="skeleton.uuid" class="skeleton">
      <content-loader
        width="370"
        height="100"
        primaryColor="#333333"
        secondaryColor="#666666"
        :animate="true"
        :speed="3"
      >
        <rect x="0" y="0" rx="3" ry="3" width="260" height="15" />
        <rect x="0" y="25" rx="3" ry="3" width="243" height="10" />
        <rect x="0" y="45" rx="3" ry="3" width="190" height="10" />
        <rect x="0" y="65" rx="3" ry="3" width="210" height="10" />
        <rect x="0" y="85" rx="3" ry="3" width="90" height="10" />
        <rect x="0" y="105" rx="3" ry="3" width="180" height="10" />
        <rect x="270" y="0" rx="7" ry="7" width="100" height="100" />
      </content-loader>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader';

export default {
  name: 'Skeleton',
  components: { ContentLoader },
  props: {
    count: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    skeletons() {
      return Array.from({ length: this.count }, () => ({
        uuid: this.$uuid.v4(),
      }));
    },
  },
};
</script>

<style lang="scss" scoped>
.skeleton-wrapper {
  .skeleton {
    background-color: $item_background_color;
    border-radius: 7px;
    padding: 15px;
    margin: 0 10px 10px 10px;
  }
}
</style>
