<template>
  <div class="searchoutbox">
    <div class="leftbox">
      <div class="leftinbox1">
        <div class="inleftbox">
          <div class="leftin1">
            <div class="wfont">
              <el-radio v-model="radio" :label="0" class="pdw">全天水量</el-radio>
            </div>
            <div>
              <input
                type="text"
                id="input1"
                :class="bordernum==1?'bordercolor':''"
                placeholder="输入全天水量"
                @input="handleInput"
                v-model="DailyWater"
                v-bind:disabled="radio==0?false:true"
              >
            </div>
            <div class="wdw">m³/d</div>
          </div>
          <div class="leftin2">
            <div class="pfont">
              <el-radio v-model="radio" :label="1" class="pdw1">瞬时水量</el-radio>
            </div>
            <input
              type="text"
              name
              id="input2"
              v-model="instantwater"
              :class="bordernum2==1?'bordercolor2':''"
              placeholder="输入瞬时水量"
              @input="handleInput2"
              v-bind:disabled="radio==1?false:true"
            >
            <div class="pdw">m³/h</div>
          </div>
          <div class="leftin3">
            <div class="pfont1">时段</div>
            <el-select v-model="value" placeholder="全部">
              <el-option
                v-bind:disabled="radio==0?false:true"
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="leftin4">
            <div class="pfont">气温范围</div>
            <input
              type="text"
              name
              id="input2"
              @input="handleInput3"
              v-model="lowtempreture"
              placeholder="输入温度"
              v-bind:disabled="radio==0?false:true"
            >
            <div class="pdw">℃</div>
          </div>
          <div class="leftin5">
            <div class="pfont5">至</div>
            <input
              type="text"
              name
              id="input2"
              @input="handleInput4"
              v-model="hightempreture"
              placeholder="输入温度"
              v-bind:disabled="radio==0?false:true"
            >
            <div class="pdw">℃</div>
          </div>
        </div>
        <div class="inrightbox">
          <div class="searchleftin3" @click="getInfo">
            <!-- <span class="bggif"></span> -->
            <img
              v-if="statusdata"
              src="../../../assets/gif.gif"
              style="width:48px;height:48px;"
              alt
            >
            <span class="searchspan">查询</span>
          </div>
        </div>
      </div>
    </div>
    <ul class="rightbox tabs">
      <li
        class="rightboxin1 rightboxin"
        v-for="(item,index) in tabsParam"
        :key="item.tabsParam"
        @click="toggleTabs(index)"
        :class="{active:index===nowIndex}"
      >{{item}}</li>
    </ul>
    <!-- //弹出框1 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="310px" :before-close="handleClose">
      <span>
        <i class="iconfont icon-jiazaishibai"></i>
        <span class="tiptext">{{bordernum==1||bordernum2==1?'输入水量不能为空!':'请求数据失败，请重试!'}}</span>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- //弹出框2 -->
    <el-dialog title="提示" :visible.sync="dialogVisible2" width="310px" :before-close="handleClose2">
      <span>
        <i class="iconfont icon-jiazaishibai"></i>
        <span class="tiptext">sorry,暂无适合的方案列表!</span>
      </span>
      <!-- <span>sorry,暂无适合的方案列表</span> -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import "../../../assets/iconfont/iconfont.css";
