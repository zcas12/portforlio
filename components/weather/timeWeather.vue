<template>
  <el-row class="pa-2">
    <el-card class="wrap-vertical" >
      <div slot="header" class="clearfix">
        <el-row class="row justify-center align-center">
          <el-col
            v-for="(tmp,index) in tmpList"
            :key="index"
            class="text-align-center"
          >
            <div
              style="font-size: 2.0em; color: #1f2f3d"
            >
              {{titleTime(tmp?.fcstTime)}}
            </div>
          </el-col>
        </el-row>
      </div>
      <el-row class="row justify-center align-center ml-1">
        <el-col
          v-for="(sky,index) in skyList"
          :key="index"
          class="text-align-center"
        >
          <i
            v-if="sky?.fcstValue === '1' && !dayAndNight(sky?.fcstTime)"
            class="el-icon-sunny weather-icon"
            style="color: #FFA500"
          ></i>
          <i
            v-if="sky?.fcstValue === '1' && dayAndNight(sky?.fcstTime)"
            class="el-icon-moon weather-icon"
          ></i>
          <i
            v-if="sky?.fcstValue === '3'"
            class="el-icon-cloudy-and-sunny weather-icon"
            style="color: #606266"
          ></i>
          <i
            v-if="sky?.fcstValue === '4'"
            class="el-icon-cloudy weather-icon"
            style="color: #606266"
          ></i>
          <i
            v-if="sky?.fcstValue !== '1' && sky?.fcstValue !== '3' && sky?.fcstValue !== '4'"
            class="el-icon-heavy-rain weather-icon"
            style="color: #00A1E9"
          ></i>
        </el-col>
      </el-row>
      <el-row class="row justify-center align-center mt-5" >
        <el-col
          v-for="(tmp,index) in tmpList"
          :key="index"
          class="text-align-center"
        >
          <div
            style="font-size: 2.0em; color: #1f2f3d"
            class="mt-5"
          >
            {{tmp?.fcstValue}}°
          </div>
        </el-col>
      </el-row>
    </el-card>
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
    ...mapGetters('weather', ['TMP','TMX','TMN','SKY','REH','WSD','PTY']),
    hour(){
      let today = new Date();
      return today.getHours() < 10 ? "0" + today.getHours() : today.getHours();
    },
    tmpList(){
      const tmp = _.cloneDeep(this.TMP);
      let hh = this.hour;
      const index = _.findIndex(this.TMP, { fcstDate: this.today, fcstTime: hh+"00" })
      tmp.splice(0, index)
      tmp.length = 12;
      return tmp;
    },
    skyList(){
      const sky = _.cloneDeep(this.SKY);
      let hh = this.hour;
      const index = _.findIndex(this.SKY, { fcstDate: this.today, fcstTime: hh+"00" })
      sky.splice(0, index)
      sky.length = 12;
      return sky;
    },
  },
  methods:{
    titleTime(val){
      val = val?.substr(0, 2)
      if (val == this.hour){
        return "지금";
      }else {
        return val + "시";
      }
    },
    dayAndNight(val){
      val = val?.substr(0, 2)
      return val >=7 && val <=17 ? false : true;
    }
  }
}
</script>
<style scoped>
.weather-icon{
  font-size: 4.0em;
  color: #1f2f3d;
}
.wrap-vertical{
  white-space:nowrap;
  overflow-x: auto;
}
/*.wrap-vertical::-webkit-scrollbar{
  display: none;
}*/
.wrap-vertical::-webkit-scrollbar {
  width: 5px;
  height: 7px;
}
.wrap-vertical::-webkit-scrollbar-thumb {
  background-color: #E1E1E1;
  border-radius: 10px;
}
.wrap-vertical::-webkit-scrollbar-track {
  background-color: #F5F5F5;
  border-radius: 10px;
}
</style>
