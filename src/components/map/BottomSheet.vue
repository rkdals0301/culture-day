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
        <div class="grip-bar" />
      </div>
      <div class="sheet-content">
        <item :culture="culture" :isExpanded="isExpanded" />
      </div>
    </div>
  </transition>
</template>

<script>
import Item from '@/components/sidebar/Item.vue';

export default {
  name: 'BottomSheet',
  components: {
    Item,
  },
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
      initialHeight: 160,
      dragging: false,
      snapHeights: [160, 500],
      minHeight: 160,
      maxHeight: 500,
    };
  },
  computed: {
    isExpanded() {
      return this.initialHeight === this.maxHeight;
    },
  },
  methods: {
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
  height: 160px;
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
  height: 32px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .grip-bar {
    width: 40px;
    height: 4px;
    background-color: #ccc;
    border-radius: 2px;
    margin-bottom: 8px;
  }
}

.sheet-content {
  height: calc(100% - 32px);
}

.sheet-fade-leave-active {
  transition: transform 0.3s ease, height 0.3s ease;
}
.sheet-fade-leave-to {
  transform: translateY(100%);
  height: 0;
}
</style>
