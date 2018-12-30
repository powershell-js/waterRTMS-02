<template>
  <div class="boundary-conditions-warp">
    <panel-title :title="'边界条件设置'"></panel-title>
    <div class="boundary-conditions-content">
      <div class="basic-info">
        <span class="info-item text-bold item-border">方案基本信息</span>
        <span class="info-item">
          <span class="text-gray">建立时间:</span>
          <span class="text-bold">{{boundaryData.SettingTime}}</span>
        </span>
        <span class="info-item">
          <span class="text-gray">负责人:</span>
          <span class="text-bold">{{boundaryData.ResponPerson}}</span>
        </span>
        <el-row class="info-border">
          <el-col :span="6">
            <span class="info-item">
              <span class="text-gray">停水日期:</span>
              <span class="text-bold">{{boundaryData.WaterStopDate}}</span>
            </span>
          </el-col>
          <el-col :span="6">
            <span class="info-item">
              <span class="text-gray">开始时间:</span>
              <span class="text-bold">{{boundaryData.StartTime}}</span>
            </span>
          </el-col>
          <el-col :span="6">
            <span class="info-item">
              <span class="text-gray">结束时间:</span>
              <span class="text-bold">{{boundaryData.EndTime}}</span>
            </span>
          </el-col>
          <el-col :span="6">
            <span class="info-item">
              <span class="text-gray">方案总水量</span>
              <span class="text-bold">{{boundaryData.TolPlanWaterVol}}</span>
              <span class="text-gray">m³/h</span>
            </span>
          </el-col>
        </el-row>
      </div>
      <panel-title
        :title="'压力控制点压力'"
        :color-show="false"
        :line-height="34"
        :font-size="12"
        :border-show="false"
      >
        <span class="opt-btn" @click="HandleAdd">
          <i class="hd-icon add"></i>添加
        </span>&emsp;
        <!-- <span class="opt-btn"><i class="hd-icon save"></i>保存</span> -->
      </panel-title>
      <div class="boundary-conditions-table">
        <el-table :data="boundaryData.PressurePointData" stripe style="width: 100%" height="250">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="Station" label="编号"></el-table-column>
          <el-table-column prop="PressureName" label="压力点名称"></el-table-column>
          <el-table-column prop="PressureName" label="起始时间"></el-table-column>
          <el-table-column prop="CtPressure" label="终止时间"></el-table-column>
          <el-table-column label="目标压力(MPa)">
            <template slot-scope="scope">
              <input v-model="scope.row.CtPressure">
            </template>
          </el-table-column>
        </el-table>
      </div>
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
import PanelTitle from "./panelTitle.vue";
export default {
  components: { PanelTitle },
  props: {
    url: String
  },
  data() {
    return {
      boundaryData: {
        PressurePointData: []
      },
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
      }
    };
  },
  methods: {
    fetchStopWaterSetting() {
      let self = this;
      this.$axios.post(this.url, { SchemeNo: this.schemeNo }).then(R => {
        self.boundaryData = R.data;
        self.$store.dispatch("set_boundaryData", R.data);
      });
    },
  /*   ajaxOverLayData() {
      let self = this;
      this.$axios
        .post(urlClass.axiosUrJH + "GetAddPressureData")
        .then(function(ret) {
          let d = ret.data;
          self.addOptions = d.PressureListData;
        });
    }, */
    HandleAdd() {
      this.dialogVisible = true;
     /*  this.ajaxOverLayData(); */
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
  },
  computed: {
    schemeNo() {
      return this.$store.state.planDispatch.schemeData.schemeNo;
    }
  },
  watch: {
    schemeNo(val) {
      this.fetchStopWaterSetting();
    }
  }
};
</script>
<style lang="less" scoped>
.boundary-conditions-warp {
  .boundary-conditions-content {
    .basic-info {
      .info-item {
        padding: 5px 20px;
        display: inline-block;
        &.item-border {
          border-right: 1px solid #d1d1da;
        }
      }
      .text-bold {
        font-weight: bold;
        color: #6e7b8b;
      }
      .text-gray {
        color: #acb3ba;
      }
      .info-border {
        border-top: 1px solid #d1d1da;
        border-bottom: 1px solid #d1d1da;
      }
    }
    .opt-btn {
      cursor: pointer;
      color: #acb3ba;
    }
    .boundary-conditions-table {
      padding: 0 10px 10px 10px;
      border-bottom: 1px solid #d1d1da;
    }
  }
}
</style>

