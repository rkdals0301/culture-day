<template>
    <div />
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "Snackbar",
    data() {
        return {
            isShow: false,
            type: "",
            text: "",
        };
    },
    created() {
        this.setSnackbar();
        this.setSubscribe();
    },
    methods: {
        ...mapActions("snackbar", ["showSnackbar"]),
        setSnackbar() {
            this.$root.showSnackbar = (type, text) => {
                this.showSnackbar({
                    type,
                    text,
                });
            };
        },
        setSubscribe() {
            this.$store.subscribe((mutation, state) => {
                if (mutation.type !== "snackbar/SET_SNACKBAR") return;

                this.type = state.snackbar.type;
                this.text = state.snackbar.text;
                this.isShow = true;
            });
        },
    },
};
</script>

<style lang="scss" scoped></style>
