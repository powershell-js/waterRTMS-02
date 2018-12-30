<template>
    <div class="outbox">
        <div class="inboxleft">
            <div class="cont1">
                 <div class="tyfont">{{titlelist2[radionindex2].totalwater2}}</div>
                   <div class="tynum1">{{message5.TotalWaterSupply}}</div>
            </div>
            <div class="cont1">
                 <div class="tyfont">{{titlelist2[radionindex2].energy}}</div>
                 <div class="tynum2">{{message5.TotalEnergy}}</div>
         </div>
        <div class="cont1">
            <div class="tyfont">{{titlelist2[radionindex2].efficient}}</div>
                 <div class="tynum3">{{message5.TotalEfficiency}}</div>
        </div>
            <div class="cont4">
                <div class="tyfont">{{titlelist2[radionindex2].dh}}</div>
                 <div class="tynum4">{{message5.TotalUnitConsumption}}</div>
            </div>
        </div>
        <div class="inboxright">
         <!--  <div class="tabletopoutbox">
            <div class="tabletopinbox">压力控制点压力</div>
          </div> -->
            <Table v-show="radionindex2==0?true:false"/>
            <Table2 v-show="radionindex2==1?true:false"/>
        </div>
    </div>
</template>
<script>
import Bus from "@/bus.js";
import Table from '@/components/PlanManagement/fytable/table'
import Table2 from '@/components/PlanManagement/fytable/table2'
export default {
  name: "Fytable",
  components:{
      Table,
      Table2
  },
   data(){
    return{
      message5:"",
      radionindex2:0,
      titlelist2:[
        {totalwater2:"总供水量(万m3/d)",energy:"能耗(万KW)",efficient:"供水效率(%)",dh:"总单耗(kwh/km³·Mpa)"},
        {totalwater2:"供水量(m3/h)",energy:"能耗(KW)",efficient:"供水效率(%)",dh:"单耗(kwh/km³·Mpa)"}
      ]
    }
  },
  mounted(){
     let self = this;
    Bus.$on("info5", e => {
      self.message5 = e; /* 　console.log(`传来的数据是：${e}`) */
    });
    Bus.$on("radionumdata", e => {
      self.radionindex2= e; 　/* console.log(`传来的数据是：${e}`) */
    });
      Bus.$on("radionumdata1", e => {
      self.radionindex2= e; 　/* console.log(`传来的数据是：${e}`) */
    });
  }
};
</script>
<style lang="scss" scoped>
.outbox {
  width: 100%;
  height: 382px;
}
.inboxleft {
  width: 202px;
  height: 382px;
  border-right: 1px #e4e4ec solid;
  border-left: 1px #e4e4ec solid;
}
.inboxright {
  width: -moz-calc(100% - 202px);
  width: -webkit-calc(100% -202px);
  width: calc(100% - 202px);
  height: 382px;
  border-right: 1px #e4e4ec solid;
 /*  background-color: #70991f */
}
.tabletopoutbox{
width: 100%;
height: 40px;
/* background-color: #e9af3b */
}
.tabletopinbox{
   width: -moz-calc(100% - 40px);
  width: -webkit-calc(100% - 40px);
  width: calc(100% - 40px);
height: 40px;
/* background-color: #3b55e9; */
margin-left: 20px;
color: #acb3ba;
  font-family: "微软雅黑";
  font-size: 12px;
  font-weight: bold;
  line-height: 40px;
   border-bottom: 1px #e4e4ec solid;
}
.cont1 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-start;
  height: 95.5px;
  width: 100%;
  border-bottom: 1px #e4e4ec solid;
}
.cont4 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-start;
  height: 95.5px;
  width: 100%;

}
.tyfont {
  color: #acb3ba;
  font-family: "微软雅黑";
  font-size: 12px;
  margin-left: 10px;
  margin-bottom: 5px;
  margin-top: 5px;
}
.tynum1 {
  color: #70991f;
  font-family: "微软雅黑";
  font-size: 36px;
  margin-left: 10px;
}
.tynum2 {
  color: #e9af3b;
  font-family: "微软雅黑";
  font-size: 36px;
  margin-left: 10px;
}
.tynum3 {
  color: #6e7b8b;
  font-family: "微软雅黑";
  font-size: 36px;
  margin-left: 10px;
}
.tynum4 {
  color: #d56459;
  font-family: "微软雅黑";
  font-size: 36px;
  margin-left: 10px;
}


</style>


