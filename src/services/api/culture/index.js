import axiosInstance from '@/services/axios'

const endPoint = {
  lookupCultureList: () =>
    ``
}

const cultureAPI = {
  lookupCultureList: (params) =>
    axiosInstance.get(endPoint.lookupCultureList(), {
      params
    })
}

export default cultureAPI
