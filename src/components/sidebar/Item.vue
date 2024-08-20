<template>
  <div class="item-wrapper" @click="onClickItem">
    <div class="content-wrapper">
      <p class="content-title">{{ title }}</p>
      <p class="content-place">{{ place }}</p>
      <p class="content-date">{{ date }}</p>
      <p class="content-organization">{{ organization }}</p>
      <p class="content-target">{{ target }}</p>
      <p class="content-price">{{ price }}</p>
    </div>
    <div class="image-wrapper">
      <img v-lazy="culture.main_img" class="image" alt="culture_main_img" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    culture: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    title() {
      const { title } = this.culture;
      return title ? title : '';
    },
    place() {
      return this.generateString('guname', 'place', ' / ');
    },
    date() {
      const { date } = this.culture;
      return date ? date.replaceAll('~', ' ~ ') : '';
    },
    organization() {
      return this.generateString('themecode', 'org_name');
    },
    target() {
      const { use_trgt } = this.culture;
      return use_trgt ? use_trgt : '';
    },
    price() {
      return this.generateString('is_free', 'use_fee');
    },
  },
  methods: {
    onClickItem() {
      this.$emit('onClickItem', this.culture.id);
    },
    generateString(key1, key2, separate = ', ') {
      const value1 = this.culture[key1];
      const value2 = this.culture[key2];
      const result = [value1, value2].filter(val => val !== undefined && val !== null).join(separate);

      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
.item-wrapper {
  height: 145px;
  display: flex;
  gap: 10px;
  margin: 0 10px 10px 10px;
  padding: 15px;
  background-color: $item_background_color;
  border-radius: 7px;
  color: $font_color;
  &:hover {
    background-color: $hover_color;
    cursor: pointer;
  }
  .content-wrapper {
    width: calc(100% - 110px);
    height: 100%;
    display: flex;
    flex-direction: column;
    font-size: 0.75rem;
    & > * {
      @include ellipsis;
    }
    .content-title {
      font-size: 0.875rem;
      font-weight: 700;
    }
    .content-organization,
    .content-target,
    .content-price {
      color: $font_sub_color;
    }
  }
  .image-wrapper {
    .image {
      width: 100px;
      height: 100%;
      object-fit: fill;
      border-radius: 7px;
    }
  }
}
</style>
