<template>
    <div class="item-wrapper" :style="index < 1 ? 'border-top: 1px solid #e5e5e5;' : ''" @click="onClickItem">
        <div class="content-wrapper">
            <div class="content-title">
                {{ culture.TITLE }}
            </div>
            <div class="content-place">
                {{ culture.PLACE }}
            </div>
            <div class="content-date">
                {{ culture.DATE }}
            </div>
            <div class="content-date" style="color: #b4b4b4">{{ culture.IS_FREE }} / {{ culture.CODENAME }}</div>
            <div class="content-date" style="color: #b4b4b4">
                {{ culture.USE_FEE }}
            </div>
        </div>
        <div class="image-wrapper">
            <img class="image" :src="culture.MAIN_IMG" alt="" />
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
    mounted() {},
    methods: {
        onClickItem() {
            this.$emit('onClickItem', this.index)
        },
    },
}
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
            border-radius: 10px;
        }
    }
}
</style>
