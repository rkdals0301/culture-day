<template>
  <div />
</template>

<script>
export default {
  name: 'Snackbar',
  data() {
    return {
      isShow: false,
      type: '',
      text: '',
    };
  },
  created() {
    this.setSubscribe();
  },
  beforeUnmount() {
    this.unsubscribe();
  },
  methods: {
    setSubscribe() {
      this.unsubscribe = this.$store.subscribe((mutation, state) => {
        if (mutation.type !== 'snackbar/SET_SNACKBAR') return;

        this.type = state.snackbar.type;
        this.text = state.snackbar.text;
        this.isShow = true;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
