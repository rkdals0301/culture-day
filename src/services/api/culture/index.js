import axiosInstance from '@/services/Axios';
// import axios from 'axios';

const endPoint = {
  fetchCultures: ({ startIndex, endIndex }) => `/culturalEventInfo/${startIndex}/${endIndex}`,
};

const cultureAPI = {
  fetchCultures: params => axiosInstance.get(endPoint.fetchCultures(params)),
  // fetchCultures: () => axios.get('mock/mock.json'),
};

export default cultureAPI;