/* import {mapActions} from "vuex"; */
import Bus from "@/bus.js";
import urlClass from "@/components/js/UrlClass";
export default {
  name: "Search",
  data() {
    return {
      bordernum: 0,
      bordernum2: 0,
      dialogVisible: false,
      dialogVisible2: false,
      radio: 0,
      radioshow: false,
      DailyWater: "",
      instantwater: "",
      lowtempreture: "",
      hightempreture: "",
      tabsParam: [
        "历年高峰供水调度方案",
        "历年节假日供水调度方案"
        /*  "历年水厂停产减产调度方案",
        "历年极端气候调度方案",
        "历年爆管事故调度方案" */
      ],
      nowIndex: -1,
      isShow: false,
      options: [
        {
          value: "-1",
          label: "全部"
        },
        {
          value: "0",
          label: "工作日"
        },
        {
          value: "1",
          label: "节假日"
        }
      ],
      value: "全部",
      object: {},
      objectdata0: {},
      objecharts1data1: {},
      WaterfactorynameParam: [],
      wfctorynowIndex: 0,
      diaodulisttablecansu: {},
      statusdata: false,
      resdata: "",
      errordata: "",
      loadingdata: ""
    };
  },
  watch: {
    radio(val) {
      /*    alert("不是num") */
      this.bordernum = 0;
      this.bordernum2 = 0;
    },
    resdata(s) {
      if (this.resdata.status == 200) {
        this.loadingdata.close();
      }
    },
    errordata(e) {
      if (this.errordata != "") {
        this.loadingdata.close();
      }
    }
  },
  mounted() {
    let self = this;
    Bus.$on("Waterfactoryname", e => {
      self.WaterfactorynameParam = e;
    });
    Bus.$on("WaterfactorynowIndex", e => {
      self.wfctorynowIndex = e;
    });
    Bus.$emit("fanganlibiaosuoyin", self.nowIndex);
  },
  methods: {
    //切换tab项
    toggleTabs(index) {
      this.nowIndex = index;
      Bus.$emit("fanganlibiaosuoyin", this.nowIndex);
      Bus.$emit("radionumdata1", 0);
      Bus.$emit("chaxunfalisttoshuichangtab",0);
      var SchemeNo = this.nowIndex + 1;
      this.radio=0;
      this.object = { SchemeNo };
      /*  alert(SchemeNo) */
      /*console.log(this.object) */
      this.openFullScreen2();
      this.ec6();
    },
    openFullScreen2() {
      this.bordernum = 0;
      this.bordernum2 = 0;
      const loading = this.$loading({
        lock: true,
        text: "数据加载中，请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.loadingdata = loading;
    },
    handleInput(e) {
      this.DailyWater = this.DailyWater.replace(/[^\d]/g, "");
      this.bordernum = 0;
      var gettype = Object.prototype.toString;
      console.log(gettype.call(this.DailyWater));
      /* this.DailyWater=e.target.value.replace(/[^\d]/g,''); */
    },
    handleInput2(e) {
      this.instantwater = this.instantwater.replace(/[^\d]/g, "");
      this.bordernum2 = 0;
    },
    handleInput3(e) {
      this.lowtempreture = this.lowtempreture.replace(/[^\d]/g, "");
    },
    handleInput4(e) {
      this.hightempreture = this.hightempreture.replace(/[^\d]/g, "");
    },
    handleClose(done) {
      this.statusdata = false;
      done();
    },
    handleClose2(done) {
      this.statusdata = false;
      done();
    },
    getInfo() {
      var _this = this;
      if ( _this.value === '全部') {
   _this.value = '-1'
 }
      _this.statusdata = true;
      _this.nowIndex = -1;
      Bus.$emit("radionumdata", _this.radio);
      Bus.$emit("chaxuntoshuichangtab",0);
      var FlowType;
      var DailyWaterSupply;
      var DateType;
      var MinTemp;
      var MaxTemp;
      var SchemeNo;
      if (_this.radio == 0) {
        if (_this.DailyWater == "") {
          /* alert("输入为空") */
          _this.bordernum = 1;
        }
        FlowType = _this.radio;
        DailyWaterSupply = _this.DailyWater;
        DateType = _this.value;
        MinTemp = _this.lowtempreture;
        MaxTemp = _this.hightempreture;
        SchemeNo = _this.nowIndex;
        var obj = {
          FlowType,
          DailyWaterSupply,
          DateType,
          MinTemp,
          MaxTemp,
          SchemeNo
        };
        _this.object = obj;
      } else if (_this.radio == 1) {
        if (_this.instantwater == "") {
          /* alert("输入为空") */
          _this.bordernum2 = 1;
        }
        FlowType = _this.radio;
        DailyWaterSupply = _this.instantwater;
        SchemeNo = _this.nowIndex;
        obj = { FlowType, DailyWaterSupply, SchemeNo };
        _this.object = obj;
      }
      _this.ec6();
    },
    ec11() {
      var _this = this;
      var WaterworksNo;
      var objecharts1 = _this.objectdata0;
      objecharts1.WaterworksNo = "笔架山水厂";
      _this.objecharts1data1 = objecharts1;
      _this.$axios
        .post(
          urlClass.axiosUrYA + "GetWaterquantity",
          JSON.stringify(_this.objecharts1data1),
          {
            headers: { "Content-Type": "application/json;" }
          }
        )
        .then(res => {
          var _this = this;
          Bus.$emit("info11", res.data);
          console.log(res);
        })
        .catch(error => {
         /*  console.log(error); */
        });
    },
    ec12() {
      var _this = this;
      var WaterworksNo;
      var objecharts1 = _this.objectdata0;
      objecharts1.WaterworksNo = "笔架山水厂";
      _this.objecharts1data1 = objecharts1;
      _this.$axios
        .post(
          urlClass.axiosUrYA + "GetOutPressure",
          JSON.stringify(_this.objecharts1data1),
          {
            headers: { "Content-Type": "application/json;" }
          }
        )
        .then(res => {
          var _this = this;
          Bus.$emit("info12", res.data);
        })
        .catch(error => {
         /*  console.log(error); */
        });
    },
    ec13() {
      var _this = this;
      var WaterworksNo;
      var objecharts1 = _this.objectdata0;
      objecharts1.WaterworksNo = "笔架山水厂";
      _this.objecharts1data1 = objecharts1;
      _this.$axios
        .post(
          urlClass.axiosUrYA + "GetWaterPoolLevel",
          JSON.stringify(_this.objecharts1data1),
          {
            headers: { "Content-Type": "application/json;" }
          }
        )
        .then(res => {
          var _this = this;
          Bus.$emit("info13", res.data);
        })
        .catch(error => {
          /* console.log(error); */
        });
    },
    ec14() {
      var _this = this;
      var WaterworksNo;
      var objecharts1 = _this.objectdata0;
      objecharts1.WaterworksNo = "笔架山水厂";
      _this.objecharts1data1 = objecharts1;
      _this.$axios
        .post(
          urlClass.axiosUrYA + "GetWaterUnitConsumption",
          JSON.stringify(_this.objecharts1data1),
          {
            headers: { "Content-Type": "application/json;" }
          }
        )
        .then(res => {
          var _this = this;
          Bus.$emit("info14", res.data);
        })
        .catch(error => {
          /* console.log(error); */
        });
    },
    ec15() {
      var _this = this;
      var WaterworksNo;
      var objecharts1 = _this.objectdata0;
      objecharts1.WaterworksNo = "笔架山水厂";
      _this.objecharts1data1 = objecharts1;
      _this.$axios
        .post(
          urlClass.axiosUrYA + "GetWaterTotalEfficiency",
          JSON.stringify(_this.objecharts1data1),
          {
            headers: { "Content-Type": "application/json;" }
          }
        )
        .then(res => {
          var _this = this;
          Bus.$emit("info15", res.data);
        })
        .catch(error => {
        /*   console.log(error); */
        });
    },
    ec16() {
      var _this = this;
      var WaterworksNo;
      var objecharts1 = _this.objectdata0;
      objecharts1.WaterworksNo = "笔架山水厂";
      _this.objecharts1data1 = objecharts1;
      _this.$axios
        .post(
          urlClass.axiosUrYA + "GetWaterPump",
          JSON.stringify(_this.objecharts1data1),
          {
            headers: { "Content-Type": "application/json;" }
          }
        )
        .then(res => {
          var _this = this;
          Bus.$emit("info16", res.data);
        })
        .catch(error => {
          /* console.log(error); */
        });
    },
    ec4() {
      var _this = this;
      _this.$axios
        .post(
          urlClass.axiosUrYA + "GetPressurePoint",
          JSON.stringify(_this.objectdata0),
          {
            headers: { "Content-Type": "application/json;" }
          }
        )
        .then(res => {
          var _this = this;
          console.log(res);
          Bus.$emit("info4", res.data);
        })
        .catch(error => {
          /* console.log(error); */
        });
    },
    ec5() {
      var _this = this;
      _this.$axios
        .post(
          urlClass.axiosUrYA + "GetTotalNumber",
          JSON.stringify(_this.objectdata0),
          {
            headers: { "Content-Type": "application/json;" }
          }
        )
        .then(res => {
          console.log(res)
          var _this = this;
          Bus.$emit("info5", res.data);
        })
        .catch(error => {
          /* console.log(error); */
        });
    },
    ec6() {
      var _this = this;
      _this.$axios
        .post(
          urlClass.axiosUrYA + "GetSchemeList",
          JSON.stringify(_this.object),
          {
            headers: { "Content-Type": "application/json;" }
          }
        )
        .then(res => {
          var _this = this;
          _this.resdata = res;
          console.log(res);
          if (res.status == 200 && res.data.SchemeList.length > 0) {
            _this.statusdata = false;
          } else if (res.status == 200 && res.data.SchemeList == null) {
            _this.statusdata = false;
            _this.dialogVisible2 = true;
          } else {
            _this.statusdata = true;
          }
          /* var status=res.status;
          _this.statusdata=status; */
          /* alert(res.status) */
          Bus.$emit("info6", res.data);
          var SchemeID = res.data.SchemeList[0].SchemeID;
          var SchemeNo = res.data.SchemeList[0].SchemeNo;
          var SchemeDate = res.data.SchemeList[0].SchemeDate;
          var TotalWaterSupply = res.data.SchemeList[0].TotalWaterSupply;
          var FlowType = _this.radio;
          var obj0 = {
            SchemeID,
            SchemeNo,
            SchemeDate,
            TotalWaterSupply,
            FlowType
          };
          Bus.$emit("info6tablist", obj0);
          Bus.$emit("searchtotable", SchemeDate);
          _this.objectdata0 = obj0;
          var diaodulisttabledata = { SchemeNo, SchemeDate };
          _this.diaodulisttablecansu = diaodulisttabledata;
          console.log(_this.diaodulisttablecansu);
          console.log(res.status);
          status;
          _this.ec5();
          _this.ec4();
          _this.ec7();
          _this.ec11();
          _this.ec12();
          _this.ec13();
          _this.ec14();
          _this.ec15();
          _this.ec16();
        })
        .catch(error => {
          this.errordata = error;
          /* console.log(error); */
          if (error != "") {
            _this.dialogVisible = true;
            this.statusdata = false;
          }
        });
    },
    handleClick() {
      alert("button click");
    },
    ec7() {
      var _this = this;
      /*  alert("执行了ec7")
      console.log(_this.diaodulisttablecansu) */
      _this.$axios
        .post(
          urlClass.axiosUrYA + "ManagementDispatch",
          JSON.stringify(_this.diaodulisttablecansu),
          {
            headers: { "Content-Type": "application/json;" }
          }
        )
        .then(res => {
          var _this = this;
          /*   alert("ec7")*/
          console.log(res);
          Bus.$emit("info7", res.data);
        })
        .catch(error => {
         /*  console.log(error); */
        });
    }
  }
};
</script>
<style scoped>
.el-dropdown {
  vertical-align: top;
  width: 120px;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
body .el-button.el-button--mini {
  padding: 0 12px;
  height: 28px;
  width: 120px;
}
.el-icon-arrow-down:before {
  margin-left: 30px;
}
body .el-button.el-button--mini[data-v-2a646afc] {
  padding: 0 12px;
  height: 25px;
  width: 50px;
}
</style>
<style lang="scss" scoped>
.searchoutbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 166px;
}
.leftbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  min-width: 1230px;
  width: -moz-calc(100% - 287px);
  width: -webkit-calc(100% -287px);
  width: calc(100% - 287px);
  border-right: 1px #e4e4ec solid;
  /*   background-color: aqua */
}
.leftinbox1 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
  /*   background-color: aqua */
}

.inleftbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 80%;
  min-width: 1040px;
  margin: 0 20px;
  /*  background-color: aqua */
}
.leftin1 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}
.leftin2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-left: 40px;
}
.leftin3 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-left: 40px;
  width: 160px;
}
.leftin4 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-left: 40px;
}
.leftin5 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-left: 40px;
  margin-left: -10px;
}
.inrightbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 20%;
  cursor: pointer;
  /*   background-color: aqua */
}

.wfont {
  font-family: "微软雅黑";
  font-size: 14px;
  /*   font-weight: bold; */
  color: #6e7b8b;
  margin-right: 20px;
  width: 60px;
  height: 21px;
  line-height: 21px;
}
.wdw {
  font-family: "微软雅黑";
  font-size: 14px;
  /*   font-weight: bold; */
  color: #6e7b8b;
  margin-left: 10px;
  width: 37px;
  height: 21px;
  line-height: 21px;
}

input {
  /*  width: 432px; */
  width: 5.5vw;
  min-width: 120px;
  height: 34px;
  background-color: #f0f0f1;
  text-align: start;
  /* padding-left: 15px */
}
#input1 {
  margin-left: 10px;
  /*   border: 1px solid red */
}
#input2 {
  margin-left: -30px;
}
.bordercolor {
  border: 1px solid red;
  border-radius: 2px;
}
.bordercolor2 {
  border: 1px solid red;
  border-radius: 2px;
}
.pfont {
  font-family: "微软雅黑";
  font-size: 14px;
  /*  font-weight: bold; */
  color: #6e7b8b;
  margin-right: 20px;
  width: 90px;
  height: 21px;
  line-height: 21px;
}
.pfont1 {
  font-family: "微软雅黑";
  font-size: 14px;
  /*  font-weight: bold; */
  color: #6e7b8b;
  margin-right: 10px;
  width: 55px;
  height: 21px;
  line-height: 21px;
}
.pfont5 {
  font-family: "微软雅黑";
  font-size: 14px;
  /*  font-weight: bold; */
  color: #6e7b8b;
  margin-right: 20px;
  width: 50px;
  height: 21px;
  line-height: 21px;
}
.pdw {
  font-family: "微软雅黑";
  font-size: 14px;
  /*   font-weight: bold; */
  color: #6e7b8b;
  margin: 0 10px;
  width: 37px;
  height: 21px;
  line-height: 21px;
}
.pdw1 {
  font-family: "微软雅黑";
  font-size: 14px;
  /*   font-weight: bold; */
  color: #6e7b8b;
  /*  margin: 0 10px; */
  width: 37px;
  height: 21px;
  line-height: 21px;
}
input::-webkit-input-placeholder {
  padding-left: 5px;
  color: #acb3ba;
}
input:-moz-placeholder {
  margin-left: 5px;
  color: #acb3ba;
}
input::-moz-placeholder {
  margin-left: 5px;
  color: #acb3ba;
}
input:-ms-input-placeholder {
  margin-left: 5px;
  color: #acb3ba;
}

