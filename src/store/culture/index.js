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
        initCultures: ({state}, payload) => {
            state.rawCultures = payload;
            state.cultures = payload;
        },
    },
};

export default culture;
