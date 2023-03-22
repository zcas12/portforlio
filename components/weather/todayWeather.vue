<template>
  <el-row >
    <el-col
      class="pa-2"
      :xs="12" :sm="12" :md="24" :lg="6" :xl="6"
    >
      <el-card class="box-card h-200p" style="color: #606266;">
        <div slot="header" class="clearfix">
          <h3 style="color: #606266; margin: 0;">기온</h3>
        </div>
        <el-row class="row justify-center align-center">
          <span style="font-size: 48px;">{{current(tmp)?.fcstValue}}</span>
          <span class="weather-font ml-1 mb-3">°</span>
          <span class="feels-like ml-2">체감온도:{{feelsLikeTemp(openWeather?.feels_like)}}</span>
        </el-row>
        <el-row class="row justify-space-around align-center mt-1 ">
          <span class="weather-font red">최고: {{maxTemp}}°</span>
          <span class="weather-font blue">최저: {{minTemp}}°</span>
        </el-row>
      </el-card>
    </el-col>
    <el-col
      class="pa-2"
      :xs="12" :sm="12" :md="12" :lg="4" :xl="4"
    >
      <el-card class="box-card h-200p">
        <div slot="header" class="clearfix">
          <h3 style="color: #606266; margin: 0;">하늘상태</h3>
        </div>
        <el-row class="row justify-center align-center mt-1">
          <i
            v-if="current(sky)?.fcstValue === '1' && !night"
            class="el-icon-sunny weather-icon"
            style="color: #606266"
          ></i>
          <i
            v-if="current(sky)?.fcstValue === '1' && night"
            class="el-icon-moon weather-icon"
          ></i>
          <i
            v-if="current(sky)?.fcstValue === '3'"
            class="el-icon-cloudy-and-sunny weather-icon"
            style="color: #606266"
          ></i>
          <i
            v-if="current(sky)?.fcstValue === '4'"
            class="el-icon-cloudy weather-icon"
            style="color: #606266"
          ></i>
          <i
            v-if="current(sky)?.fcstValue === '2'"
            class="el-icon-heavy-rain weather-icon"
            style="color: #00A1E9"
          ></i>
        </el-row>
        <el-row class="row justify-space-around align-center mt-1">
          <span
            v-if="current(sky)?.fcstValue === '1'"
            class="weather-font"
          >맑음</span>
          <span
            v-if="current(sky)?.fcstValue === '3'"
            class="weather-font"
          >구름 조금</span>
          <span
            v-if="current(sky)?.fcstValue === '4'"
            class="weather-font"
          >흐림</span>
          <span
            v-if="current(sky)?.fcstValue === '2'"
            class="weather-font"
          >비</span>
        </el-row>
      </el-card>
    </el-col>
    <el-col
      class="pa-2"
      :xs="12" :sm="12" :md="12" :lg="4" :xl="4"
    >
      <el-card class="box-card h-200p">
        <div slot="header" class="clearfix">
          <h3 style="color: #606266; margin: 0;">습도</h3>
        </div>
        <el-row class="row justify-center align-center mt-4" style="color: #606266;">
          <span style="font-size: 48px;">{{current(reh)?.fcstValue}}</span>
          <span  class="weather-font ml-1 mb-3">%</span>
        </el-row>
      </el-card>

    </el-col>
    <el-col
      class="pa-2"
      :xs="12" :sm="12" :md="12" :lg="4" :xl="4"
    >
      <el-card class="box-card h-200p">
        <div slot="header" class="clearfix">
          <h3 style="color: #606266; margin: 0;">풍속</h3>
        </div>
        <el-row class="row justify-center align-end mt-4" style="color: #606266;">
          <i
            class="el-icon-wind-power mr-4 mb-2"
            style="font-size: 2.0em;"
          ></i>
          <span style="font-size: 48px;">{{current(wsd)?.fcstValue}}</span>
          <span  class="weather-font ml-1" style="margin-bottom: 5px;">m/s</span>
        </el-row>
      </el-card>
    </el-col>
    <el-col
      class="pa-2"
      :xs="12" :sm="12" :md="12" :lg="6" :xl="6"
    >
      <el-card class="box-card h-200p" style="color: #606266;">
        <div slot="header" class="clearfix">
          <el-row class="row">
          <h3 style="color: #606266; margin: 0;">대기</h3>
          <div class="ml-auto" style="font-size: 14px">
            단위: ug/m3
          </div>
          </el-row>
        </div>
        <el-row class="row mt-5">
          <el-col class="text-align-center">
            <div>
              <h4 style="color: #606266; margin: 0;">미세먼지</h4>
            </div>
            <div class="mt-3">
              <FontAwesomeIcon v-if="pm10Grade === '최고'" class="ice air-icon" :icon="['fas', 'face-laugh-beam']"/>
              <FontAwesomeIcon v-if="pm10Grade === '좋음'" class="blue air-icon" :icon="['fas', 'smile']" />
              <FontAwesomeIcon v-if="pm10Grade === '보통'" class="green air-icon" :icon="['fas', 'meh']" />
              <FontAwesomeIcon v-if="pm10Grade === '나쁨'" class="orange air-icon" :icon="['fas', 'frown']"/>
              <FontAwesomeIcon v-if="pm10Grade === '매우나쁨'" class="red air-icon" :icon="['fas', 'angry']" />
              <span style="font-size: 20px;" :class="pm10Class" >{{pm10Grade}} {{airKorea.pm10Value}}</span>
            </div>
          </el-col>
          <el-col class="text-align-center">
            <div>
              <h4 style="color: #606266; margin: 0;">초미세먼지</h4>
            </div>
            <div class="mt-3">
              <FontAwesomeIcon v-if="pm25Grade === '최고'" class="ice air-icon" :icon="['fas', 'face-laugh-beam']"  />
              <FontAwesomeIcon v-if="pm25Grade === '좋음'" class="blue air-icon" :icon="['fas', 'smile']" />
              <FontAwesomeIcon v-if="pm25Grade === '보통'" class="green air-icon" :icon="['fas', 'meh']" />
              <FontAwesomeIcon v-if="pm25Grade === '나쁨'" class="orange air-icon" :icon="['fas', 'frown']" />
              <FontAwesomeIcon v-if="pm25Grade === '매우나쁨'" class="red air-icon" :icon="['fas', 'angry']"/>
              <span style="font-size: 20px;" :class="pm25Class" >{{pm25Grade}} {{airKorea.pm25Value}}</span>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>

  </el-row>
