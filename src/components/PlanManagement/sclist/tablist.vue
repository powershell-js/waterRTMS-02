<template>
    <div class="box">
       <ul class="listbox tabs">
           <li class="li-tab" v-for="(item,index) in tabsParam" :key="item.tabsParam"
                 @click="toggleTabs(index)"
                  :class="{active:index===nowIndex}">{{item}}
               </li>
       </ul>
       <div class="list">
           <!-- <div class="kedu"></div> -->
            <bjs-list v-show="nowIndex===0"></bjs-list>
        <dyb-list v-show="nowIndex===1"></dyb-list>
        <dyn-list v-show="nowIndex===2"></dyn-list>
        <dh-list v-show="nowIndex===3"></dh-list>
        <ml-list v-show="nowIndex===4"></ml-list>
        <ns-list v-show="nowIndex===5"></ns-list>
       </div>
    </div>
</template>
<script>
import Bus from "@/bus.js";
import urlClass from "@/components/js/UrlClass";
import BjsList from "@/components/PlanManagement/sclist/bjslist";
import DybList from "@/components/PlanManagement/sclist/dyblist";
import DynList from "@/components/PlanManagement/sclist/dynlist";
import DhList from "@/components/PlanManagement/sclist/dhlist";
import MlList from "@/components/PlanManagement/sclist/mllist";
import NsList from "@/components/PlanManagement/sclist/nslist";
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
      info6tablistdata:{},
      Watername:"笔架山水厂",
      tablistechartsdata:{}
    };
  },
   mounted(){
     Bus.$emit('Waterfactoryname',this.tabsParam);
     Bus.$emit('WaterfactorynowIndex',this.nowIndex)
      Bus.$on("info6tablist", e => {
      this.info6tablistdata = e; 
      　/* console.log(`传来的数据是：${this.info6tablistdata}`) */
    });
    Bus.$on("prelistdatatotablistfun", e => {
      this.info6tablistdata = e; 
      /* 　console.log(`传来的数据是：${this.info6tablistdata}`) */
    });
     Bus.$on("chaxuntoshuichangtab", e => {
      this.nowIndex= e; 
      　/* console.log(`传来的数据是：${this.info6tablistdata}`) */
    });
     Bus.$on("chaxunfalisttoshuichangtab", e => {
      this.nowIndex= e; 
      　/* console.log(`传来的数据是：${this.info6tablistdata}`) */
    });
     Bus.$on("historytoshuichangtab", e => {
      this.nowIndex= e; 
     /*  　console.log(`传来的数据是：${this.info6tablistdata}`) */
    });
   
    },
  methods: {
    //切换tab项
    toggleTabs(index) {
      this.nowIndex = index;
      this.Watername=this.tabsParam[index];
      var WaterworksNo;
      var objecharts1=this.info6tablistdata
      objecharts1.WaterworksNo =this.Watername
      this.tablistechartsdata=objecharts1
      this.ec16(this.ec15(this.ec14(this.ec13(this.ec12(this.ec11())))))
    },
        ec11() {
      var _this = this;
      _this.$axios
        .post(urlClass.axiosUrYA + "GetWaterquantity", JSON.stringify(_this.tablistechartsdata), {
          headers: { "Content-Type": "application/json;" }
        })
        .then(res => {
          var _this = this;
         
          Bus.$emit("info11", res.data);
          console.log(res)
        })
        .catch(error => {
          console.log(error);
        });
    },
    ec12() {
      var _this = this;
      _this.$axios
        .post(urlClass.axiosUrYA + "GetOutPressure", JSON.stringify(_this.tablistechartsdata), {
          headers: { "Content-Type": "application/json;" }
        })
        .then(res => {
          var _this = this;
          
            console.log(res)
          Bus.$emit("info12", res.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
     ec13() {
      var _this = this;
         
      _this.$axios
        .post(urlClass.axiosUrYA + "GetWaterPoolLevel", JSON.stringify(_this.tablistechartsdata), {
          headers: { "Content-Type": "application/json;" }
        })
        .then(res => {
          var _this = this;
            
            console.log(res)
          Bus.$emit("info13", res.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
      ec14() {
      var _this = this;
         
      _this.$axios
        .post(urlClass.axiosUrYA + "GetWaterUnitConsumption", JSON.stringify(_this.tablistechartsdata), {
          headers: { "Content-Type": "application/json;" }
        })
        .then(res => {
          var _this = this;
         
            console.log(res)
          Bus.$emit("info14", res.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    ec15() {
      var _this = this;
      _this.$axios
        .post(urlClass.axiosUrYA + "GetWaterTotalEfficiency", JSON.stringify(_this.tablistechartsdata), {
          headers: { "Content-Type": "application/json;" }
        })
        .then(res => {
          var _this = this;
           
            console.log(res)
          Bus.$emit("info15", res.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
     ec16() {
      var _this = this;
      _this.$axios
        .post(urlClass.axiosUrYA + "GetWaterPump", JSON.stringify(_this.tablistechartsdata), {
          headers: { "Content-Type": "application/json;" }
        })
        .then(res => {
          var _this = this;
           
            console.log(res)
          Bus.$emit("info16", res.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
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
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  /*   margin: 0 20px; */
  width: 100%;
  
}
.listbox {
  list-style: none;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-width: 1128px;
  height: 40px;
  color: #788493;
   background-color: #f5f5f6;
}
.listbox > li {
  width: 266px;
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
  /*   border-bottom: 2px #548ff6 solid; */
}
.list {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction:column;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
/* border: 1px #e4e4ec solid; */
}
/* .kedu{
    width: 100%;
    height:28px;
    background-color: #fff;
    border: 1px #e4e4ec solid;
} */
</style>

