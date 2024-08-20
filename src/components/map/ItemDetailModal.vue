<template>
  <div>
    <div v-if="isShow" class="item-detail-modal-wrapper">
      <div class="modal">
        <div class="header">
          <div class="left-wrapper">
            <div class="title">{{ culture.title }}</div>
          </div>
          <div class="right-wrapper">
            <button class="close-button" @click="hide"></button>
          </div>
        </div>
        <div class="content-wrapper">
          <div class="image-wrapper">
            <img v-lazy="culture.main_img" class="image" alt="culture_main_img" />
          </div>
          <div class="content">
            <div class="data">
              <div class="title">위치</div>
              <div class="value">
                {{ culture.place }}
              </div>
            </div>
            <div class="data">
              <div class="title">장르</div>
              <div class="value">
                {{ culture.codename }}
              </div>
            </div>
            <div class="data">
              <div class="title">기간</div>
              <div class="value">
                {{ culture.date }}
              </div>
            </div>
            <div class="data">
              <div class="title">장소</div>
              <div class="value">
                {{ culture.place }}
              </div>
            </div>
            <div class="data">
              <div class="title">연령</div>
              <div class="value">
                {{ culture.use_trgt }}
              </div>
            </div>
            <div class="data">
              <div class="title">요금</div>
              <div class="value">
                {{ culture.use_fee }}
              </div>
            </div>
            <div class="data">
              <div class="title">홈페이지</div>
              <div class="value">
                <a :href="culture.org_link" target="_blank">바로가기</a>
              </div>
            </div>
            <div class="data">
              <div class="title">서울 문화 포털</div>
              <div class="value">
                <a :href="culture.hmpg_addr" target="_blank">바로가기</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="isShow" class="overlay" :class="{ show: isShow }" @click="hide"></div>
  </div>
</template>

<script>
export default {
  name: 'ItemDetailModal',
  data() {
    return {
      isShow: false,
      culture: null,
    };
  },
  mounted() {
    document.addEventListener('keydown', this.keydownEventHandler);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.keydownEventHandler);
  },
  methods: {
    keydownEventHandler(e) {
      if (e.key === 'Escape') {
        this.hide();
      }
    },
    show(culture) {
      this.isShow = true;
      this.culture = culture;
    },
    hide() {
      this.isShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.item-detail-modal-wrapper {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  color: $font_color;
  background-color: $item_background_color;
  box-shadow: 0 0 10px rgba(59, 79, 129, 0.8), 0 0 20px rgba(59, 79, 129, 0.6);
  .modal {
    width: 600px;
    height: 700px;
    position: fixed;
    overflow: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: $item_background_color;
    border-radius: 7px;
    padding: 25px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    .header {
      height: fit-content;
      display: flex;
      justify-content: space-between;
      gap: 10px;
      .left-wrapper {
        display: flex;
        align-items: center;
        .title {
          font-size: 1.5rem;
          font-weight: 700;
        }
      }
      .right-wrapper {
        display: flex;
        align-items: baseline;
        .close-button {
          background-image: url('@/assets/icon_close.png');
          background-size: cover;
          background-repeat: no-repeat;
          background-color: transparent;
          border: none;
          padding: 0;
          width: 32px;
          height: 32px;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    .content-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 10px;
      .image-wrapper {
        .image {
          width: 100%;
          height: 350px;
          object-fit: fill;
          border-radius: 7px;
        }
      }
      .content {
        display: flex;
        flex-direction: column;
        gap: 5px;
        .data {
          display: flex;
          gap: 10px;
          font-size: 1.125rem;
          .title {
            width: 120px;
            font-weight: 700;
          }
          .value {
            width: calc(100% - 130px); // gap + title width
          }
        }
      }
    }
  }
}
.overlay {
  width: 100dvw;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  display: none;
  &.show {
    display: block;
  }
}
</style>
