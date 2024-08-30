import cultureAPI from '@/services/api/culture';

const state = {
  isLoading: false, // 리팩토링
  cultures: [],
  cultureMap: new Map(),
  filteredCultures: [],
};

const actions = {
  fetchCultures: async ({ commit }) => {
    commit('SET_IS_LOADING', true);

    try {
      let allCultures = [];
      const params = {
        startIndex: 1,
        endIndex: 1000,
      };
      let isData = true;

      while (isData) {
        const response = await cultureAPI.fetchCultures(params);
        const cultures =
          response?.data?.culturalEventInfo?.row.map(
            (
              {
                CODENAME, //분류
                DATE, // 날짜/시간
                END_DATE, // 종료일
                ETC_DESC, // 기타내용
                GUNAME, // 자치구
                HMPG_ADDR, // 문화포털상세URL
                IS_FREE, // 유무료
                LAT, // 위도(X좌표)
                LOT, // 경도(Y좌표)
                MAIN_IMG, // 대표이미지
                ORG_LINK, // 홈페이지 주소
                ORG_NAME, // 기관명
                PLACE, // 장소
                PLAYER, // 출연자정보
                PROGRAM, // 프로그램소개
                RGSTDATE, // 신청일
                STRTDATE, //시작일
                THEMECODE, // 테마분류
                TICKET, // 시민/기관
                TITLE, // 공연/행사명
                USE_FEE, // 이용요금
                USE_TRGT, // 이용대상
              },
              index
            ) => ({
              id: params.startIndex + (index - 1),
              classification: CODENAME, //분류
              date: DATE, // 날짜/시간
              endDate: END_DATE, // 종료일
              etcDescription: ETC_DESC, // 기타내용
              guName: GUNAME, // 자치구
              homepageDetailAddress: HMPG_ADDR, // 문화포털상세URL
              isFree: IS_FREE, // 유무료
              lat: LOT, // 위도(X좌표)
              lng: LAT, // 경도(Y좌표)
              mainImage: MAIN_IMG, // 대표이미지
              homepageAddress: ORG_LINK, // 홈페이지 주소
              organizationName: ORG_NAME, // 기관명
              place: PLACE, // 장소
              performerInformation: PLAYER, // 출연자정보
              programIntroduction: PROGRAM, // 프로그램소개
              registrationDate: RGSTDATE, // 신청일
              startDate: STRTDATE, //시작일
              themeClassification: THEMECODE, // 테마분류
              register: TICKET, // 시민/기관
              title: TITLE, // 공연/행사명
              useFee: USE_FEE, // 이용요금
              useTarget: USE_TRGT, // 이용대상
            })
          ) || [];

        if (cultures.length === 0) isData = false; // 데이터가 없으면 종료

        allCultures = [...allCultures, ...cultures];
        params.startIndex = params.startIndex + 1000;
        params.endIndex = params.endIndex + 1000;
      }

      const cultureMap = new Map();
      allCultures.forEach(item => cultureMap.set(item.id, item));

      commit('SET_CULTURES', allCultures);
      commit('SET_CULTURE_MAP', cultureMap);
      commit('SET_FILTERED_CULTURES', allCultures);
    } catch (error) {
      console.error('Error fetching cultures:', error);
    } finally {
      commit('SET_IS_LOADING', false);
    }
  },
  fetchFilteredCultures: ({ state, commit }, { keyword = '' }) => {
    commit('SET_IS_LOADING', true);
    const filteredCultures = state.cultures.filter(culture =>
      culture.title.toUpperCase().includes(keyword.toUpperCase())
    );

    commit('SET_IS_LOADING', false);
    commit('SET_FILTERED_CULTURES', filteredCultures);
  },
};

const mutations = {
  SET_IS_LOADING: (state, payload) => {
    state.isLoading = payload;
  },
  SET_CULTURES: (state, payload) => {
    state.cultures = payload;
  },
  SET_CULTURE_MAP: (state, payload) => {
    state.cultureMap = payload;
  },
  SET_FILTERED_CULTURES: (state, payload) => {
    state.filteredCultures = payload;
  },
};

const getters = {
  getFilteredCultures: state => {
    return state.filteredCultures;
  },
  getCultureMap: state => {
    return state.cultureMap;
  },
  getCultures: state => {
    return state.cultures;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
