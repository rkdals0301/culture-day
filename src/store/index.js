import { createStore } from 'vuex';
import snackbar from '@/store/snackbar';
import culture from '@/store/culture';

export default createStore({
  modules: {
    snackbar,
    culture,
  },
});
