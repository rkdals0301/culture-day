// import axiosInstance from "@/services/Axios";
import axios from 'axios';

// const startIndex = 1;
// const endIndex = 1000;

// const endPoint = {
// fetchCultures: (params) => `/culturalEventInfo/${startIndex}/${endIndex}`,
// };

const cultureAPI = {
  // fetchCultures: (params) =>
  //     axiosInstance.get(endPoint.fetchCultures(), {
  //         params,
  //     }),
  fetchCultures: () => axios.get('mock/mock.json'),
};

export default cultureAPI;
