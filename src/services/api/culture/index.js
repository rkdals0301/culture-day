import axiosInstance from "@/services/axios";

const startIndex = 1;
const endIndex = 30;

const endPoint = {
    lookupCultureList: () => `/culturalEventInfo/${startIndex}/${endIndex}`,
};

const cultureAPI = {
    lookupCultureList: (params) =>
        axiosInstance.get(endPoint.lookupCultureList(), {
            params,
        }),
};

export default cultureAPI;
