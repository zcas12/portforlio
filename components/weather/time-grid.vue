<template>
  <div>
    <el-row class="row mb-2">
      <div style="margin-top: 5px; color: #606266; ">시간대별 기온</div>
    </el-row>
    <el-table
      style="width: 100%"
      :data="gridData"
      height="280px"
      border

      stripe
    >
      <el-table-column
        prop="fcstTime"
        width="100"
        label="시간"
      >
        <template slot-scope="scope">
          {{timeConvert(scope.row.fcstTime)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="fcstValue"
        label="기온"
      >
        <template slot-scope="scope">
          {{scope.row.fcstValue}}°
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>

export default {
  props:{
    gridData: {
      type: Array,
      required: true
    }
  },
  data: () => ({

  }),
  methods:{
    timeConvert(val){
      return val?.substr(0, 2) + " 시";
    }
  }
}
</script>
