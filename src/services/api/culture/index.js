import axiosInstance from '@/services/Axios';
// import axios from 'axios';

const startIndex = 1;
const endIndex = 1000;

const endPoint = {
  fetchCultures: () => `/culturalEventInfo/${startIndex}/${endIndex}`,
};

const cultureAPI = {
  fetchCultures: () => axiosInstance.get(endPoint.fetchCultures()),
  // fetchCultures: () => axios.get('mock/mock.json'),
};

export default cultureAPI;
