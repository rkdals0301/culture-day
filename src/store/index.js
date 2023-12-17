import Vue from "vue";
import Vuex from "vuex";
import snackbar from "@/store/snackbar";
import culture from "@/store/culture";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        snackbar,
        culture,
    },
});
