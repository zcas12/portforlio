<template>
  <el-row >
    <el-col
      class="pa-2"
      :xs="12" :sm="12" :md="6" :lg="6" :xl="6"
    >
      <el-card class="box-card h-200p" style="color: #1f2f3d;">
        <div slot="header" class="clearfix">
          <h3 style="color: #606266; margin: 0;">기온</h3>
        </div>
        <el-row class="row justify-center align-center">
          <span style="font-size: 48px;">{{current(tmp)?.fcstValue}}</span>
          <span  class="weather-font ml-1 mb-3">°</span>
        </el-row>
        <el-row class="row justify-space-around align-center mt-1 ">
          <span class="weather-font red">최고: {{maxTemp}}°</span>
          <span class="weather-font blue">최저: {{minTemp}}°</span>
        </el-row>
      </el-card>

    </el-col>
    <el-col
      class="pa-2"
      :xs="12" :sm="12" :md="6" :lg="6" :xl="6"
    >
      <el-card class="box-card h-200p">
        <div slot="header" class="clearfix">
          <h3 style="color: #606266; margin: 0;">하늘상태</h3>
        </div>
        <el-row class="row justify-center align-center mt-1">
          <i
            v-if="current(sky)?.fcstValue === '1' && !night"
            class="el-icon-sunny weather-icon"
            style="color: #FFA500"
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
      :xs="12" :sm="12" :md="6" :lg="6" :xl="6"
    >
      <el-card class="box-card h-200p">
        <div slot="header" class="clearfix">
          <h3 style="color: #606266; margin: 0;">습도</h3>
        </div>
        <el-row class="row justify-center align-center mt-4" style="color: #1f2f3d;">
          <span style="font-size: 48px;">{{current(reh)?.fcstValue}}</span>
          <span  class="weather-font ml-1 mb-3">%</span>
        </el-row>
      </el-card>

    </el-col>
    <el-col
      class="pa-2"
      :xs="12" :sm="12" :md="6" :lg="6" :xl="6"
    >
      <el-card class="box-card h-200p">
        <div slot="header" class="clearfix">
          <h3 style="color: #606266; margin: 0;">풍속</h3>
        </div>
        <el-row class="row justify-center align-center">
        </el-row>
        <el-row class="row justify-center align-end mt-4" style="color: #1f2f3d;">
          <i
            class="el-icon-wind-power mr-4 mb-2"
            style="font-size: 2.0em;"
          ></i>
          <span style="font-size: 48px;">{{current(wsd)?.fcstValue}}</span>
          <span  class="weather-font ml-1" style="margin-bottom: 5px;">m/s</span>
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
    night: false
  }),
  created() {
    this.dayAndNight();
  },
  computed:{
    ...mapGetters('weather', ['TMP','TMX','TMN','SKY','REH','WSD']),
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
      let today =new Date();
      let hh = today.getHours();
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
  },
  methods:{
    current(val){
      return _.find(val, { fcstTime: dayjs().get("h") + "00" });
    },
    dayAndNight(){
      let today =new Date();
      let hh = today.getHours();
      this.night= hh>=7 && hh<=17 ? false : true;
    }
  }
}
</script>
<style>
.weather-icon{
  font-size: 3.6em;
  color: #1f2f3d;
}
.weather-font{
  font-size: 24px; color: #1f2f3d;
}
.weather-font.red{
  font-size: 24px; color: #f56c6c;
}
.weather-font.blue{
  font-size: 24px; color: #00A1E9;
}
</style>
