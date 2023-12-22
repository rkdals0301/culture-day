<template>
    <div class="info-window-wrapper" @click="showCultureDetailModal">
        <div class="info-window">
            <p class="title">{{ infoWindow.title }}</p>
            <p class="content">{{ infoWindow.date }}</p>
            <p class="content">
                {{ infoWindow.isFree }} /
                {{ infoWindow.codeName }}
            </p>
            <p class="content">{{ infoWindow.useFee }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "InfoWindow",
    props: {
        infoWindow: {
            type: Object,
            default: () => {},
        },
    },
    methods: {
        showCultureDetailModal() {
            this.$emit("showCultureDetailModal", this.infoWindow.id);
        },
    },
};
</script>

<style lang="scss" scoped>
.info-window-wrapper {
    width: 400px;
    height: 200px;
    position: relative;
    border-radius: 7px;
    background-color: $item_background_color;
    box-shadow: 0 0 10px rgba(59, 79, 129, 0.8), 0 0 20px rgba(59, 79, 129, 0.6);
    &:hover {
        cursor: pointer;
    }
    &::after {
        width: 0;
        height: 0;
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        border: 6px solid transparent;
        border-top-color: $item_background_color;
        border-bottom: 0;
        margin-left: -6px;
        margin-bottom: -6px;
    }
    .info-window {
        padding: 15px 20px;
        font-weight: 700;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .title {
            font-size: 1rem;
            color: $font_color;
        }
        .content {
            font-size: 0.875rem;
            color: $font_sub_color;
        }
        .button-wrapper {
            display: flex;
            justify-content: flex-end;
        }
    }
}
</style>