</template>
<script>
import {mapGetters} from "vuex";
import _ from "lodash";
import dayjs from "dayjs";
export default {
  data: () => ({
    today: dayjs().format('YYYYMMDD'),
    night: false,
  }),
  created() {
    this.dayAndNight();
  },
  computed:{
    ...mapGetters('weather', ['TMP','TMX','TMN','SKY','REH','WSD','openWeather','airKorea']),
    hour(){
      let today = new Date();
      return today.getHours() < 10 ? "0" + today.getHours() : today.getHours();
    },
    maxTemp(){
      let list = _.map(this.tmp, "fcstValue")
      list.map(Number);
      return Math.max.apply(null, list);
    },
    minTemp(){
      let list = _.map(this.tmp, "fcstValue")
      list.map(Number);
      return Math.min.apply(null, list);
    },
    tmpList(){
      const tmp = _.cloneDeep(this.TMP);
      let hh = this.hour;
      const index = _.findIndex(this.TMP, { fcstDate: this.today, fcstTime: hh+"00" })
      tmp.splice(0, index)
      tmp.length = 10;
      return tmp;
    },
    sky(){
      return _.filter(this.SKY, { fcstDate: this.today });
    },
    tmp(){
      return _.filter(this.TMP, { fcstDate: this.today });
    },
    reh(){
      return _.filter(this.REH, { fcstDate: this.today });
    },
    wsd(){
      return _.filter(this.WSD, { fcstDate: this.today });
    },
    pm10Grade(){
      let pm10Value = this.airKorea?.pm10Value
      pm10Value = parseInt(pm10Value)
      console.log(15 < pm10Value < 31)
      console.log(pm10Value)
      return pm10Value < 16 ? "최고" : 15 < pm10Value && pm10Value < 31 ? "좋음" : 30 < pm10Value && pm10Value < 81 ? "보통" : 80 < pm10Value && pm10Value< 151 ? "나쁨" :  pm10Value > 150 ? "매우나쁨" : "-"
    },
    pm25Grade(){
      let pm25Value = this.airKorea?.pm25Value
      pm25Value = parseInt(pm25Value)
      return pm25Value < 8 ? "최고" : 7 < pm25Value && pm25Value < 16 ? "좋음" : 15 < pm25Value && pm25Value < 36 ? "보통" : 35 < pm25Value && pm25Value < 76 ? "나쁨" :  pm25Value > 75 ? "매우나쁨" : "-"
    },
    pm10Class(){
      let pm10Value = this.airKorea?.pm10Value
      pm10Value = parseInt(pm10Value)
      return pm10Value < 16 ? "ice" : 15 < pm10Value && pm10Value< 31 ? "blue" : 30 < pm10Value && pm10Value < 81 ? "green" : 80 < pm10Value && pm10Value < 151 ? "orange" :  pm10Value > 150 ? "red" : "green"
    },
    pm25Class(){
      let pm25Value = this.airKorea?.pm25Value
      pm25Value = parseInt(pm25Value)
      return pm25Value < 8 ? "ice" : 7 < pm25Value && pm25Value < 16 ? "blue" : 15 < pm25Value && pm25Value < 36 ? "green" : 35 < pm25Value && pm25Value < 76 ? "orange" :  pm25Value > 75 ? "red" : "green"

    }
  },
  methods:{
    current(val){
      return _.find(val, { fcstTime: dayjs().get("h") + "00" });
    },
    dayAndNight(){
      let today =new Date();
      let hh = today.getHours();
      this.night= hh>=7 && hh<=17 ? false : true;
    },
    feelsLikeTemp(val){
      return val? Math.floor(val - 273.15) + "°" : "-"
    },

  }
}
</script>
<style>
.weather-icon{
  font-size: 3.6em;
  color: #606266;
}
.feels-like{
  color: #606266;
  font-weight: bold;
  font-size: 16px;
  margin-top: 23px;
}
.weather-font{
  font-size: 24px; color: #606266;
}
.weather-font.red{
  font-size: 24px; color: #f56c6c;
}
.weather-font.blue{
  font-size: 24px; color: #00A1E9;
}
.air-icon{
  font-size: 24px;
}
</style>
