<template>
    <div class="search-box-wrapper">
        <div class="search-box">
            <div class="search-inp-wrapper">
                <input v-model="keyword" type="text" class="search-inp" placeholder="찾으실 행사명을 입력해 주세요" @focus="open" @keypress.enter="search" />
            </div>
            <div class="search-btn-wrapper">
                <button class="search-btn" @click="search">
                    <img src="@/assets/icon_search.svg" width="100%" height="100%" />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SearchBox',
    data() {
        return {
            keyword: '',
        }
    },
    methods: {
        open() {
            this.$emit('open')
        },
        search() {
            this.$emit('search', this.keyword)
        },
    },
}
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
}
.search-box-wrapper > .search-box {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid #e5e5e5;
    display: flex;
}
.search-box > .search-inp-wrapper {
    width: 100%;
    height: 100%;
}
.search-box > .search-btn-wrapper {
    width: 50px;
    height: 100%;
}
.search-inp {
    width: 90%;
    height: 100%;
    background-color: transparent;
    border: none;
    padding: 0;
}
.search-inp:focus {
    outline: none;
}
.search-btn {
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
    cursor: pointer;
}
</style>
