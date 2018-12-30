<template>
    <div class="model-analysis">
        <panel-title :title="'管网模拟分析'" :color-show="false" v-if="titleShow">
            <el-button type="success" @click="handleClick">模拟分析</el-button>
        </panel-title>
        <el-row class="data-block-warp">
            <el-col :span="6" :key="data.textTop" v-for="data in dataList">
                <data-block :data="data"></data-block>
            </el-col>
        </el-row>
        <table-tab :tabs="tabs">
            <template>
                <div class="inner-table">
                    <el-table v-show="curTab == 'UsersAffectedList'" :data="UsersAffectedList" style="width: 100%" stripe :header-row-style="headerStyle" :row-style="rowStyle" height="300">
                      <!--   <el-table-column prop="No" label="编号"></el-table-column>
                        <el-table-column prop="UserName" label="用户名称"></el-table-column>
                        <el-table-column prop="WaterUserFlow" label="水量"></el-table-column>
                        <el-table-column prop="PressureValue" label="压力"></el-table-column>
                        <el-table-column prop="PressureDrop" label="压力变化"></el-table-column>
                        <el-table-column prop="Address" label="地址"></el-table-column> -->
                        <el-table-column prop="UserNum" label="编号"></el-table-column>
                        <el-table-column prop="UserName" label="用户名称"></el-table-column>
                        <el-table-column prop="Demand" label="用水量（m³）"></el-table-column>
                        <el-table-column prop="Pressure" label="压力降（m）"></el-table-column>
                        <el-table-column prop="Addr" label="地址"></el-table-column>
                    </el-table>


                    <el-table v-show="curTab == 'PressureData'" :data="pressureTableDate" style="width: 100%" stripe :header-row-style="headerStyle" :row-style="rowStyle" height="300">
                        <el-table-column prop="Station" label="编号"></el-table-column>
                        <el-table-column prop="PressureName" label="压力点名称"></el-table-column>
                        <el-table-column prop="CtPressure" label="目标压力(MPa)"></el-table-column>
                        <el-table-column prop="RtPressure" label="结果压力"></el-table-column>
                        <el-table-column prop="PressureChange" label="压力变化"></el-table-column>
                    </el-table>
                </div>

                <div class="pagination-wrapper">
                    <template v-if="curTab == 'UsersAffectedList'">
                        <span style="float:left;line-height: 1;padding-top: 14px;">共&nbsp;{{usersAffectedListTotal}}&nbsp;条</span>
                        <el-pagination
                            layout="prev, pager, next"
                            :total="usersAffectedListTotal"
                            :page-size="pageSize"
                            :current-page="currentPage1"
                            @current-change="handleCurrentChange1">
                        </el-pagination>
                    </template>
                    <template v-if="curTab == 'PressureData'">
                        <span style="float:left;line-height: 1;padding-top: 14px;">共&nbsp;{{pressureDataTotal}}&nbsp;条</span>
                        <el-pagination
                            layout="prev, pager, next"
                            :total="pressureDataTotal"
                            :page-size="pageSize"
                            :current-page="currentPage2"
                            @current-change="handleCurrentChange2">
                        </el-pagination>
                    </template>
                </div>
            </template>
        </table-tab>
    </div>
