import axiosInstance from '@/services/axios'

const endPoint = {
  lookupCultureList: () => `/culturalEventInfo/1/1000/`
}

const cultureAPI = {
  lookupCultureList: (params) =>
    axiosInstance.get(endPoint.lookupCultureList(), {
      params
    })
}

export default cultureAPI