.searchleftin3 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 132px;
  height: 48px;
  background-color: #70991f;
  border-radius: 5px;
  font-family: "微软雅黑";
  font-size: 18px;
  color: #e2ebd2;
  text-align: center;
  line-height: 48px
}
.bggif {
  display: inline-block;
  width: 48px;
  height: 48px;
  border: 1px red solid;
  /* background-image: url("../../../assets/gif.gif"); */
  background-position: 0px 0px;
  background-repeat: no-repeat;
  /*  background-color: aqua */
}

.rightbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  width: 287px;
  min-width: 158px;
}
.rightboxin {
  font-family: "微软雅黑";
  font-size: 14px;
  font-weight: bold;
  color: #6e7b8b;
  height: 84px;
  line-height: 80px;
  text-align: center;
  width: 100%;
  letter-spacing: 1px;
  border-bottom: 1px #e4e4ec solid;
  cursor: pointer;
}

.inrightboxin5 {
  color: #6e7b8b;
  line-height: 28px;
  text-align: center;
  height: 28px;
  width: 100%;
  cursor: pointer;
}
.active {
  color: #fff;
  background-color: #70991f;
  /*   border-bottom: 2px #548ff6 solid; */
}
/*iconfont style*/
.icon-jiazaishibai {
  color: dodgerblue;
  font-size: 48px;
}
.tiptext {
  font-family: "微软雅黑";
  color: #6e7b8b;
  font-size: 14px;
  margin-left: 10px;
}
</style>


