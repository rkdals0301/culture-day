const snackbar = {
	namespaced: true,
	state: {
		type: '',
		text: ''
	},
	getters: {
		
	},
	mutations: {
		setSnackbar: (state, payload) => {
			const { type, text } = payload
			state.type = type
			state.text = text
		},
	},
	actions: {
		showSnackbar: ({ commit }, payload) => {
			commit('setSnackbar', payload)
		},
	},
}

export default snackbar