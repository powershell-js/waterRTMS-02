<template>
  <div class="outbox" :style="{height:(listoutboxHeight-95-80-68)+'px'}">
     <div class="tableoutbox" :style="{height:(listoutboxHeight-95-100-48)+'px'}">
          <div class="titlebox">
            <div class="presurecontrolarea"> 压力控制点压力</div>
              <div class="btn-wrapper">
              <div class="btn" ><el-button type="text" @click="dialogFormVisible = true"><i class="add"></i><span class="addfont">添加</span></el-button></div>
            </div>
          </div>
      <div class="tablebox">
        <el-table
                :data="tableData"
                :default-sort = "{prop: 'RtPressure', order: 'ascending'}"
                empty-text
                style="width: 100%" stripe :header-cell-style="headerStyle" :row-style="rowStyle" height="100%"
                element-loading-spinner="el-icon-loading" element-loading-background="rgba(143, 188, 143, 0.8)">
                <el-table-column
                    prop="CodeId"
                    label="编号"      
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="PressureName"
                    label="压力点名称"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="RtPressure"
                    sortable
                    label="全天最低压力（MPa）"
                    min-width="100">
                    <template slot-scope="scope">
                            <div class="slotoutbox1">
                                <div class="slotinbox11" :class="scope.row.RtPressure=='非数字'?'specialcolor':''">{{scope.row.RtPressure}}</div>
                                <div class="slotinbox12"  @click="showecharts(scope.row,scope.column)"></div>
                            </div>
                      </template>
                </el-table-column>
                <el-table-column
                          prop="sj"
                          label="操作"
                          min-width="100">
                        <template slot-scope="scope">
                          <el-button
                            @click.native.prevent="deleteRow(scope.$index, tableData)"
                            type="text"
                            size="small">
                            <div class="deleteBtn"></div>
                          </el-button>
                        </template>
                </el-table-column>
          </el-table>
      </div>
      <div class="fenpagebox">
            <div class="totalnum">共<span>{{tableData.length}}</span>条</div>
            <div class="block">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :page-size="5"
                  layout="prev, pager, next"
                  :total="tableData.length">
                </el-pagination>
            </div>
      </div>

        <div class="tanchupart">
          <el-dialog title="压力控制点添加" :visible.sync="dialogFormVisible" width="400px" custom-class="inner-lay" modal modal-append-to-body close-on-click-modal center>
                    <el-form :model="form">
                        <el-form-item label="压力控制点名称" :label-width="formLabelWidth">
                        <el-select v-model="form.region1"  placeholder="请选择压力控制点名称">
                          <el-option
                                v-for="(item,index) in tableData"
                                :key="item.id"
                                :label="item.PressureName"
                                :value="index">
                            </el-option>
                        </el-select>
                        </el-form-item> 
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click.native="addOne">确 定</el-button>
                    </div>
                    </el-dialog>


        </div>
     </div>
     <div class="ehartstkoutbox">
      <!-- <el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button> -->

      <el-dialog title="全天压力曲线" :visible.sync="dialogTableVisible">
        <div class="ehartsoutbox"> 
        <div ref="chart" id="myChart"></div>
        </div>
      </el-dialog>
    </div>
  </div>

</template>

