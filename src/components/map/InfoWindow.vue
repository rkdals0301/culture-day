<template>
  <div class="info-window-wrapper" @click="showCultureDetailModal">
    <div class="info-window">
      <p class="title">{{ title }}</p>
      <p class="content">{{ place }}</p>
      <p class="content">{{ date }}</p>
      <p class="content">{{ organization }}</p>
      <p class="content">{{ target }}</p>
      <p class="content">{{ price }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoWindow',
  props: {
    infoWindow: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    title() {
      const { title } = this.infoWindow;
      return title ? title : '';
    },
    place() {
      return this.generateString('guname', 'place', ' / ');
    },
    date() {
      const { date } = this.infoWindow;
      return date ? date.replaceAll('~', ' ~ ') : '';
    },
    organization() {
      return this.generateString('themecode', 'org_name');
    },
    target() {
      const { use_trgt } = this.infoWindow;
      return use_trgt ? use_trgt : '';
    },
    price() {
      return this.generateString('is_free', 'use_fee');
    },
  },
  methods: {
    generateString(key1, key2, separate = ', ') {
      const value1 = this.infoWindow[key1];
      const value2 = this.infoWindow[key2];
      const result = [value1, value2].filter(val => val !== undefined && val !== null).join(separate);

      return result;
    },
    showCultureDetailModal() {
      this.$emit('showCultureDetailModal', this.infoWindow.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.info-window-wrapper {
  width: 400px;
  height: 170px;
  position: relative;
  border-radius: 7px;
  background-color: $item_background_color;
  box-shadow: 0 0 10px rgba(59, 79, 129, 0.8), 0 0 20px rgba(59, 79, 129, 0.6);
  &::after {
    width: 0;
    height: 0;
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    border: 6px solid transparent;
    border-top-color: $item_background_color;
    border-bottom: 0;
    margin-left: -6px;
    margin-bottom: -6px;
  }
  .info-window {
    padding: 15px 20px;
    font-weight: 700;
    display: flex;
    flex-direction: column;
    justify-content: center;
    & > * {
      @include ellipsis;
    }
    .title {
      color: $font_color;
      font-size: 1rem;
    }
    .content {
      color: $font_sub_color;
      font-size: 0.875rem;
    }
  }
}
</style>
