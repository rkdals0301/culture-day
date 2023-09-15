<template>
  <div></div>
</template>

<script>
import cultureAPI from '@/services/api/culture'
import SnackbarType from '@/utils/define/SnackbarType'
import { cultureList } from '@/views/culture/CultureDummy'

export default {
  name: 'Culture',
  data() {
    return {
    }
  },
  computed: {
    cultureList() {
      return cultureList
    }
  },
  created() {
      this.loadCultureList()
  },
  methods: {
    async loadCultureList() {
      try {
        const response = await cultureAPI.lookupCultureList()
        console.log('response >', response)
      } catch (error) {
        this.$root.showSnackbar(SnackbarType.ERROR, error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
