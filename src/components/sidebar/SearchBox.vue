<template>
    <div class="search-box-wrapper">
        <div class="search-box">
            <div class="search-inp-wrapper">
                <input
                    v-model="keyword"
                    type="text"
                    class="search-inp"
                    placeholder="찾으실 행사명을 입력해 주세요"
                    @focus="open"
                    @keyup.enter="search"
                />
            </div>
            <div class="search-btn-wrapper">
                <button class="search-btn" @click="search">
                    <img src="@/assets/icon_search.svg" alt="" />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "SearchBox",
    data() {
        return {
            keyword: "",
        };
    },
    methods: {
        ...mapActions("culture", ["fetchFilteredCultures"]),
        open() {
            this.$emit("open");
        },
        search() {
            this.fetchFilteredCultures({ keyword: this.keyword });
        },
    },
};
</script>

<style lang="scss" scoped>
.search-box-wrapper {
    width: 100%;
    height: 60px;
    background-color: transparent;
    padding: 10px;
    box-sizing: border-box;
    position: absolute;
    z-index: 1;
    .search-box {
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: 10px;
        border: 1px solid #e5e5e5;
        display: flex;
        .search-inp-wrapper {
            width: calc(100% - 50px);
            height: 100%;
            .search-inp {
                width: 100%;
                height: 100%;
                background-color: transparent;
                border: none;
                padding-left: 10px;
            }
            .search-inp:focus {
                outline: none;
            }
        }
        .search-btn-wrapper {
            width: 50px;
            height: 100%;
            .search-btn {
                width: 100%;
                height: 100%;
                background-color: transparent;
                border: none;
                cursor: pointer;
                img {
                    width: 24px;
                    height: 24px;
                }
            }
        }
    }
}
</style>
