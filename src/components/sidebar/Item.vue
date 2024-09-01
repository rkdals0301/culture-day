<template>
  <div>
    <div v-if="!isExpanded" class="item-wrapper" @click="onClickItem">
      <div class="content-wrapper">
        <p class="content-title">{{ title }}</p>
        <p class="content-place">{{ place }}</p>
        <p class="content-date">{{ date }}</p>
        <p class="content-target">{{ target }}</p>
        <p class="content-price">{{ price }}</p>
      </div>
      <div class="image-wrapper">
        <img v-lazy="mainImage" class="image" alt="culture_main_img" />
      </div>
    </div>
    <div v-else class="item-expanded-wrapper">
      <div class="image-wrapper">
        <img v-lazy="mainImage" class="image" alt="culture_main_img" />
      </div>
      <div class="content-wrapper">
        <p class="content-title">{{ title }}</p>
        <p class="content-place">{{ place }}</p>
        <p class="content-date">{{ date }}</p>
        <p class="content-target">{{ target }}</p>
        <p class="content-price">{{ price }}</p>
      </div>
      <div class="button-wrapper">
        <button class="button" @click="openExternalLink(culture.homepageDetailAddress)">서울문화포털</button>
        <button class="button" @click="openExternalLink(culture.homepageAddress)">예약</button>
      </div>
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
    isSidebar: {
      type: Boolean,
      default: false,
    },
    isExpanded: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    title() {
      const { title } = this.culture;
      return title ? title : '';
    },
    place() {
      return this.formatString(['classification', 'guName', 'place'], ' / ');
    },
    date() {
      const { startDate, endDate } = this.culture;
      const formattedStartDate = this.formatDate(startDate);
      const formattedEndDate = this.formatDate(endDate);
      return formattedStartDate === formattedEndDate
        ? formattedStartDate
        : `${formattedStartDate} ~ ${formattedEndDate}`;
    },
    target() {
      const { useTarget } = this.culture;
      return useTarget ? useTarget : '';
    },
    price() {
      const { isFree } = this.culture;
      return isFree === '유료' ? this.formatString(['isFree', 'useFee']) : isFree;
    },
    mainImage() {
      const { mainImage } = this.culture;
      return mainImage ? mainImage : null;
    },
  },
  methods: {
    onClickItem() {
      if (this.isSidebar) this.$emit('onClickItem', this.culture.id);
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
    openExternalLink(url) {
      window.open(url, '_blank'); // 새 탭에서 링크 열기
    },
  },
};
</script>

<style lang="scss" scoped>
.item-wrapper {
  display: flex;
  gap: 10px;
  margin: 0 10px 10px 10px;
  padding: 15px;
  background-color: $item_background_color;
  border-radius: 7px;
  color: $font_color;
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
    .content-place,
    .content-date {
      font-weight: 500;
    }
    .content-target,
    .content-price {
      color: $font_sub_color;
    }
  }
  .image-wrapper {
    .image {
      width: 100px;
      height: 100px;
      object-fit: fill;
      border-radius: 7px;
      display: block;
    }
  }
}

.item-expanded-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 10px 10px 10px;
  padding: 15px;
  background-color: $item_background_color;
  border-radius: 7px;
  color: $font_color;
  .image-wrapper {
    .image {
      width: 100%;
      height: 250px;
      object-fit: fill;
      border-radius: 7px;
      display: block;
    }
  }
  .content-wrapper {
    width: 100%;
    height: calc(100% - 310px);
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
    .content-place,
    .content-date {
      font-weight: 500;
    }
    .content-target,
    .content-price {
      color: $font_sub_color;
    }
  }
  .button-wrapper {
    height: 60px;
    display: flex;
    gap: 10px;
    & .button {
      flex: 1;
      border: none;
      border-radius: 12px;
      padding: 10px;
      background-color: #4a4a55;
      color: #e0e0e0;
      font-size: 1rem;
      font-weight: 700;
    }
  }
}
</style>
