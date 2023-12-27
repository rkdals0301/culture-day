import Vue from "vue";
import App from "@/App.vue";
import VueRouter from "vue-router";
import router from "@/router";
import store from "@/store";
import _ from "lodash";
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false;
Vue.config.errorHandler = (error) => {
    console.error("errorHandler", error);
};

Vue.use(VueRouter);
Vue.use(VueLazyload);

Vue.prototype.$_ = _;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
