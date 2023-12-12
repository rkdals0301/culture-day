<template>
    <div
        class="sidebar-wrapper"
        :style="`height: ${listVisibleStatus ? '100%' : 'auto'}`"
    >
        <div
            class="list-container"
            :style="
                listVisibleStatus
                    ? 'box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.24)'
                    : ''
            "
        >
            <search-box ref="search" @open="openList" @search="search" />
        </div>
        <div v-show="listVisibleStatus">
            <transition name="fade">
                <item-list
                    v-show="listVisibleStatus"
                    ref="list"
                    :cultures="cultures"
                    @onClickItem="onClickItem"
                />
            </transition>
        </div>
    </div>
</template>

<script>
import ItemList from "./ItemList.vue";
import SearchBox from "./SearchBox.vue";
import { mapState } from "vuex";

export default {
    name: "ItemListHandler",
    components: { ItemList, SearchBox },
    data() {
        return {
            listVisibleStatus: false,
        };
    },
    computed: {
        ...mapState("culture", ["cultures"]),
    },
    methods: {
        openList() {
            this.listVisibleStatus = true;
        },
        hideList() {
            this.listVisibleStatus = false;
        },
        search(keyword = "") {
            console.log("keyword: ", keyword);
        },
        onClickItem(index) {
            this.$emit("onClickItem", index);
        },
    },
};
</script>

<style lang="scss" scoped>
.sidebar-wrapper {
    width: 400px;
    position: absolute;
    top: 0;
    left: 0;
    .list-container {
        position: relative;
        width: 100%;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
