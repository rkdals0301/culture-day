const culture = {
    namespaced: true,
    state: {
        rawCultures: [],
        cultures: [],
    },
    getters: {},
    mutations: {
        setRawCultures: (state, payload) => {
            state.rawCultures = payload;
        },
        setCultures: (state, payload) => {
            state.cultures = payload;
        },
    },
    actions: {
        initCultures: (state, payload) => {
            state.rawCultures = payload;
            state.culture = payload;
        },
    },
};

export default culture;
