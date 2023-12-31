import cultureAPI from "@/services/api/culture";

const state = {
    isLoading: false, // 리팩토링
    cultures: [],
    cultureMap: new Map(),
    filteredCultures: [],
};

const actions = {
    fetchCultures: async ({ commit }) => {
        commit("SET_IS_LOADING", true);
        const response = await cultureAPI.fetchCultures();
        const cultures = response?.data?.DATA.map((item, index) => ({
            id: index,
            ...item,
        }));

        const cultureMap = new Map();
        cultures.forEach((item) => cultureMap.set(item.id, item));

        commit("SET_IS_LOADING", false);
        commit("SET_CULTURES", cultures);
        commit("SET_CULTURE_MAP", cultureMap);
        commit("SET_FILTERED_CULTURES", cultures);
    },
    fetchFilteredCultures: ({ state, commit }, { keyword = "" }) => {
        commit("SET_IS_LOADING", true);
        const filteredCultures = state.cultures.filter((culture) =>
            culture.title.toUpperCase().includes(keyword.toUpperCase())
        );

        commit("SET_IS_LOADING", false);
        commit("SET_FILTERED_CULTURES", filteredCultures);
    },
};

const mutations = {
    SET_IS_LOADING: (state, payload) => {
        state.isLoading = payload;
    },
    SET_CULTURES: (state, payload) => {
        state.cultures = payload;
    },
    SET_CULTURE_MAP: (state, payload) => {
        state.cultureMap = payload;
    },
    SET_FILTERED_CULTURES: (state, payload) => {
        state.filteredCultures = payload;
    },
};

const getters = {
    getFilteredCultures: (state) => {
        return state.filteredCultures;
    },
    getCultureMap: (state) => {
        return state.cultureMap;
    },
    getCultures: (state) => {
        return state.cultures;
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
};
