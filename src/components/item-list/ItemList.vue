<template>
  <div class="item-list-wrapper">
    <item
      v-for="culture in cultures"
      :key="culture.id"
      :culture="culture"
    ></item>
  </div>
</template>

<script>
import Item from "./item/Item.vue";

export default {
  name: "ItemList",
  components: { Item },
  data() {
    return {
      // item dummies
      cultures: [
        {
          id: 1,
          title:
            "[2023 카즈미 타테이시 트리오 내한공연] 크리스마스, 재즈를 만나다",
          url: "https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=1d4309b7571e4ad5aab07a8811b72f91&thumb=Y",
          place: "마포아트센터 아트홀 맥",
          startDate: "2023-12-10",
          endDate: "2023-12-10",
        },
        {
          id: 2,
          title:
            "[M클래식 축제] 마포공연예술관광페스티벌 [타케자와 유토 피아노 리사이틀]",
          url: "https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=98b236d199594782b856d8529279f60f&thumb=Y",
          place: "마포아트센터 아트홀 맥",
          startDate: "2023-12-07",
          endDate: "2023-12-07",
        },
        {
          id: 3,
          title: "2023 서울정원박람회",
          url: "https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=c5782f9ec4d741d09178c2a3bceaac6e&thumb=Y",
          place: "월드컵공원(하늘공원) 일대",
          startDate: "2023-10-06",
          endDate: "2023-10-12",
        },
      ],
    };
  },
};
</script>

<style scoped>
.item-list-wrapper {
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  height: calc(100% - 60px);
  background-color: #fff;
}
</style>
