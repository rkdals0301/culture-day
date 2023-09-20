<template>
    <div v-if="isShow" class="modal-wrapper">
        <div class="modal">
            <div class="content">
                <div style="">
                    <div></div>
                <div>{{culture.TITLE}}</div>
                </div>
                
            </div>
            <div class="footer">
                <button type="button" @click="hide">닫기</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ItemDetailModal',
    data() {
        return {
            isShow: false,
            culture: null,
        }
    },
    methods: {
        show(culture) {
            console.log(culture)
            this.isShow = true;
            this.culture = culture;
        },
        hide() {
            this.isShow = false;
        },
    }
}
</script>

<style lang="scss" scoped>
    .modal-wrapper {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgb(0, 0, 0, 0.4);
        z-index: 2;
        .modal {
            width: 500px;
            height: fit-content;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            border-radius: 4px; 
            padding: 7px;
        }
    }
</style >