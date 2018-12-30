<template>
    <div class="cut-water-dispos">
        <panel-title :title="'管网计划停水处置'" :color-show="false">
            <el-radio-group v-model="radio" class="radioGroupClass" style="margin-right:30px">
                <el-radio class="radioClass" style="margin-right:20px" v-model="radio" :label="1" >停水范围最小</el-radio>
                <el-radio class="radioClass" v-model="radio" :label="2" >停水关阀最少</el-radio>
            </el-radio-group>
            <!-- &emsp;&emsp;&emsp;&emsp; -->
            <el-button type="success" @click="handleClick">关阀搜索</el-button>
        </panel-title>
        <close-search-list :gfssList="closeValveInfo" :tsyhList="effectUserInfo" ref="closeSearch"></close-search-list>
    </div>
</template>
<script>
import WindowsEvent from "@/components/js/WindowsEvent";
import urlClass from '@/components/js/UrlClass'
import PanelTitle from './panelTitle.vue'
import closeSearchList from './closeSearchList.vue'
import axios from 'axios'
export default {
    components: { PanelTitle, closeSearchList },
    props:{
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
            radio:1,
            stopWaterInfo:'',
            closeValveInfo:[],
            effectUserInfo:[]
            
        }
    },
    methods: {
        handleClick() {
            //this.$refs.closeSearch.gbfmClick()
            this.CloseValveAnalysis();
        },
         CloseValveAnalysis() {
      if (this.parameter.ElementId == "") alert("请检查输入参数");
      else {
        WindowsEvent.MyDispatchEvent("PipeBurstLoadingBegin", "正在分析关阀");
        this.parameter.Type = this.radio - 1;
        console.log(this.parameter)
        var self = this;
        if (this.selectType == "0") {
          axios
            .post(
              urlClass.axiosUrl + "PipeBurstInNode",
              JSON.stringify(this.parameter),
              {
                headers: { "Content-Type": "application/json;" }
              }
            )
            .then(this.CloseValveAnalysisReturn)
            .catch(function (error) {
                WindowsEvent.MyDispatchEvent("PipeBurstLoadingEnd", true);
            });
        } else {
          console.log(JSON.stringify(this.parameter));
          axios
            .post(
              urlClass.axiosUrl + "PipeBurstInPipe",
              JSON.stringify(this.parameter),
              {
                headers: { "Content-Type": "application/json;" }
              }
            )
            .then(this.CloseValveAnalysisReturn)
            .catch(function (error) {
                WindowsEvent.MyDispatchEvent("PipeBurstLoadingEnd", true);
            });
        }
      }
    },
     /**
     * 关阀搜索绘图
     */
    CloseValveAnalysisReturn(response) {
      var result = response.data;
      var object = new Object();
      object.ListPipe = result.ListPipe;
      object.ListValve = result.ListValve;
      object.ListUser = result.ListUser;
      object.TitleArr = result.TitleArr;
      object.CloseValvesList = result.CloseValvesList;
      object.TitleArr = result.TitleArr;
      object.ClosedCheckValvesData = result.ClosedCheckValvesData;
      object.OpenValvesList = result.OpenValvesList;
      object.ListReleasedPipes = result.ListReleasedPipes;

      this.parameter.CloseValveList = result.FoundValves;

      this.stopWaterInfo = result.TitleArr;
      this.closeValveInfo = result.ListValve;
      this.effectUserInfo = result.ListUser;

      console.log(result.ListValve);

      WindowsEvent.MyDispatchEvent("PipeBurstCloseValveDraw", object);
      //this.$emit("showRightWin", object);
    },
    }
}
</script>
<style lang="less" scoped>
.cut-water-dispos{
    height: 420px;
}
</style>
