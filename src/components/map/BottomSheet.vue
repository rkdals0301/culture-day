<template>
  <transition name="sheet-fade" @after-leave="afterLeave">
    <div
      v-if="isOpen"
      class="bottom-sheet"
      :class="{ open: isOpen }"
      @mousedown="startResize"
      @touchstart="startResize"
    >
      <div class="sheet-header">
        <div class="grip-bar"></div>
      </div>
      <div class="sheet-content">
        <div class="item-wrapper">
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
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BottomSheet',
  props: {
    culture: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isOpen: true,
      initialY: 0,
      initialHeight: 250,
      dragging: false,
      snapHeights: [250, 600],
      minHeight: 250,
      maxHeight: 600,
    };
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
    generateString(key1, key2, separate = ', ') {
      const value1 = this.culture[key1];
      const value2 = this.culture[key2];
      const result = [value1, value2].filter(val => val !== undefined && val !== null).join(separate);

      return result;
    },
    closeSheet() {
      // 시트가 열린 후 닫기 동작이 실행되도록 딜레이를 추가
      setTimeout(() => {
        this.$el.style.transition = 'transform 0.3s ease, height 0.3s ease';
        this.$el.style.transform = 'translateY(100%)';
        this.$el.style.height = '0';
        setTimeout(() => {
          this.isOpen = false;
        }, 300);
      }, 10); // 10ms 정도의 짧은 딜레이로 애니메이션이 겹치지 않도록 조정
    },
    startResize(event) {
      this.dragging = true;
      this.initialY = event.clientY || event.touches[0].clientY;
      this.initialHeight = parseInt(this.$el.style.height) || this.initialHeight;
      document.addEventListener('mousemove', this.resizeSheet);
      document.addEventListener('mouseup', this.stopResize);
      document.addEventListener('touchmove', this.resizeSheet);
      document.addEventListener('touchend', this.stopResize);
    },
    resizeSheet(event) {
      if (!this.dragging) return;
      const currentY = event.clientY || event.touches[0].clientY;
      const dy = currentY - this.initialY;
      let newHeight = this.initialHeight - dy;

      // 높이를 현재의 최대 높이와 최소 높이 사이로 제한
      this.$el.style.height = `${Math.max(this.minHeight, Math.min(newHeight, this.maxHeight))}px`;
    },
    stopResize() {
      if (!this.dragging) return;
      this.dragging = false;
      let currentHeight = parseInt(this.$el.style.height);

      let nextHeight;
      if (currentHeight < this.initialHeight) {
        // 아래로 드래그하여 시트가 내려감
        nextHeight =
          this.snapHeights
            .slice()
            .reverse()
            .find(h => h < this.initialHeight) || this.minHeight;
      } else {
        // 위로 드래그하여 시트가 올라감
        nextHeight = this.snapHeights.find(h => h > this.initialHeight) || this.maxHeight;
      }

      // 최종 높이가 최소 스냅 높이보다 작다면 시트 닫기
      if (currentHeight <= this.minHeight) {
        this.closeSheet();
        return;
      }

      // 시트의 높이를 스냅 높이로 조정
      this.$el.style.transition = 'height 0.3s ease';
      this.$el.style.height = `${nextHeight}px`;
      this.initialHeight = nextHeight;

      document.removeEventListener('mousemove', this.resizeSheet);
      document.removeEventListener('mouseup', this.stopResize);
      document.removeEventListener('touchmove', this.resizeSheet);
      document.removeEventListener('touchend', this.stopResize);
    },
    afterLeave() {
      this.$emit('closeBottomSheet');
    },
  },
};
</script>

<style lang="scss" scoped>
.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 250px;
  background-color: $item_background_color;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.3);
  transform: translateY(100%);
  transition: transform 0.3s ease, height 0.3s ease;
  overflow: hidden;
  touch-action: none;
  z-index: 100; // naver map logo : 99
}

.bottom-sheet.open {
  transform: translateY(0);
}

.sheet-header {
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.grip-bar {
  width: 40px;
  height: 4px;
  background-color: #ccc;
  border-radius: 2px;
  margin-bottom: 8px;
}

.sheet-content {
  .item-wrapper {
    height: 145px;
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
}

.sheet-fade-leave-active {
  transition: transform 0.3s ease, height 0.3s ease;
}
.sheet-fade-leave-to {
  transform: translateY(100%);
  height: 0;
}
</style>