</template>
<script>
import PanelTitle from './panelTitle.vue'
import DataBlock from './dataBlock.vue'
import TableTab from './tableTab.vue'
import axios from "axios";
import WindowsEvent from "@/components/js/WindowsEvent";
import mainClass from "@/components/js/MainClass";
import urlClass from "@/components/js/UrlClass";
export default {
    components: { PanelTitle, DataBlock, TableTab },
    props: {
        titleShow: {
            type: Boolean,
            default: true
        },
        url: String,
        param: {
            type: Object,
            default: function() {
                return {}
            }
        },
        parameter: {
            type: Object,
            default: {
                Demand: 0,
                ElementId: 0,
                Type: 0,
                CanNotBeclosedValves: [],
                Time: 0,
                TableName: "",
                UserId: "",
                IsSave: false,
                CloseValveList: []
            }
    },
    },
    data() {
        return {
            currentPage1:1, //默认显示第一页
            currentPage2:1, //默认显示第一页
            pageSize:10,//默认每页显示10条
            headerStyle(){
                return {
                    'height':'40px',
                    'line-height':'40px',
                    'background-color':'#f0f0f1',
                    'color':'#778392'
                }
            },
            rowStyle(){
                return {
                    'height':'40px',
                    'line-height':'40px',
                    'color':'#6e7b8b'
                }
            },
            dataList: [
                {
                    textTop: '管网最大压力变化(Mpa)',
                    value: 0,
                    textBottom: '变化节点',
                    posShow: true,
                    color: '#70991F'
                },{
                    textTop: '管道最大流速变化(m³/h)',
                    value: 0,
                    textBottom: '变化管道',
                    posShow: true,
                    color: '#E9AF3B'
                },{
                    textTop: '水厂流量最大变化(m³/h)',
                    value: 0,
                    textBottom: '—',
                    posShow: false,
                    color: '#6E7B8B'
                },{
                    textTop: '水厂压力最大变化(Mpa)',
                    value: 0,
                    textBottom: '—',
                    posShow: false,
                    color: '#D56459'
                }
            ],
            PressureData: [],
            UsersAffectedList: [],
            allUsersAffectedTable:[],
            curTab: 'UsersAffectedList',
            tabs: [
                {name: '受停水影响用户列表', key: 'UsersAffectedList', tabClick:this.tabClick},
                {name: '压力控制点压力', key: 'PressureData', tabClick:this.tabClick}
            ]
        }
    },
    methods: {
        handleClick() {
           /*  let self = this;
            this.$axios.post(this.url, {
                WaterStopDate: this.boundaryData.WaterStopDate,
                CodeId: this.boundaryData.CodeId,
                CTPressure: this.boundaryData.CTPressure,
                TolPlanWaterVol: this.boundaryData.TolPlanWaterVol,
                PipeNo: this.boundaryData.PipeNo
            }).then(function(R){
                self.dataList[0].value = R.data.PipeMaxPressure * R.data.PipeMaxPressureType
                self.dataList[1].value = R.data.PipeMaxFlowSpeed * R.data.PipeMaxFlowSpeedType
                self.dataList[2].value = R.data.WaterworksMaxFlowChg.Data * R.data.WaterworksMaxFlowChg.Type
                self.dataList[2].textBottom = R.data.WaterworksMaxFlowChg.WaterworksName
                self.dataList[3].value = R.data.WaterworksMaxPressureChg.Data * R.data.WaterworksMaxPressureChg.Type
                self.dataList[3].textBottom = R.data.WaterworksMaxPressureChg.WaterworksName

                self.PressureData = R.data.PressureData
                self.UsersAffectedList = R.data.UsersAffectedList
            }) */
             if (this.parameter.CloseValveList.length == 0) alert("未关闭任何阀门");
      else {
        WindowsEvent.MyDispatchEvent("PipeBurstLoadingBegin", "正在计算");
        this.parameter.IsSave = true;
        if(this.parameter.IsSave&&this.parameter.TableName=="")
          {
            this.parameter.TableName = mainClass.GetRanLetterString(4);
          }
        axios
          .post(
            urlClass.axiosUrl + "CloseModel",
            JSON.stringify(this.parameter),
            {
              headers: { "Content-Type": "application/json;" }
            }
          )
          .then(this.CloseValveCalReturn)
          .catch(function (error) {
                WindowsEvent.MyDispatchEvent("PipeBurstLoadingEnd", true);
            });
      }
        },
         /**
     * 关阀计算绘图
     */
    CloseValveCalReturn(response) {
      var result = response.data;
      var object = new Object();
      object.min = result.MinFlow;
      object.max = result.MaxFlow;
      object.allData = result.PipeFlow;
      object.DownHeadMax = result.DownHeadMax;
      object.minP = result.MinPressure;
      object.maxP = result.MaxPressure;
      object.NodePressure = result.NodePressure;
      object.TableName = this.parameter.TableName;
      object.minV = result.MinStrength;
      object.maxV = result.MaxStrength;
      object.strengthData = result.PipeStrength;
      console.log(result);
      this.dataList[0].value = ((result.MaxPressure)/100.0).toFixed(2);
      this.dataList[1].value = ((result.MaxStrength)/100.0).toFixed(2);
      var pressureDown = result.IsDown;
      var strengthDown = result.IsDownStrength;
      this.dataList[0].value = result.IsDown?this.dataList[0].value*(-1):this.dataList[0].value;
      this.dataList[1].value = result.IsDownStrength?this.dataList[1].value*(-1):this.dataList[1].value;
      this.dataList[2].value = (result.WaterWorkMaxPressure).toFixed(2);
      this.dataList[2].textBottom = result.WaterWorkMaxPressureLabel
      this.dataList[3].value = (result.WaterWorkMaxDemand).toFixed(2);
      this.dataList[3].textBottom = result.WaterWorkMaxDemandLabel
      var userArray = result.EffectUser.slice(0);
      this.allUsersAffectedTable = userArray.slice(0);
      this.UsersAffectedList = this.allUsersAffectedTable.slice(0,this.pageSize)
      object.UserLength = userArray.length;
      WindowsEvent.MyDispatchEvent("PipeBurstDraw", object);
    },
        tabClick(key) {
            this.curTab = key
        },
        handleCurrentChange1(val) {
            this.currentPage1 = val
            this.UsersAffectedList = this.allUsersAffectedTable.slice((this.currentPage1 - 1) * this.pageSize,this.pageSize * this.currentPage1)
        },
        handleCurrentChange2(val) {
            this.currentPage2 = val
        }
    },
    computed: {
        boundaryData() {
            return this.$store.state.planDispatch.schemeData.boundaryData
        },
        pressureDataTotal() {
            return this.PressureData.length
        },
        usersAffectedListTotal() {
            return this.allUsersAffectedTable.length
        },
        pressureTableDate() {
            let data = []
            for(let i = 0; i < this.pageSize; i++){
                data.push(this.PressureData[i + (this.currentPage2 - 1) * this.pageSize])
            }
            return data
        },
        usersAffectedTableDate() {
            let data = []
            for(let i = 0; i < this.pageSize; i++){
                data.push(this.UsersAffectedList[i + (this.currentPage1 - 1) * this.pageSize])
            }
            return data
        }
    } 
}
</script>
<style lang="less" scoped>
.model-analysis{
    height: 420px;
    .data-block-warp{
        text-align: center;
        padding: 30px 0;
    }
    .table-tab{
        padding: 10px;
        .inner-table{
            padding: 10px;
        }
    }
}
</style>
