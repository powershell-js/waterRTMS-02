<template>
    <div class="areaPress">
        <overview></overview>
        <div class="areaPress-title">
            <el-row>
                <el-col :span="12">
                    <span class="title">压力控制点设置</span>
                    <el-input v-model="monitor_point" placeholder="输入监测点信息"></el-input>
                    <el-button>查询</el-button>
                </el-col>
                <el-col :span="12" style="text-align:right">
                    <el-button type="success" v-on:click="calMy">调压计算</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="transfer-wrapper">
            <el-row type="flex">
                <el-col :span="8">
                    <el-table
                        ref="pressPointTable"
                        :data="pressPointList"
                        @selection-change="pressPointCheck"
                        height="620"
                        style="width: 100%">
                        <el-table-column
                        type="selection"
                        :selectable="pressPointSelectable"
                        width="55">
                        </el-table-column>
                        <el-table-column
                        label="编号"
                        prop="CodeId">
                        </el-table-column>
                        <el-table-column
                        prop="PressureName"
                        label="压力点名称">
                        </el-table-column>
                    </el-table>
                </el-col>
                <el-col :span="2" class="operate-btn">
                    <div class="btns">
                        <el-button :type="selectedPoint.length>0?'success':'primary'" @click="add()" v-html="'添加 >>'"></el-button>
                        <br />
                        <br />
                        <el-button :type="selectedCtrl.length>0?'success':'primary'" @click="remove()" v-html="'<< 移除'"></el-button>
                    </div>
                    
                </el-col>
                <el-col :span="14">
                    <el-table
                        ref="pressCtrlTable"
                        :data="pressCtrlList"
                        @selection-change="pressCtrlCheck"
                        height="620"
                        style="width: 100%">
                        <el-table-column
                        type="selection"
                        width="55">
                        </el-table-column>
                        <el-table-column
                        label="编号"
                        prop="CodeId">
                        </el-table-column>
                        <el-table-column
                        prop="PressureName"
                        label="压力点名称">
                        </el-table-column>
                        <el-table-column
                        prop="CtPressure"
                        label="压力(MPa)">
                        </el-table-column>
                        <el-table-column
                        label="控制压力(MPa)">
                        <template slot-scope="scope">
                            <input v-model="scope.row.CroPressure">
                        </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </div>
       <!--  <div class="areaPress-title">
            <el-row>
                <el-col :span="12">
                    <span class="title">调度方案</span>
                </el-col>
            </el-row>
        </div>
        <reduction-scheme :url="url"></reduction-scheme> -->
    </div>
