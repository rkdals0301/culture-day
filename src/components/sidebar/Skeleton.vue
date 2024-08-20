<template>
  <div class="skeleton-wrapper">
    <div v-for="skeleton of skeletons" :key="skeleton.uuid" class="skeleton">
      <content-loader width="370" height="150" primary-color="#3A3A3A" secondary-color="#494949" :animate="true">
        <rect x="0" y="0" rx="3" ry="3" width="260" height="25" />
        <rect x="0" y="30" rx="3" ry="3" width="243" height="20" />
        <rect x="0" y="55" rx="3" ry="3" width="190" height="20" />
        <rect x="0" y="80" rx="3" ry="3" width="210" height="20" />
        <rect x="0" y="105" rx="3" ry="3" width="90" height="20" />
        <rect x="0" y="130" rx="3" ry="3" width="180" height="20" />
        <rect x="270" y="0" rx="3" ry="3" width="100" height="155" />
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
    padding: 10px;
    padding-top: 0;
  }
}
</style>
