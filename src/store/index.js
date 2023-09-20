import Vue from 'vue'
import Vuex from 'vuex'
import snackbar from '@/store/snackbar'
import culture from '@/store/culture'

Vue.use(Vuex)

const store = new Vuex.Store({
	namespaced: true,
	modules: {
		snackbar,
		culture,
	},
})

export default store