</template>
<script>
import axios from "axios";
import Bus from "@/bus.js";
/* import ReductionScheme from "../ReductionScheme.vue"; */
import overview from "./overview.vue";
import urlClass from "@/components/js/UrlClass";
import WindowsEvent from "@/components/js/WindowsEvent";
export default {
  components: { /* ReductionScheme, */ overview },
  data() {
    // let data = []
    // for(let i = 0;i < 20;i++){
    //     data.push({id:i,sz:'JZL0554',name:'压力点01',inPoint: true,inCtrl:false,yl:0.3,kzyl:0.6})
    // }

    return {
      monitor_point: "",
      pressPointList: [],
      pressCtrlList: [],
      selectedPoint: [],
      selectedCtrl: [],
      url: ""
    };
  },
 
  methods: {
        calMy(){
            if(this.pressCtrlList.length==0){
                alert('请选择控制点');
            }
            else{
                var date = new Date();
                var inTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+
                              date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':00';
                var CodeIds = new Array();
                var Pressures = new Array();
                for(var i=0;i<this.pressCtrlList.length;i++){
                    var obj = this.pressCtrlList[i];
                    CodeIds.push(obj.CodeId);
                    Pressures.push(obj.CroPressure);
                }
                for(var i=0;i<this.pressPointList.length;i++){
                     var isFalse = true;
                     var obj = this.pressPointList[i];
                     for(var j=0;j<this.pressCtrlList.length;j++){
                         if(obj.CodeId == this.pressCtrlList[j].CodeId){
                             isFalse = false;
                             break;
                         }
                     }
                     if(isFalse){
                         CodeIds.push(obj.CodeId);
                        Pressures.push(obj.CtPressure);
                     }
                    
                }
                var paramsTemp = {Time:inTime,CodeId:CodeIds,CtPressure:Pressures};
                WindowsEvent.MyDispatchEvent('SchedulePressureCal',paramsTemp);
                this.restotable();
            };
        },
    restotable() {
      var _this = this;
      _this.$axios
        .post(urlClass.axiosUrlYJ+"GetWaterworks")
        .then(res => {
           
            console.log(res)
          var outflow1 = parseFloat(
            res.data.CurrentData[0].OutFlow +
              res.data.CurrentData[1].OutFlow +
              res.data.CurrentData[2].OutFlow +
              res.data.CurrentData[3].OutFlow +
              res.data.CurrentData[4].OutFlow +
              res.data.CurrentData[5].OutFlow
          ).toFixed(1);
         /*  var outflow2 = parseFloat(
            res.data.ForecastData[0].OutFlow +
              res.data.ForecastData[1].OutFlow +
              res.data.ForecastData[2].OutFlow +
              res.data.ForecastData[3].OutFlow +
              res.data.ForecastData[4].OutFlow +
              res.data.ForecastData[5].OutFlow
          ).toFixed(1); */
           
          Bus.$emit("indexCurrent", res.data.CurrentData);
          Bus.$emit("indexForecast", res.data.ForcastData);
          Bus.$emit("CurrentDataoutflow1",outflow1);
          /* Bus.$emit("ForecastDataoutflow2",outflow2); */
        })
        .catch(error => {
          console.log(error.data);
        });
    },
   pressPointCheck(val) {
            this.selectedPoint = val
        },
        pressCtrlCheck(val) {
            this.selectedCtrl = val
        },
        add(){
            if(this.selectedPoint.length>0){
                this.selectedPoint.forEach(e=>{
                    this.pressCtrlList.push(e)
                    e.inPoint = false
                })
                this.selectedPoint = []
                this.$refs.pressPointTable.clearSelection()
                //压力控制点定位
                var objectTemp = {pressPointList:this.pressPointList,pressCtrlList:this.pressCtrlList}
                WindowsEvent.MyDispatchEvent("EmergencyDispatchPressureNodePosition",objectTemp);
            }
        },
        remove(){
            if(this.selectedCtrl.length>0){
                let self = this
                this.selectedCtrl.forEach(e=>{
                    e.inPoint = true
                    self.pressCtrlList.forEach((p,i)=>{
                        if(p.id == e.id){
                            self.pressCtrlList.splice(i,1)
                        }
                    })
                })
                //压力控制点定位
                var objectTemp = {pressPointList:self.pressPointList,pressCtrlList:self.pressCtrlList}
                WindowsEvent.MyDispatchEvent("EmergencyDispatchPressureNodePosition",objectTemp);
            }
            this.selectedCtrl = []
            this.$refs.pressCtrlTable.clearSelection()
        },
        pressPointSelectable(row,index){
            return row.inPoint
        },
        fetchPressurePoint() {
            let self = this
            this.$axios.post(urlClass.axiosUrlYJ+'GetPressurePoint').then(R=>{
                R.data.PressurePointList.forEach(e=>{
                    e.inPoint = true
                })
                self.pressPointList = R.data.PressurePointList;
                //压力控制点定位
                var objectTemp = {pressPointList:self.pressPointList,pressCtrlList:self.pressCtrlList}
                WindowsEvent.MyDispatchEvent("EmergencyDispatchPressureNodePosition",objectTemp);
            })
        }
  },
  created() {
    this.url = urlClass.axiosUrl2 + "DispatchCALC";
    this.fetchPressurePoint();
    this.restotable()
    /*console.log(this.$route.path)获取地址栏中的地址
        console.log(window.location.href)
        console.log(this.$route.params)*/
  },
  mounted() {
    //this.url = urlClass.axiosUrl2+"DispatchCALC";//http://112.64.170.158:8186/Service1.svc/DispatchCALC
    console.log(this.url);
    
  }
};
</script>
<style lang="less" scoped>
.areaPress {
  .areaPress-title {
    line-height: 40px;
    padding: 0 10px;
    border: 1px solid #d1d1da;
    border-left: 3px solid #70991f;
    .el-input {
      width: 200px;
      margin-left: 30px;
    }
    .title {
      font-size: 14px;
      color: #6e7b8b;
      font-weight: bold;
    }
  }
  .transfer-wrapper {
    .operate-btn {
      position: relative;
      border-left: 1px solid #d1d1da;
      border-right: 1px solid #d1d1da;
      .btns {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
      }
    }
  }
}
.areaPress .transfer-wrapper .operate-btn .btns[data-v-0e15ffe9] {
    top: 30%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    position: absolute;
}
</style>

