<template>
  <div class="item-wrapper" @click="onClickItem">
    <div class="content-wrapper">
      <p class="content-title">{{ title }}</p>
      <p class="content-place">{{ place }}</p>
      <p class="content-date">{{ date }}</p>
      <p class="content-target">{{ target }}</p>
      <p class="content-price">{{ price }}</p>
    </div>
    <div class="image-wrapper">
      <img v-lazy="culture.MAIN_IMG" class="image" alt="culture_main_img" />
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
      const { TITLE: title } = this.culture;
      return title ? title : '';
    },
    place() {
      return this.formatString(['CODENAME', 'GUNAME', 'PLACE'], ' / ');
    },
    date() {
      const { STRTDATE: startDate, END_DATE: endDate } = this.culture;
      const formattedStartDate = this.formatDate(startDate);
      const formattedEndDate = this.formatDate(endDate);
      return formattedStartDate === formattedEndDate
        ? formattedStartDate
        : `${formattedStartDate} ~ ${formattedEndDate}`;
    },
    target() {
      const { USE_TRGT: use_target } = this.culture;
      return use_target ? use_target : '';
    },
    price() {
      const { IS_FREE: isFree } = this.culture;
      return isFree === '유료' ? this.formatString(['IS_FREE', 'USE_FEE']) : isFree;
    },
  },
  methods: {
    onClickItem() {
      this.$emit('onClickItem', this.culture.id);
    },
    formatString(keys, separate = ', ') {
      const values = keys.map(key => this.culture[key]);
      const result = values.filter(val => val !== undefined && val !== null).join(separate);

      return result;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.item-wrapper {
  height: 130px;
  display: flex;
  gap: 10px;
  margin: 0 10px 10px 10px;
  padding: 15px;
  background-color: $item_background_color;
  border-radius: 7px;
  color: $font_color;
  cursor: pointer;

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
