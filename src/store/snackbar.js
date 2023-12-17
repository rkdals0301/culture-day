const state = {
    type: "",
    text: "",
};

const actions = {
    showSnackbar: ({ commit }, payload) => {
        commit("SET_SNACKBAR", payload);
    },
};

const mutations = {
    SET_SNACKBAR: (state, payload) => {
        const { type, text } = payload;
        state.type = type;
        state.text = text;
    },
};

const getters = {};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
};
