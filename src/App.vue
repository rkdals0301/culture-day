<template>
    <div id="app">
        <Map ref="map" @showCultureDetailModal="showCultureDetailModal" />
        <item-list-handler ref="handler" @onClickItem="onClickItem" />
        <item-detail-modal ref="item-detail-modal" />
        <snackbar />
    </div>
</template>

<script>
import cultureAPI from '@/services/api/culture'
import SnackbarType from '@/utils/define/SnackbarType'
import Map from '@/components/map/Map.vue'
import Snackbar from '@/components/common/Snackbar.vue'
import ItemListHandler from './components/item-list/ItemListHandler.vue'
import ItemDetailModal from './components/map/ItemDetailModal.vue'
import { mapActions } from 'vuex'

export default {
    name: 'App',
    components: {
        Map,
        ItemListHandler,
        ItemDetailModal,
        Snackbar,
    },
    created() {
        this.loadCultureList()
    },
    methods: {
        ...mapActions('culture', ['initCultures']),
        async loadCultureList() {
            try {
                const response = await cultureAPI.lookupCultureList()
                console.log('response >', response?.data?.culturalEventInfo?.row)
                this.initCultures(response?.data?.culturalEventInfo?.row)
                this.$refs.handler.bindCultures()
            } catch (error) {
                this.$root.showSnackbar(SnackbarType.ERROR, error)
            }
        },
        showCultureDetailModal(culture) {
            this.$refs['item-detail-modal'].show(culture)
        },
        onClickItem(index) {
            this.$refs['map'].onClickMarker(index)
        },
    },
}
</script>

<style lang="scss" scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    width: 100dvw;
    height: 100dvh;
    position: relative;
}
</style>
