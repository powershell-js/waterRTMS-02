<template>
  <div class="box">
    <ul class="listbox tabs">
      <li
        class="li-tab"
        v-for="(item,index) in tabsParam"
        :key="item.tabsParam"
        @click="toggleTabs(index)"
        :class="{active:index===nowIndex}"
      >{{item}}</li>
    </ul>
    <div class="list">
      <!-- <div class="kedu"></div> -->
    <!--   <bjs-list v-show="nowIndex===0"></bjs-list>
      <dyb-list v-show="nowIndex===1"></dyb-list>
      <dyn-list v-show="nowIndex===2"></dyn-list>
      <dh-list v-show="nowIndex===3"></dh-list>
      <ml-list v-show="nowIndex===4"></ml-list>
      <ns-list v-show="nowIndex===5"></ns-list> -->
      <bjs-list v-if="nowIndex===0"></bjs-list>
      <dyb-list v-if="nowIndex===1"></dyb-list>
      <dyn-list v-if="nowIndex===2"></dyn-list>
      <dh-list v-if="nowIndex===3"></dh-list>
      <ml-list v-if="nowIndex===4"></ml-list>
      <ns-list v-if="nowIndex===5"></ns-list>
    </div>
  </div>
</template>
<script>
import Bus from "@/bus.js";
import urlClass from "@/components/js/UrlClass";
import BjsList from "./tabChild/bjslist.vue";
import DybList from "./tabChild/dyblist.vue";
import DynList from "./tabChild/dynlist.vue";
import DhList from "./tabChild/dhlist.vue";
import MlList from "./tabChild/mllist.vue";
import NsList from "./tabChild/nslist.vue";
export default {
  name: "Tablist",
  data() {
    return {
      tabsParam: [
        "笔架山水厂",
        "大涌北水厂",
        "大涌南水厂",
        "东湖水厂",
        "梅林水厂",
        "南山水厂"
      ],
      nowIndex: 0,
      isShow: false,
      /*  indextotabCodeIddata:"",
      indextotabCtPressuredata:"", */
      indextoWatertabdata: [],
      CodeIddata: {},
      CtPressuredata: {},
      Datedata: "",
      indexechartsdata:{},
      indexpoumpdata:{},
     /*    resdata4: "",
      errordata4: "", */
      loadingdata4: ""
    };
  },
  mounted() {
      Bus.$on("planThisYearMaxFlowTime", e => {
      this.Datedata = e;
      console.log(this.Datedata);
    });
       Bus.$on("splanThisYearMaxFlowTime", e => {
      this.Datedata = e;
      console.log(this.Datedata);
    })
    Bus.$on("indextotabCodeId", e => {
      this.CodeIddata = e;
      console.log(this.CodeIddata);
    });
    Bus.$on("indextotabCtPressure", e => {
      this.CtPressuredata = e;
      console.log(this.CtPressuredata);
    });
      Bus.$on("indextotabnowindex", e => {
      this.nowIndex = e;
    });
    
  },
  wtach:{
    nowIndex(){
      this.poumapi()
      this.echartsapi1();
    },
  /*    resdata4(s4) {
      if (this.resdata4.status == 200) {
        this.loadingdata4.close();
      }
    },
    errordata4(e4) {
      if (this.errordata4 != "") {
        this.loadingdata4.close();
      }
    } */
  },
  methods: {
     openFullScreen4() {
      const loading = this.$loading({
        lock: true,
        text: "数据加载中，请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.loadingdata4 = loading;
    },
    //切换tab项
    toggleTabs(index) {
      this.nowIndex = index;
      var WaterNum = this.tabsParam[index];
      var CodeId = this.CodeIddata;
      var CtPressure = this.CtPressuredata;
      var Date = this.Datedata;
      this.indexechartsdata={WaterNum,Date};
     this.indexpoumpdata={WaterNum,CodeId,CtPressure}
     this.openFullScreen4();
      this.poumapi()
      this.echartsapi1();
      console.log(this.indexechartsdata);
      console.log(this.indexpoumpdata);
    },
    echartsapi1() {
      let self = this;
      self.$axios
        .post(
          urlClass.axiosUrJH + "GetCJDispatchCurve",
          JSON.stringify(self.indexechartsdata),
          {
            headers: { "Content-Type": "application/json;" }
          }
        )
        .then(function(res) {
          /* console.log(res) */
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
    poumapi() {
     let self = this;
      self.$axios
        .post(
          urlClass.axiosUrJH + "GetWaterPump",JSON.stringify(self.indexpoumpdata),{
            headers: { "Content-Type": "application/json;" }
         })
        .then(res => {
          Bus.$emit('planpoum',res.data);  
      /*  self.resdata4 = res; */
    /*   console.log(res) */
        self.loadingdata4.close();
        })
      .catch(error => {
       /*   self.errordata4 = error; */
         self.loadingdata4.close();
        console.log(error);
      });
    }
  },
  components: {
    BjsList,
    DybList,
    DynList,
    DhList,
    MlList,
    NsList
  }
};
</script>
<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  /*   margin: 0 20px; */
  width: 100%;
  overflow: hidden;
}
.listbox {
  border-bottom: 1px solid #d1d1da;
  list-style: none;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  /*  min-width: 1128px; */
  height: 40px;
  color: #788493;
  background-color: #f5f5f6;
}
.listbox > li {
  width: 16.66%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border: 1px #e4e4ec solid;
  font-size: 12px;
  font-family: "微软雅黑";
  font-weight: bold;
  cursor: pointer;
}
.active {
  color: #fff;
  background-color: #70991f;
}
.list {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
}
</style>

