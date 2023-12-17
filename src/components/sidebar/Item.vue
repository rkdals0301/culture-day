<template>
    <div
        class="item-wrapper"
        :style="index < 1 ? 'border-top: 1px solid #e5e5e5;' : ''"
        @click="onClickItem"
    >
        <div class="content-wrapper">
            <div class="content-title">
                {{ culture.title }}
            </div>
            <div class="content-place">
                {{ culture.place }}
            </div>
            <div class="content-date">
                {{ culture.date }}
            </div>
            <div class="content-date" style="color: #b4b4b4">
                {{ culture.is_free }} / {{ culture.codename }}
            </div>
            <div class="content-date" style="color: #b4b4b4">
                {{ culture.use_fee }}
            </div>
        </div>
        <div class="image-wrapper">
            <img class="image" :src="culture.main_img" alt="culture_main_img" />
        </div>
    </div>
</template>

<script>
export default {
    name: "Item",
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
    methods: {
        onClickItem() {
            this.$emit("onClickItem", this.culture.id);
        },
    },
};
</script>

<style lang="scss" scoped>
.item-wrapper {
    width: 100%;
    max-height: 170px;
    border-bottom: 1px solid #e5e5e5;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    text-align: left;
    &:hover {
        background-color: #e2f7ef;
        cursor: pointer;
        transition: ease-out 0.3s;
        .content-title {
            color: #2a6b39;
            transition: ease-out 0.3s;
        }
    }
    .content-wrapper {
        width: 100%;
        height: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 5px;
        font-size: 13px;
        & > .content-title {
            font-weight: bold;
            font-size: 14px;
        }
    }
    .image-wrapper {
        .image {
            width: 100px;
            height: 108px;
            object-fit: fill;
            display: block; // height bug default inline-block
            border: 1px solid #cccccc;
            border-radius: 10px;
        }
    }
}
</style>
