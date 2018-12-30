<template>
    <div class="cut-water-plan">
        <el-row>
            <el-col :span="6">
                <scheme-list :url="url+'GetSchemeList'"></scheme-list>
            </el-col>
            <el-col :span="18">
                <boundary-conditions :url="url+'PlanStopWaterSetting'"></boundary-conditions>
                <panel-title :title="'停水分析'" :border-show="false">
                    <el-input :disabled="true" v-model="this.parameter.ElementId" placeholder="请输入内容" class="el-input--suffix"></el-input>
                    <el-button v-on:click="selectClick">图上选择停水管道</el-button>
                </panel-title>
                <step :steps="steps"></step>
                <cut-water-dispos :parameter="parameter"  v-if="curStep == 'tscz'"></cut-water-dispos>
                <model-analysis :parameter="parameter" v-if="curStep == 'mnjs'" :url="url+'SimulationCount'"></model-analysis>
                <optimal-operation v-if="curStep == 'yhdd'"></optimal-operation>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import WindowsEvent from "@/components/js/WindowsEvent";
import urlClass from '@/components/js/UrlClass'
import SchemeList from './schemeList.vue'
import BoundaryConditions from './boundaryConditions.vue'
import PanelTitle from './panelTitle.vue'
import step from '../../../step.vue'
import CutWaterDispos from './cutWaterDispos.vue'
import ModelAnalysis from './modelAnalysis.vue'
import OptimalOperation from './optimalOperation.vue'
export default {
    components: { SchemeList, BoundaryConditions, PanelTitle, step, CutWaterDispos, OptimalOperation, ModelAnalysis },
    data() {
        return {
            steps: [
                {name: '停水处置',onClick:this.stepClick,key:'tscz'},
                {name: '模拟计算',onClick:this.stepClick,key:'mnjs'},
                {name: '优化调度',onClick:this.stepClick,key:'yhdd'},
            ],
            curStep: 'tscz',
            url:'',
            parameter: {
        Demand: 1000,
        ElementId: 0,
        Type: 0,
        CanNotBeclosedValves: [],
        Time: 0,
        TableName: "",
        UserId: "",
        IsSave: false,
        CloseValveList: []
      },
      loading:'',
        }
    },
    created(){
        this.url = urlClass.axiosUrJH;
    },
    mounted(){
        console.log(this.url)
        window.addEventListener("event_name", this.myEventListener);
    },
    methods:{
         selectClick() {
            this.clearSelectInfo();
            this.clearMap();
            WindowsEvent.MyDispatchEvent("PipeBurstMapClick", true);
            WindowsEvent.MyDispatchEvent("BaseMap", '');
            },
        stepClick(key) {
            this.curStep = key
        },
        myEventListener(event) {
      var typeTemp = event.detail.type;
      if (typeTemp == "PipeBurstMapClickReturn") {
        var dataTemp = event.detail.data.ElementID;
        var dataType = event.detail.data.ElementTypeId;
        this.parameter.ElementId = dataTemp;
        this.parameter.Type = dataType;
        this.selectType = dataType;
      } else if (typeTemp == "SetCloseValveState") {
        var dataTemp = event.detail.data.ElementID;

        if (this.parameter.CanNotBeclosedValves.indexOf(dataTemp) >= 0)
          this.parameter.CanNotBeclosedValves.splice(
            this.parameter.CanNotBeclosedValves.indexOf(dataTemp),
            1
          );
        else this.parameter.CanNotBeclosedValves.push(dataTemp);
      }else if(typeTemp == "PipeBurstLoadingBegin"){
          this.LoadingOpen(event.detail.data);
      }
      else if (typeTemp == "PipeBurstLoadingEnd") {
        this.LoadingClose();
      }
      else if(typeTemp == "PipeBurstDraw"){
         var DownHeadMax = event.detail.data.DownHeadMax;
        DownHeadMax = DownHeadMax/100;
        this.listItems[1].value = DownHeadMax;
        this.listItems[2].value = (DownHeadMax-0.01).toFixed(2);
        this.listItems[3].value = 300.23;
        this.listItems[4].value = event.detail.data.UserLength;
        this.listItems[5].value = 102;
      }
        },
       clearMap(event) {
      WindowsEvent.MyDispatchEvent("PipeBurstClear", true);
    },
    clearSelectInfo() {
      //this.parameter.Demand = 0;
      this.parameter.ElementId = 0;
      this.parameter.CanNotBeclosedValves = [];
      this.parameter.CloseValveList = [];
    },
    LoadingOpen(loadingLabel) {
      this.loading = this.$loading({
        lock: true,
        text: loadingLabel,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
    },
    LoadingClose() {
      this.loading.close();
    },
    },
    destroyed() {
        this.$store.dispatch('clear_scheme_data')
    },
    
}
</script>
<style lang="less" scoped>
.cut-water-plan{
    .el-input--suffix{
        width: 200px;
    }
}
</style>