<script>
import img1 from "../../../assets/add.png";
import Bus from "@/bus.js";
import urlClass from "@/components/js/UrlClass";
export default {
  name: "Table",
  data() {
    return {
      listoutboxHeight: 0,
      info: [],
      headerStyle() {
        return {
          "background-color": "#f0f0f1",
          color: "#6e7b8b",
          "font-size": "12px",
          "font-family": "微软雅黑"
        };
      },
      rowStyle() {
        return {
          height: "40px",
          "line-height": "40px",
          color: "#6e7b8b"
        };
      },

      tableData: [],
      curCodeId: "",
      form: {
        region1: ""
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      currentPage: 1, //默认显示第一页
      pageSize: 5, //默认每页显示5条
      totableSchemeDate: "",
      showechartscanshudata: {},
      resshowechartsdata: [],
      xTimearraydata: [],
      yDataarraydata: [],
      PressureName:""
    };
  },
  created() {
    this.info = this.tableData.slice(0, 5);
  },
  mounted() {
    this.listoutboxHeight = document.documentElement.clientHeight - 344;
    var that = this;
    window.onresize = function() {
      that.listoutboxHeight = document.documentElement.clientHeight - 344;
    };
    Bus.$on("info4", e => {
      var that = this;
      that.tableData = e.Data;
    });
    Bus.$on("searchtotable", e => {
      var that = this;
      that.totableSchemeDate = e;
    });
    Bus.$on("historytotable", e => {
      var that = this;
      that.totableSchemeDate = e;
    });
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    handleCurrentChange(val) {
      this.info = this.tableData.slice(5 * val - 5, 5 * val);
    },

    addOne() {
      this.dialogFormVisible = false;
      var aaa = this.tableData[this.form.region1];
      this.tableData.push(aaa);
    },
    showecharts(val) {
      let that = this;
      var CodeId = val.CodeId;
      var PressureNo = val.PressureName;
      var SchemeDate = that.totableSchemeDate;
      var showechartscanshu = { CodeId, PressureNo, SchemeDate };
      that.showechartscanshudata = showechartscanshu;
      that.PressureName=val.PressureName;
      that.apishowecharts();

      /*   console.log(that.showechartscanshudata);
   alert(that.showechartscanshudata)
   console.log(that.$refs.chart) */
      /*  setTimeout(function(){
    that.drawLine(); 
    console.log(that.$refs.chart)
    }, 100); */
    },
    apishowecharts() {
      var _this = this;
      /*  alert("apishowecharts") */
      console.log(_this.showechartscanshudata);
      _this.$axios
        .post(
          urlClass.axiosUrYA + "GetPressureCurve",
          JSON.stringify(_this.showechartscanshudata),
          {
            headers: { "Content-Type": "application/json;" }
          }
        )
        .then(res => {
          /*  alert("apishowecharts") */
          var _this = this;
          _this.resshowechartsdata = res.data.CurveDataList;
          var xTimearray = [];
          var yDataarray = [];
          for (var i = 0; i < res.data.CurveDataList.length; i++) {
            var Time = res.data.CurveDataList[i].Time;
            var Data = res.data.CurveDataList[i].Data;
            xTimearray.push(Time);
            yDataarray.push(Data);
          }
          _this.xTimearraydata = xTimearray;
          _this.yDataarraydata = yDataarray;
          _this.dialogTableVisible = true;
          setTimeout(function() {
            _this.drawLine();
           /*  console.log(_this.$refs.chart); */
          }, 100);

          /* console.log(_this.resshowechartsdata);
          console.log(_this.xTimearraydata);
          console.log(_this.yDataarraydata); */
          /* Bus.$emit("info4", res.data); */
        })
        .catch(error => {
          console.log(error);
        });
    },
    drawLine() {
      let myChart = this.$echarts.init(this.$refs.chart);
      myChart.setOption({
       grid: {
         height:134,
          bottom: 10,
          top: 25,
          left: 51
        },
         color: "#99b9ea",
        legend: {
          right: 50,
          width: 500,
          itemWidth: 40,
          data:[this.PressureName],
          textStyle: {
            color: "#6e7b8b"
          },
          icon: "rect", //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none

          itemWidth: 14, // 设置宽度

          itemHeight: 14, // 设置高度

          itemGap: 40 // 设置间距
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          data: this.xTimearraydata,
            axisLabel: {
            inside: false,
            textStyle: {
              color: "#999"
            }
          },
          axisTick: {
            inside: true,
            show: false,
            length: 68,
            lineStyle: {
              color: "#84a5d6"
            }
          },
          axisLine: {
            show: false
          },
          z: 10
        },
          yAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              color: "#dfdfdf",
              width: 1,
              type: "dashed"
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#999"
            }
          }
        },
        series: [
          {
           name:this.PressureName,
            type: "line",
            color: "#99b9ea", //折线图颜色,搭配markArea为面积图
            lineStyle: {
              //折线的颜色
              color: "#99b9ea"
            },
            smooth: false, //是否平滑处理值0-1,true相当于0.5
            data: this.yDataarraydata,
             itemStyle: {
              normal: {
                color: "#99b9ea"
              }
            },
            areaStyle: {
              normal: {
                color: "#99b9ea"
              }
            }
          }
        ]
      });
    }
  }
};
</script>
<style>
.el-dialog__header {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  /*  width: 400px; */
  height: 30px;
  /*   padding: 20px 20px 10px; */
}
.el-dialog__title {
  font-size: 12px;
  font-family: "微软雅黑";
}
.el-dialog__footer {
  padding: 0px 20px 20px;
}
.el-pager li {
  color: #6e7b8b;
}
.el-pager li.active {
  color: #6e7b8b;
  cursor: default;
}
.el-button.el-button--mini {
  height: 28px;
  width: 70px;
}
.el-dialog {
    width: 760px;
}
.el-dialog .el-dialog__header {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}
</style>

<style scoped>
.outbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 70.66875vw;
  height: 42vh;
  margin-left: 20px;
}
.titlebox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 70.66875vw;
  height: 40px;
  border-bottom: 1px #e4e4ec solid;
  margin-bottom: 15px;
}
.presurecontrolarea {
  color: #788493;
  font: bold 12px/40px "微软雅黑";
}
.add {
  display: inline-block;
  width: 15px;
  height: 15px;
  background: url("~@/assets/img/add.png") no-repeat;
  background-position: 1px 0px;
  margin: 0px 5px -4px 0px;
  cursor: pointer;
}
.addfont {
  color: #b3b3bb;
  font: bold 12px/40px "微软雅黑";
  cursor: pointer;
}
.fenpagebox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  /*  background-color: aqua; */
  width: 70.66875vw;
  height: 40px;
  margin-top: 10px;
}
.tablebox {
  width: 70.66875vw;
  height: 27.077399vh;
}
.block {
  margin-top: 10px;
  color: #788493;
  font: bold 12px/40px "微软雅黑";
}
.totalnum {
  color: #788493;
  font: bold 12px/40px "微软雅黑";
}
.deleteBtn {
  width: 12px;
  height: 16px;
  background: url("~@/assets/delete.png") no-repeat;
  cursor: pointer;
}
.slotoutbox1 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 110px;
}
.slotinbox11 {
  width: 60px;
  height: 26px;
  line-height: 26px;
  text-align: start;
  border-radius: 2px;
  padding-left: 10px;
}
.slotinbox12 {
  width: 16px;
  height: 20px;
  background: url("~@/assets/曲线01.png") no-repeat;
  cursor: pointer;
}
.slotinbox12:hover {
  width: 16px;
  height: 20px;
  background: url("~@/assets/曲线02.png") no-repeat;
  cursor: pointer;
}
.specialcolor {
  background-color: red;
  color: #fff;
}
.inputwidth {
  width: 170px;
}
.ehartsoutbox {
  height: 200px;
  width: 760px;
  /* border: 1px solid red; */
}
#myChart {
  width: 760px;
  height: 200px;
  /* border: 1px solid blue; */
}
</style>

