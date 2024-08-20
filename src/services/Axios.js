import axios from 'axios';

const baseURL = `${process.env.VUE_APP_SEOUL_URL}/${process.env.VUE_APP_SEOUL_AUTH_KEY}/${process.env.VUE_APP_SEOUL_RESPONSE_TYPE}`;

const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

export default instance;
