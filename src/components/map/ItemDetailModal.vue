<template>
    <div v-if="isShow" class="item-detail-modal-wrapper">
        <div class="modal">
            <div class="header">
                <div class="left-wrapper">
                    <div class="title">
                        {{ culture.title || "-" }}
                    </div>
                </div>
                <div class="right-wrapper">
                    <div class="button">
                        <button type="button" @click="hide">X</button>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="left-wrapper">
                    <div class="data">
                        <div class="title">장르</div>
                        <div class="value">
                            {{ culture.codename ?? "-" }}
                        </div>
                    </div>
                    <div class="data">
                        <div class="title">기간</div>
                        <div class="value">
                            {{ culture.date ?? "-" }}
                        </div>
                    </div>
                    <div class="data">
                        <div class="title">장소</div>
                        <div class="value">
                            {{ culture.place || "-" }}
                        </div>
                    </div>
                    <div class="data">
                        <div class="title">연령</div>
                        <div class="value">
                            {{ culture.use_trgt || "-" }}
                        </div>
                    </div>
                    <div class="data">
                        <div class="title">요금</div>
                        <div class="value">
                            {{ culture.use_fee || "-" }}
                        </div>
                    </div>
                    <div class="data">
                        <div class="title">홈페이지</div>
                        <div class="value">
                            <a :href="culture.org_link" target="_blank"
                                >바로가기</a
                            >
                        </div>
                    </div>
                </div>
                <div class="right-wrapper">
                    <div class="image-wrapper">
                        <img class="image" :src="culture.main_img" alt="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ItemDetailModal",
    data() {
        return {
            isShow: false,
            culture: null,
        };
    },
    mounted() {
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                this.hide();
            }
        });
    },
    methods: {
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
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgb(0, 0, 0, 0.4);
    z-index: 2;
    .modal {
        width: 650px;
        height: fit-content;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        border-radius: 4px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .left-wrapper {
                .title {
                    font-size: 1.5rem;
                    font-weight: 700;
                }
            }
        }
        .content {
            display: flex;
            justify-content: space-between;
            gap: 10px;
            .left-wrapper {
                display: flex;
                flex-direction: column;
                gap: 5px;
                .data {
                    display: flex;
                    gap: 10px;
                    font-size: 1.25rem;
                    .title {
                        width: 70px;
                        font-weight: 700;
                    }
                    .value {
                        width: calc(100% - 80px); // gap + title width
                    }
                }
            }
            .right-wrapper {
                .image-wrapper {
                    .image {
                        width: 150px;
                        height: 150px;
                        object-fit: fill;
                        display: block; // height bug default inline-block
                        border-radius: 10px;
                    }
                }
            }
        }
    }
}
</style>
