const culture = {
    namespaced: true,
    state: {
        rawCultures: [],
        cultures: [],
    },
    getters: {
        getCultures: (state) => {
            return state.cultures;
        }
    },
    mutations: {
        setRawCultures: (state, payload) => {
            state.rawCultures = payload;
        },
        setCultures: (state, payload) => {
            state.cultures = payload;
        },
    },
    actions: {
        initCultures: ({ commit }, payload) => {
            commit('setRawCultures', payload)
            commit('setCultures', payload)
        },
    },
};

export default culture;
