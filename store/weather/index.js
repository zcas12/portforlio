import _ from "lodash";
import dayjs from "dayjs";

export const state = () => ({
  TMP: [], //기온
  TMX: [], //최고기온
  TMN: [], //최저기온
  SKY: [], //하늘상태
  PCP: [],
  REH: [], //습도
  WSD: [], //풍속
  koreaXy:[
    { region: '02', nx: 60, ny:127 },
    { region: '051', nx: 98, ny:76 },
    { region: '053', nx: 89, ny:90 },
    { region: '032', nx: 55, ny:127 },
    { region: '062', nx: 58, ny:74 },
    { region: '042', nx: 80, ny:75 },
    { region: '052', nx: 102, ny:84 },
    { region: '044', nx: 65, ny:103 },
    { region: '031', nx: 60, ny:121 },
    { region: '033', nx: 92, ny:131 },
    { region: '043', nx: 69, ny:106 },
    { region: '041', nx: 68, ny:100 },
    { region: '063', nx: 63, ny:89 },
    { region: '061', nx: 50, ny:67 },
    { region: '054', nx: 91, ny:106 },
    { region: '055', nx: 90, ny:77 },
    { region: '064', nx: 52, ny:38 }
  ],
  koreaCity:[
    { region: '02', cityName: 'seoul' },
    { region: '051', cityName: 'busan' },
    { region: '053', nx: 89, ny:90 },
    { region: '032', nx: 55, ny:127 },
    { region: '062', nx: 58, ny:74 },
    { region: '042', nx: 80, ny:75 },
    { region: '052', nx: 102, ny:84 },
    { region: '044', nx: 65, ny:103 },
    { region: '031', nx: 60, ny:121 },
    { region: '033', nx: 92, ny:131 },
    { region: '043', nx: 69, ny:106 },
    { region: '041', nx: 68, ny:100 },
    { region: '063', nx: 63, ny:89 },
    { region: '061', nx: 50, ny:67 },
    { region: '054', nx: 91, ny:106 },
    { region: '055', nx: 90, ny:77 },
    { region: '064', nx: 52, ny:38 }
  ]
})
export const mutations = {
  TMPMutation(state, TMP){
    state.TMP = TMP;
  },
  TMXMutation(state, TMX){
    state.TMX = TMX;
  },
  TMNMutation(state, TMN){
    state.TMN = TMN;
  },
  SKYMutation(state, SKY){
    state.SKY = SKY;
  },
  PCPMutation(state, PCP){
    state.PCP = PCP;
  },
  REHMutation(state, REH){
    state.REH = REH;
  },
  WSDMutation(state, WSD){
    state.WSD = WSD;
  },
}
export const actions = {
  async findWeather({commit,state}, param) {
    const region = _.find(state.koreaXy, {region: param?.region ? param?.region : '02'});
    const date = param?.date ? param?.date : dayjs().format('YYYYMMDD')
    let time = dayjs().get("h") - 1
    time = time + "00"
    const key = "5gGuJsv9owR1AVnJPeTVmJD32a0%2BQX7xmAKj8mNQo6nnS%2FmaC67VPc12JQGZjAka5GMiVkiXhZS9SQiDeeuX3Q%3D%3D"
    //단기 예보 05:00 기준
    const vilageUrl = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?ServiceKey=${key}&pageNo=1&numOfRows=1300&dataType=JSON&base_date=${date}&base_time=0500&nx=${region.nx}&ny=${region.ny}`
    //초단기 예보
    const ultraUrl = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?ServiceKey=${key}&pageNo=1&numOfRows=1300&dataType=JSON&base_date=${date}&base_time=${time}&nx=${region.nx}&ny=${region.ny}`

    let vilageResult =  await this.$axios.get(vilageUrl);
    //let ultraResult =  await this.$axios.get(ultraUrl);
    let vilage = vilageResult.data?.response?.body?.items?.item
    //let ultra = ultraResult.data.response.body?.items?.item
    const TMP = _.filter(vilage, { category: 'TMP' });
    const TMX = _.filter(vilage, { category: 'TMX' });
    const TMN = _.filter(vilage, { category: 'TMN' });
    const SKY = _.filter(vilage, { category: 'SKY' });
    const PCP = _.filter(vilage, { category: 'PCP' });// 강수량
    const REH = _.filter(vilage, { category: 'REH' });// 습도
    const WSD = _.filter(vilage, { category: 'WSD' });// 풍속

    commit("TMPMutation", TMP);
    commit("TMXMutation", TMX);
    commit("TMNMutation", TMN);
    commit("SKYMutation", SKY);
    commit("PCPMutation", PCP);
    commit("REHMutation", REH);
    commit("WSDMutation", WSD);
  },
  async findOpenWeather({commit,state}, param) {
    const region = _.find(state.koreaCity, {region: param?.region ? param?.region : '02'});
    const key = "fe009c86e86ad46413742ef50f12572f";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${region.cityName}&appid=${key}`;
    let result =  await this.$axios.get(url);
    console.log(result.data)

  }
}
export const getters = {
  TMP: (state) => state.TMP,
  TMX: (state) => state.TMX,
  TMN: (state) => state.TMN,
  SKY: (state) => state.SKY,
  PCP: (state) => state.PCP,
  REH: (state) => state.REH,
  WSD: (state) => state.WSD,
}
