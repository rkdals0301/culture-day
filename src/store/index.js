import Vue from 'vue'
import Vuex from 'vuex'
import snackbar from '@/store/snackbar'

Vue.use(Vuex)

const store = new Vuex.Store({
	namespaced: true,
	modules: {
		snackbar,
	},
})

export default store