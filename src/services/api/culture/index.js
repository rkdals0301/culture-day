// import axiosInstance from "@/services/Axios";
import axios from "axios";

// const getMockFile = () => {
//     // 개발 환경에서는 상대 경로 사용
//     if (process.env.NODE_ENV === "development") {
//         return `/mock/mock.json`;
//     }
//     // 프로덕션 환경에서는 publicPath를 고려한 절대 경로 사용
//     return `/culture-day/`;
// };

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
    fetchCultures: () => axios.get("mock/mock.json"),
};

export default cultureAPI;
