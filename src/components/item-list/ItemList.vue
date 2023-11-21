<template>
    <div class="item-list-wrapper">
        <!-- <div class="item-list-header-wrapper">
        <div style="color: #2a6b39; font-weight: bold">전체보기</div>
        <div>이번주</div>
        <div>무료</div>
        <div>축제</div>
        <div>음악회</div>
        <div style="color: red; font-weight: bold">핫이슈</div>
    </div> -->
        <div class="item-list-content-wrapper">
            <item v-for="(culture, index) in cultures" :key="`${culture['TITLE']}-${index}`" :culture="culture" :index="index" @onClickItem="onClickItem" />
        </div>
    </div>
</template>

<script>
import Item from './item/Item.vue'

export default {
    name: 'ItemList',
    components: { Item },
    props: {
        cultures: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {}
    },
    mounted() {},
    methods: {
        onClickItem(index) {
            this.$emit('onClickItem', index)
        },
    },
}
</script>

<style lang="scss" scoped>
.item-list-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    .item-list-header-wrapper {
        width: 100%;
        margin-top: 50px;
        height: 50px;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        & > div {
            padding: 5px;
            font-size: 14px;
        }
    }
    .item-list-content-wrapper {
        width: 100%;
        height: calc(100% - 60px);
        margin-top: 60px;
        // height: calc(100%);
        overflow-y: auto;
    }
}
</style>
