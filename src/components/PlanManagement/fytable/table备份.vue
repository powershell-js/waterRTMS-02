<template>
    <div class="outbox" :style="{height:(listoutboxHeight-95-80-70-130)+'px'}">
        <div class="tableoutbox" :style="{height:(listoutboxHeight-95-110-100-70)+'px'}">
              <el-table
            :data="tableData"
            border-top
            empty-text
            style="width: 100%" stripe :header-cell-style="headerStyle" :row-style="rowStyle" height="100%"
            element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading" element-loading-background="rgba(143, 188, 143, 0.8)"
             >
                <el-table-column class="red"
                prop="Station"
                label="监测点编号"
               min-width="100">
                </el-table-column>
                <el-table-column
                prop="PressureName"
                label="监测点名称"
               min-width="100">
                </el-table-column>
                <el-table-column
                prop="CtPressure"
                label="当前压力"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="RtPressure"
                label="所需压力"
                min-width="100">
                </el-table-column>
              <!--   <el-table-column
                prop="yl"
                label="最低压力"
                min-width="100">
                </el-table-column> -->
     </el-table>
        </div>
        <div class="fyoutbox">
            <div class="totalnum">共<span>{{tableData.length}}</span>条</div>
            <div class="fybutton">
                 <div class="block">
        <el-pagination
        @current-change="handleCurrentChange"
        :page-size="5"
        layout="prev, pager, next"
        :total="tableData.length">
        </el-pagination>
    </div>
            </div>
        </div>
    </div>
</template>
<script>
import Bus from "@/bus.js";
export default {
      name:"Table",
     data() {
    return {
      listoutboxHeight:0,
       info: [],
      headerStyle() {
        return {
          "background-color": "#f0f0f1",
          "color": "#6e7b8b",
          "font-size": "12px",
          "font-family": "微软雅黑"
        };
      },
      rowStyle() {
        return {
          "height": "40px",
          "line-height": "40px",
          "color": "#6e7b8b"
        };
      },

      tableData: [],

      currentPage: 1, //默认显示第一页
      pageSize: 5 //默认每页显示10条
    };
  },
   created() {
    this.info = this.tableData.slice(0, 5);
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.info = this.tableData.slice(5* val - 5, 5* val);
    },
   
  },
  mounted() {
    this.listoutboxHeight = document.documentElement.clientHeight - 344;
    var that = this;
    window.onresize = function() {
      that.listoutboxHeight = document.documentElement.clientHeight - 344; 
    };
    Bus.$on("info4", e => {
       var that = this;
      that.tableData = e.Data; /* 　console.log(`传来的数据是：${e}`) */
    });
  }
}
</script>
<style>
    .el-pager li {
        color:#6e7b8b
    }
    .el-pager li.active {
    color: #6e7b8b;
    cursor: default;
}
</style>
<style lang="scss" scoped>
.outbox{
    width: 100%;
    margin-top: 20px
   /*  background-color: brown */
}
.tableoutbox{
   width: -moz-calc(100% - 25px);
  width: -webkit-calc(100% - 25px);
  width: calc(100% - 25px);
  margin-left: 20px
}
.fyoutbox{
    display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
    height: 68px;
    width: 100%;
   /*  background-color: blueviolet */
}
.totalnum{
    color: #606266;
    font-size: 12px;
    font-family: "微软雅黑";
    margin-left: 20px
}
</style>





