<template>
  <div class="rushWater">
    <div class="conditonSet title1">边界条件设置</div>
    <div class="baseInfo">
      <div class="title title2">方案基本信息</div>
      <div class="baseInfoContent">
        <div>建立时间：
          <span class="title2">{{baseInfo.SettingTime}}</span>
        </div>
        <div>修改时间：
          <span class="title2">{{baseInfo.UpdateTime}}</span>
        </div>
        <div>责任人：
          <span class="title2">{{baseInfo.ResponPerson}}</span>
        </div>
      </div>
    </div>
    <el-row>
      <el-col :span="12">
        <div class="left-wapper">
          <div class="box_wrap">
            <div class="box-item">
              <p>今年最大供水量(m3/日)</p>
              <h5 style="color:#70991f">{{baseInfo.ThisYearMaxFlow}}</h5>
              <p>{{baseInfo.ThisYearMaxFlowTime}}</p>
            </div>
            <div class="box-item">
              <p>去年高峰供水量(m3/日)</p>
              <h5 style="color:#e9af3b">{{baseInfo.LastYearHeightFlow}}</h5>
              <p>{{baseInfo.LastYearHeightFlowTime}}</p>
            </div>
            <div class="box-item">
              <p>前年最大供水量(m3/日)</p>
              <h5 style="color:#d56459">{{baseInfo.BeforeYearHeightFlow}}</h5>
              <p>{{baseInfo.BeforeYearHeightFlowTime}}</p>
            </div>
          </div>
          <div class="box2">
            <div>今年预测高峰供水水量
              <el-input class="elInput" v-model="gsl"></el-input>（m3/日）
            </div>
            <div>今年预测高峰供水时间&nbsp;
              <span>{{baseInfo.NextYearForecastHeightTime}}</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="right-wrapper">
          <p class="title2">高峰供水变化曲线</p>
          <div ref="rushChart" class="waterChart"></div>
        </div>
      </el-col>
    </el-row>
    <div class="ctrlPress">
      <div class="title2" style="margin-bottom:10px;">压力控制点压力
        <div class="btn-wrapper">
          <div class="btn" style="margin-right:20px;" @click="HandleAdd">
            <i class="add"></i>
            <span>添加</span>
          </div>
          <!-- <div class="btn"><i class="save"></i><span>保存</span></div> -->
        </div>
      </div>
      <el-table
        ref="ctrlPressTable"
        stripe
        @selection-change="handleSelectionChanges"
        :data="ylkzTable"
        height="170px"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="编号" prop="CodeId"></el-table-column>
        <el-table-column prop="PressureName" label="压力点名称"></el-table-column>
        <el-table-column prop="StartTime" label="起始时间"></el-table-column>
        <el-table-column prop="EndTime" label="终止时间"></el-table-column>
        <el-table-column prop="CtPressure" label="目标压力(MPa)"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="deleteBtn" @click="Handledelete(scope.$index, scope.row)"></div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 组件 -->
    <div class="tablist-wrapper">
      <div class="conditonSet title1" style="box-sizing:border-box;padding-right:20px;">调度方案
        <el-button type="success" class="yhdd" @click="SpringDispatch">优化调度</el-button>
      </div>
      <tablist></tablist>
    </div>

    <div class="table2">
      <div class="title2" style="margin-bottom:10px;">压力控制点压力</div>
      <div class="table-wrapper">
        <el-table
          :data="pressTable.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          style="width: 100%;"
          stripe
          :header-row-style="headerStyle"
          :row-style="rowStyle"
          height="240px"
        >
          <el-table-column prop="CodeId" label="编号"></el-table-column>
          <el-table-column prop="PressureName" label="压力点名称"></el-table-column>
          <el-table-column prop="PressureName" label="起始时间"></el-table-column>
          <el-table-column prop="CtPressure" label="终止时间"></el-table-column>
          <el-table-column prop="CtPressure" label="目标压力(MPa)"></el-table-column>
          <el-table-column label="结果最低压力">
            <template slot-scope="scope">
              <div
                :class="scope.row.CtPressure < scope.row.RtPressure ? 'normal': 'red'"
              >{{ scope.row.RtPressure }}</div>
            </template>
          </el-table-column>
          <!--  <el-table-column label="压力变化">
                        <template slot-scope="scope">
                            <div class="pressDiff">{{scope.row.PressureChange}}<i :class="scope.row.ChangeType>0 ? 'up': 'down'"></i></div>
                        </template>
          </el-table-column>-->
        </el-table>
      </div>
    </div>
    <div class="pagination-wrapper">
      <span style="float:left;line-height: 1;padding-top: 14px;">共&nbsp;{{page_total}}&nbsp;条</span>
      <el-pagination
        layout="prev, pager, next"
        :total="page_total"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <div style="height:60px;border-top:1px solid #d1d1da;padding-right:20px;">
      <el-button type="success" class="yhdd" style="margin-top:16px;line-height:28px;">保存方案</el-button>
    </div>

    <!-- 弹出层 -->
    <el-dialog
      title="压力控制点添加"
      :visible.sync="dialogVisible"
      custom-class="inner-lay"
      width="384px"
      modal
      modal-append-to-body
      close-on-click-modal
      center
    >
      <el-form :model="form" label-position="left">
        <el-form-item label="压力控制点名称" :label-width="formLabelWidth">
          <el-select v-model="form.pressValue" @change="HandleValueChange">
            <el-option
              v-for="item in addOptions"
              :key="item.CodeId"
              :label="item.PressureName"
              :value="item.CodeId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起始时间" :label-width="formLabelWidth">
          <el-select
            v-model="form.region2"
            @change="HandleValueChangebegintime"
            placeholder="请选起始时间"
          >
            <el-option
              v-for="item in begintime"
              :key="item.TimeId"
              :label="item.Time"
              :value="item.TimeId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="终止时间" :label-width="formLabelWidth">
          <el-select
            v-model="form.region3"
            @change="HandleValueChangeEndtime"
            placeholder="请选择终止时间"
          >
            <el-option
              v-for="item in endtime"
              :key="item.ETimeId"
              :label="item.ETime"
              :value="item.ETimeId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="目标压力" :label-width="formLabelWidth">
          <el-input v-model="form.target" class="input" @change="HandleInputValue">
            <template slot="append">MPa</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button type="primary" @click.native="addOne">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Bus from "@/bus.js";
