<template>
  <el-container direction="horizontal" class="h-100">
    <el-menu
      :default-active="active"
      :router="true"
      :collapse="isCollapse"
      class="h-100 el-menu-nav"
      text-color="#7a90a9"
      active-text-color="#3C9AFF"
      background-color="#263544"
    >
      <el-menu-item index="/weather">
        <i class="el-icon-sunny"></i>
        <span slot="title">오늘의 날씨</span>
      </el-menu-item>
<!--      <el-menu-item index="/main">
        <i class="el-icon-user"></i>
        <span slot="title">이력서</span>
      </el-menu-item>-->
    </el-menu>

    <el-container direction="vertical" class="h-100">
      <el-header class="white" style="box-shadow: 0 0 8px 4px rgba(0,0,0,0.1); z-index: 1">
        <div class="row flex-warp justify-space-between align-center h-100">
          <div >
            <el-tooltip class="item" effect="dark" content="메뉴" placement="bottom">
              <el-button type="info" icon="el-icon-menu" circle @click="changeMenuCollapse"></el-button>
            </el-tooltip>
          </div>
          <div>

          </div>
          <div class="time-box mr-3" style="margin-left: auto;">
            <h4 style="color: #606266;">{{now}}</h4>
          </div>
        </div>
      </el-header>
      <el-scrollbar>
        <el-main class="h-100 pa-0">
          <Nuxt/>
        </el-main>
      </el-scrollbar>
    </el-container>

  </el-container>
</template>
<script>
import dayjs from "dayjs";

export default {
  name: 'DefaultLayout',
  data: () => ({
    isCollapse: false,
    now: "00:00:00",
  }),
  created() {
    this.time()

  },
  mounted() {
    setInterval(this.time,500)
  },
  computed:{
    active(){
      return this.$route.path;
    }
  },
  methods:{
    time(){
      this.now = dayjs().format("YYYY-MM-DD HH:mm:ss")
    },
    changeMenuCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  }
}
</script>
<style >
body {
  background-color: whitesmoke;
}
html, body {
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  height: 100%;
  margin:0;
}
div#__nuxt,
div#__layout {
  height: 100%;
}
.el-container{
  flex-basis: min-content !important;
}
.el-scrollbar__wrap {
  overflow-y: scroll;
  overflow-x: hidden;
  margin-bottom: 0 !important;
}
.el-menu{
  /*  minWidth: 300px !important;*/
}
.el-menu-nav:not(.el-menu--collapse) {
  width: 250px;
}
@media (max-width: 550px) {
  .time-box{
    display: none;
  }
}
</style>
