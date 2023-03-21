<template>
  <el-card>
    <div>
      <h4 style="color: #606266;">{{ title }}</h4>
    </div>
    <apexchart
      width="100%"
      height="305px"
      type="area"
      :options="chartOptions"
      :series="series"
    >
    </apexchart>
  </el-card>
</template>
<script>
export default {
  name:"timeChart",
  props: {
    chartData: {
      type: Array,
      required: true
    },
    dataType: {
      type: String,
      required: true
    }
  },
  data: () => ({
    series: [{name: '',data: []}],
  }),
  created() {
    this.loadData();
  },
  computed:{
    title(){
      return this.dataType ===  "pcp" ? "강수량" : this.dataType === "reh" ? "습도": "";
    },
    chartOptions: function () {
      return {
        height: 275,
        type: 'area',
        chart: {
          stacked: false,
          zoom: {
            enabled: false,
            type: 'xy',
          },
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0,
        },
        stroke: {
          curve: 'smooth',
          width: 1.3,
        },
        colors: ['rgba(59,125,221, 1)','rgba(231, 76, 94, 1)'],
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
          },
        },
        yaxis: {
          labels: {
            formatter: (val) => {
              return this.dataType === "pcp" ? val + 'mm' : this.dataType === "reh" ? val + '%': val;
            }
          },
        },
        xaxis: {
          type: 'category',
          tickPlacement: 'between',
          categories: _.map(this.chartData,'fcstTime'),
          labels: {
            formatter: function (val) {
              let today =new Date();
              let hh = today.getHours();
              if (hh == val.substr(0, 2)){
                return "지금"
              }else{
                return val.substr(0, 2) + ":00";
              }
            },
          },
        },
        tooltip: {
          shared: true,
          y: {
            formatter: (val) => {
              if(!val) val = 0;
              return this.dataType === "pcp" ? val + 'mm' : this.dataType === "reh" ? val + '%': val;
            }
          }
        }//end tooltip

      }
    }//end chartOption
  },
  watch:{
    chartData(){
      this.updateData();
    },
  },
  methods:{
    loadData() {
      this.series[0] = {
        name: this.dataType === "pcp" ? '강수량' : this.dataType === "reh" ? '습도': '',
        data: _.map(this.chartData, 'fcstValue').map(Number)
      }
    },
    updateData(){
      this.series[0] = {
        name: this.dataType === "pcp" ? '강수량' : this.dataType === "reh" ? '습도': '',
        data: _.map(this.chartData, 'fcstValue').map(Number)
      }
    }
  }

}
</script>
