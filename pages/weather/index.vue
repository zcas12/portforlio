<template>
  <div className="container ">
    <el-row class="pa-2 mt-3">
      <el-select v-model="region" placeholder="지역">
        <el-option
          v-for="item in regionList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
<!--      <el-date-picker
        v-model="date"
        type="date"
        placeholder="날짜"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd">
      </el-date-picker>-->
      <el-button
        type="primary"
        icon="el-icon-search"
        class="ml-2"
        circle
        @click="search()"
      >
      </el-button>
    </el-row>
    <el-row>
      <todayWeather></todayWeather>
    </el-row>
    <el-row>
      <timeWeather></timeWeather>
    </el-row>
    <el-row >
      <el-col
        class="pa-2"
        :xs="24" :sm="24" :md="24" :lg="12">
        <time-chart :chartData="pcpList" dataType="pcp"></time-chart>
        {{pcpList}}
      </el-col>
      <el-col
        class="pa-2"
        :xs="24" :sm="24" :md="24" :lg="12">
        <time-chart :chartData="rehList" dataType="reh"></time-chart>
        {{rehList}}
      </el-col>
    </el-row>
  </div>
</template>

<script lang="js">
import {mapActions, mapGetters} from "vuex";
import dayjs from "dayjs";
import todayWeather from "../../components/weather/todayWeather";
import timeWeather from "../../components/weather/timeWeather";
import timeGrid from "../../components/weather/time-grid";
import timeChart from "../../components/weather/time-chart";
import _ from "lodash";

export default {
  async asyncData({store}) {
    await store.dispatch("weather/findWeather")
  },
  components:{
    todayWeather,timeGrid,timeChart,timeWeather
  },
  data: () => ({
    region: "02",
    date : dayjs().format('YYYY-MM-DD'),
    today: dayjs().format('YYYYMMDD'),
    regionList:[
      { value: '02', label: '서울' },
      { value: '051', label: '부산' },
      { value: '053', label: '대구' },
      { value: '032', label: '인천' },
      { value: '062', label: '광주' },
      { value: '042', label: '대전' },
      { value: '052', label: '울산' },
      { value: '044', label: '세종' },
      { value: '031', label: '경기' },
      { value: '033', label: '강원' },
      { value: '043', label: '충북' },
      { value: '041', label: '충남' },
      { value: '063', label: '전북' },
      { value: '061', label: '전남' },
      { value: '054', label: '경북' },
      { value: '055', label: '경남' },
      { value: '064', label: '제주' }
    ]
  }),
  computed: {
    ...mapGetters('weather', ['TMP','PCP','REH']),
/*    tmp(){
      return _.filter(this.TMP, { fcstDate: this.today });
    },*/
    hour(){
      let today = new Date();
      return today.getHours();
    },
    pcpList(){
      const pcp = _.cloneDeep(this.PCP);
      let hh = this.hour;
      console.log("hh = " + hh)
      const index = _.findIndex(this.PCP, { fcstDate: this.today, fcstTime: hh+"00" })

      pcp.splice(0, index)
      pcp.length = 15;
      return pcp;
    },
    rehList(){
      const reh = _.cloneDeep(this.REH);
      let hh = this.hour;
      const index = _.findIndex(this.REH, { fcstDate: this.today, fcstTime: hh+"00" })

      reh.splice(0, index)
      reh.length = 15;
      return reh;
    },
  },
  methods: {
    ...mapActions('weather', ['findWeather','findOpenWeather']),
    search(){
      const param = {
        region: this.region,
        date : dayjs(this.date).format('YYYYMMDD')
      }
      this.findWeather(param);
      //this.findOpenWeather(param);
    }
  }
}
</script>
