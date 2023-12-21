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
            <RecycleScroller
                v-slot="{ item, index, active }"
                :items="filteredCultures"
                key-field="id"
                :item-size="155"
                :buffer="50"
                class="recycle-scroller"
            >
                <template v-if="active">
                    <item
                        :culture="item"
                        :index="index"
                        @onClickItem="onClickItem(item.id)"
                    />
                </template>
                <template v-else>Loading...</template>
            </RecycleScroller>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { RecycleScroller } from "vue-virtual-scroller";
import Item from "./Item.vue";

export default {
    name: "ItemList",
    components: { RecycleScroller, Item },
    computed: {
        ...mapState("culture", ["filteredCultures"]),
    },
    methods: {
        onClickItem(id) {
            this.$emit("onClickItem", id);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

.item-list-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
    background-color: $background_color;
    // .item-list-header-wrapper {
    //     width: 100%;
    //     margin-top: 50px;
    //     height: 50px;
    //     padding: 10px;
    //     box-sizing: border-box;
    //     display: flex;
    //     align-items: center;
    //     & > div {
    //         padding: 5px;
    //         font-size: 0.875rem;
    //     }
    // }

    .item-list-content-wrapper {
        height: calc(100dvh - 60px);
        margin-top: 60px;

        /* Webkit 기반 브라우저 (Chrome, Safari) */
        ::-webkit-scrollbar {
            width: 12px;
        }

        ::-webkit-scrollbar-thumb {
            background-color: $item_background_color;
            border-radius: 6px;
        }

        ::-webkit-scrollbar-track {
            background-color: $background_color;
        }

        // /* Firefox */
        scrollbar-color: $item_background_color $background_color;
        scrollbar-width: thin;

        // /* Edge 및 IE 11 */
        scrollbar-color: $item_background_color $background_color;
        scrollbar-width: thin;

        .recycle-scroller {
            height: calc(100dvh - 60px);
        }
    }
}
</style>
