import axios from 'axios';

const baseURL = `/api/${import.meta.env.VUE_APP_SEOUL_AUTH_KEY}/${import.meta.env.VUE_APP_SEOUL_RESPONSE_TYPE}`;

const instance = axios.create({
  baseURL: baseURL,
  timeout: 100000, // 10sec
});

export default instance;