import WindowsEvent from "@/components/js/WindowsEvent";
import urlClass from "@/components/js/UrlClass";
import axios from "axios";
import tablist from "../rushApplyWater/tabList.vue";
const EChart = require("echarts");
export default {
  components: { tablist },
  data() {
    return {
      begintime: [
        {
          TimeId: 1,
          Time: "10:20:20"
        },
        {
          TimeId: 2,
          Time: "11:20:20"
        },
        {
          TimeId: 3,
          Time: "12:20:20"
        },
        {
          TimeId: 4,
          Time: "13:20:20"
        }
      ],
      curTimeId: "",
      endtime: [
        {
          ETimeId: 1,
          ETime: "10:20:20"
        },
        {
          ETimeId: 2,
          ETime: "11:20:20"
        },
        {
          ETimeId: 3,
          ETime: "12:20:20"
        },
        {
          ETimeId: 4,
          ETime: "13:20:20"
        }
      ],
      curETimeId: "",
      form: {
        pressValue: "请选择",
        target: 0,
        region2: "",
        region3: ""
      },
      selectedOption: {}, //添加的对象
      formLabelWidth: "100px",
      baseInfo: {},
      gsl: " ",
      dialogVisible: false,
      WaterData: [],
      ylkzTable: [],
      pressTable: [],
      page_total: 0,
      currentPage: 1,
      pageSize: 5,
      addOptions: [], // 添加按钮数据
      curCodeId: "", //当前codeId
      headerStyle() {
        return {
          height: "40px",
          "line-height": "40px",
          "background-color": "#f0f0f1",
          color: "#778392"
        };
      },
      rowStyle() {
        return {
          height: "40px",
          "line-height": "40px",
          color: "#6e7b8b"
        };
      },
      multipleSelections:[],
      CodeIdDatas:[],
      CtPressureDatas:[],
      SpringDispatchechartsdatanum:{},
      SpringDispatchpoumdatanum:{},
       resdata3spring: "",
      errordata3spring: "",
      loadingdata3spring: ""
    };
  },
  watch: {
    WaterData(val) {
      this.renderChart();
    },
    resdata3spring(s) {
      if (this.resdata3spring.status == 200) {
        this.loadingdata3spring.close();
      }
    },
    errordata3spring(e) {
      if (this.errordata3spring != "") {
        this.loadingdata3spring.close();
      }
    }
  },
  mounted() {
    this.ajaxConditionData();
    this.ajaxPressData();
  },
  methods: {
       openFullScreen3spring() {
      const loading = this.$loading({
        lock: true,
        text: "数据加载中，请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.loadingdata3spring = loading;
    },
    handleSelectionChanges(va) {
              this.multipleSelections = va;
      var CodeId = [];
      var CtPressure = [];
      for (var i = 0; i < this.multipleSelections.length; i++) {
        CodeId.push(this.multipleSelections[i].CodeId);
        CtPressure.push(this.multipleSelections[i].CtPressure);
      }
      this.CodeIdDatas = CodeId;
      this.CtPressureDatas = CtPressure;
     /*  console.log(this.multipleSelections);
      console.log(this.CodeIdDatas);
      console.log(this.CtPressureDatas); */
      Bus.$emit("indextotabCodeId", CodeId);
      Bus.$emit("indextotabCtPressure", CtPressure);
       Bus.$emit("splanThisYearMaxFlowTime", this.baseInfo.ThisYearMaxFlowTime);
      console.log(va);
    },
    SpringDispatch() {
       Bus.$emit("indextotabnowindex",0);
      var CodeId = this.CodeIdDatas;
      var CtPressure = this.CtPressureDatas;
      var Date = this.baseInfo.ThisYearMaxFlowTime;
      var WaterNum = "笔架山水厂";
      this.SpringDispatchechartsdatanum = { Date, WaterNum };
      this.SpringDispatchpoumdatanum = { WaterNum, CodeId, CtPressure };
/*  console.log(this.SpringDispatchechartsdatanum);
      console.log(this.SpringDispatchpoumdatanum); */
       this.poumapis();
      this.echartsapi1s();
    },
    echartsapi1s() {
      let self = this;
      self.$axios
        .post(
          urlClass.axiosUrJH + "GetCJDispatchCurve",
          JSON.stringify(self.SpringDispatchechartsdatanum),
          {
            headers: { "Content-Type": "application/json;" }
          }
        )
        .then(function(res) {
           console.log(res);
          var ClearWaterLevelCurve = res.data.ClearWaterLevelCurve;
          var WaterInFlowCurve = res.data.WaterInFlowCurve;
          var ClearWaterLevelCurvedata = [];
          var ClearWaterLevelCurvetime = [];
          var WaterInFlowCurvedata = [];
          var WaterInFlowCurvetime = [];
          for (var i = 0; i < ClearWaterLevelCurve.length; i++) {
            ClearWaterLevelCurvedata.push(ClearWaterLevelCurve[i].Data);
            ClearWaterLevelCurvetime.push(ClearWaterLevelCurve[i].Time);
          }
          for (var i = 0; i < WaterInFlowCurve.length; i++) {
            WaterInFlowCurvedata.push(WaterInFlowCurve[i].Data);
            WaterInFlowCurvetime.push(WaterInFlowCurve[i].Time);
          }
          Bus.$emit("ClearWaterLevelCurvedatafun", ClearWaterLevelCurvedata);
          Bus.$emit("ClearWaterLevelCurvetimefun", ClearWaterLevelCurvetime);
          Bus.$emit("WaterInFlowCurvedatafun", WaterInFlowCurvedata);
          Bus.$emit("WaterInFlowCurvetimefun", WaterInFlowCurvetime);
        });
    },
    poumapis() {
         this.openFullScreen3spring();
      let self = this;
      console.log(self.SpringDispatchpoumdatanum);
      self.$axios
        .post(
          urlClass.axiosUrJH + "GetWaterPump",
          JSON.stringify(self.SpringDispatchpoumdatanum),
          {
            headers: { "Content-Type": "application/json;" }
          }
        )
        .then(res => {
           self.resdata3spring = res;
          Bus.$emit("planpoum", res.data);
          console.log(res);
        })
        .catch(error => {
          console.log(error);
           self.errordata3spring = error;
        });
    },

    ajaxConditionData() {
      let self = this;
      this.$axios
        .post(urlClass.axiosUrJH + "CJConditionSetting")
        .then(function(ret) {
          console.log(ret);
          let d = ret.data;
          self.baseInfo = d;
         /*  Bus.$emit("splanThisYearMaxFlowTime", ret.data.ThisYearMaxFlowTime); */
          Bus.$emit("splanPressurePointData", ret.data.PressurePointData);
          self.gsl = d.NextYearForecastHeightFlow || "";
          //chart data
          let waterData = d.HeightFlowCurveData;
          let arr = [];
          let etime = [];
          if (waterData.length > 0) {
            waterData.forEach(function(ele, index) {
              arr.push(ele.Data);
              etime.push(ele.Time);
            });
          }
          var nowetimeh = new Date().getHours();
          self.WaterData = arr;
          self.xetime = etime;
          self.xnowetimeh = nowetimeh;
          self.renderChart();
          //压力控制点data
          self.ylkzTable = d.PressurePointData;
          var objectTemp = {
            pressPointList: self.ylkzTable,
            pressCtrlList: self.ylkzTable
          };
          WindowsEvent.MyDispatchEvent(
            "EmergencyDispatchPressureNodePosition",
            objectTemp
          );
          self.page_total =
            (d.PressurePointData && d.PressurePointData.length) || 0;
        });
    },
    ajaxPressData() {
      let self = this;
      this.$axios
        .post(urlClass.axiosUrJH + "GetCJPressurePoint")
        .then(function(ret) {
          let d = ret.data;
          self.pressTable = d.Data;
        });
    },
    ajaxOverLayData() {
      let self = this;
      this.$axios
        .post(urlClass.axiosUrJH + "GetAddPressureData")
        .then(function(ret) {
          let d = ret.data;
          self.addOptions = d.PressureListData;
        });
    },
    renderChart() {
      let self = this;
      let myChart = EChart.init(this.$refs.rushChart);
      let option = {
        tooltip: {
          formatter: "{a}<br />{c}"
        },
        textStyle: {
          fontSize: 14
        },
        grid: {
          top: 10,
          left: 0,
          right: 10,
          bottom: 5,
          containLabel: true
        },
        xAxis: {
          type: "category",
          show: false
          // data:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: "供水高峰",
            type: "bar",
            barWidth: "13",
            data: self.WaterData,
            itemStyle: {
              normal: {
                color: "#859dc0"
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    Handledelete(index, row) {
      this.ylkzTable.splice(index, 1);
      var objectTemp = {
        pressPointList: this.ylkzTable,
        pressCtrlList: this.ylkzTable
      };
      WindowsEvent.MyDispatchEvent(
        "EmergencyDispatchPressureNodePosition",
        objectTemp
      );
    },
    HandleAdd() {
      this.dialogVisible = true;
      this.ajaxOverLayData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    HandleValueChange(v) {
      let self = this;
      this.curCodeId = v;
      this.addOptions.forEach(function(ele, index) {
        if (ele.CodeId === v) {
          self.form.target = ele.CtPressure;
          self.selectedOption = ele || {};
        }
      });
    },
    HandleInputValue(v) {
      this.selectedOption.CtPressure = v;
    },
    addOne() {
      this.dialogVisible = false;
      this.ylkzTable.push(this.selectedOption);
      var objectTemp = {
        pressPointList: this.ylkzTable,
        pressCtrlList: this.ylkzTable
      };
      WindowsEvent.MyDispatchEvent(
        "EmergencyDispatchPressureNodePosition",
        objectTemp
      );
    },
    HandleValueChangebegintime(v) {
      let self = this;
      this.curTimeId = v;
      this.begintime.forEach(function(ele, index) {
        if (ele.curTimeId === v) {
          self.form.target = ele.CtPressure;
          self.selectedOption = ele || {};
        }
      });
    },
    HandleValueChangeEndtime(v) {
      let self = this;
      this.curETimeId = v;
      this.endtime.forEach(function(ele, index) {
        if (ele.curETimeId === v) {
          self.form.target = ele.CtPressure;
          self.selectedOption = ele || {};
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.title1 {
  font-size: 14px;
  color: #6e7b8b;
  font-weight: bold;
}
.title2 {
  font-size: 12px;
  color: #6e7b8b;
  font-weight: bold;
}
.yhdd {
  float: right;
  font-size: 14px;
  color: #fff;
  font-weight: bold;
  text-align: center;
  height: 26px;
  margin-top: 7px;
}

.red {
  height: 25px;
  width: 60px;
  background: red;
  padding-left: 10px;
  color: #fff;
}
.normal {
  height: 25px;
  width: 60px;
  padding-left: 10px;
}
.deleteBtn {
  width: 12px;
  height: 16px;
  background: url("../../../../assets/delete.png") no-repeat;
  cursor: pointer;
}

.rushWater {
  height: 100%;
  .conditonSet {
    line-height: 40px;
    border-bottom: 1px solid #d1d1da;
    padding-left: 20px;
  }
  .baseInfo {
    line-height: 28px;
    color: #b2b8bf;
    font-size: 12px;
    border-bottom: 1px solid #d1d1da;
    div {
      display: inline-block;
    }
    .title {
      width: 120px;
      text-align: center;
      border-right: 1px solid #d1d1da;
    }
    .baseInfoContent {
      padding-left: 20px;
      div {
        margin-right: 40px;
      }
    }
  }
  .left-wapper {
    border-right: 1px solid #d1d1da;
    .box_wrap {
      display: flex;
      justify-content: center;
      padding: 20px 0;
      border-bottom: 1px solid #d1d1da;
      .box-item {
        width: 33.33%;
        box-sizing: border-box;
        padding-left: 20px;
        p {
          color: #b2b8bf;
          line-height: 1;
        }
        h5 {
          margin: 10px 0;
          padding: 0;
          font-size: 36px;
          line-height: 1;
        }
      }
    }
    .box2 {
      padding: 12px 17px;
      border-bottom: 1px solid #d1d1da;
      div {
        color: #b2b8bf;
      }
      .elInput {
        width: 125px;
        height: 18px;
        margin-left: 7px;
      }
    }
  }
  .right-wrapper {
    padding: 10px 20px 20px 10px;
    border-bottom: 1px solid #d1d1da;
    height: 151px;
    .waterChart {
      height: calc(~"100% - 20px");
    }
  }
  .ctrlPress {
    padding: 10px 20px;
    border-bottom: 1px solid #d1d1da;
    .btn-wrapper {
      float: right;
      .btn {
        display: inline-block;
        color: #6e7b8b;
        height: 13px;
        line-height: 13px;
        cursor: pointer;
        i {
          display: inline-block;
          margin-right: 5px;
          vertical-align: top;
          &.add {
            width: 13px;
            height: 13px;
            background: url("../../../../assets/add.png") no-repeat;
          }
          &.save {
            width: 12px;
            height: 12px;
            background: url("../../../../assets/save.png") no-repeat;
          }
        }
        span {
          display: inline-block;
          vertical-align: top;
        }
      }
    }
  }
  .table2 {
    padding: 20px;
    .pressDiff {
      i {
        display: inline-block;
        width: 6px;
        height: 15px;
        vertical-align: middle;
        margin-left: 5px;
        &.up {
          background: url("../../../../assets/up.png") no-repeat;
        }
        &.down {
          background: url("../../../../assets/down.png") no-repeat;
        }
      }
    }
  }
  .tablist-wrapper {
  }
}
</style>
<style lang="less">
.box2 {
  .el-input__inner {
    height: 18px !important;
    border: none;
    border-radius: 0;
    background: #f0f0f1;
  }
}
.rushWater {
  .pagination-wrapper {
    height: 40px;
    border-top: 1px solid #d1d1da;
    box-sizing: border-box;
    padding: 0 20px;
    .el-pagination {
      padding-top: 6px;
      box-sizing: border-box;
      display: inline-block;
      float: right;
    }
  }
}
.inner-lay {
  .el-input__inner {
    width: 180px;
    background: #f0f0f1;
    border: none;
  }
  .input {
    .el-input__inner {
      width: 135px;
      margin-right: 0px;
    }
    .el-input-group__append {
      background-color: #fff;
      color: #808891;
      vertical-align: middle;
      display: table-cell;
      position: relative;
      border: none;
      padding: 0 55px 0 0;
      white-space: nowrap;
    }
  }
}
</style>


