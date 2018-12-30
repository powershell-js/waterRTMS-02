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
            <bjs-list2 v-show="nowIndex===0"></bjs-list2>
        <dyb-list2 v-show="nowIndex===1"></dyb-list2>
        <dyn-list2 v-show="nowIndex===2"></dyn-list2>
        <dh-list2 v-show="nowIndex===3"></dh-list2>
        <ml-list2 v-show="nowIndex===4"></ml-list2>
        <ns-list2 v-show="nowIndex===5"></ns-list2>
       </div>
    </div>
</template>
<script>
import BjsList2 from "@/components/PlanManagement/sclist/bjslist2";
import DybList2 from "@/components/PlanManagement/sclist/dyblist2";
import DynList2 from "@/components/PlanManagement/sclist/dynlist2";
import DhList2 from "@/components/PlanManagement/sclist/dhlist2";
import MlList2 from "@/components/PlanManagement/sclist/mllist2";
import NsList2 from "@/components/PlanManagement/sclist/nslist2";
export default {
  name: "Tablist2",
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
     /*  name:"笔架山水厂" */
    };
  },
/*    mounted(){
     let that=this
          that.apipostPlanManagement(),
          setInterval(function(){
            that.apipostPlanManagement()
          },60000)
    }, */
  methods: {
    //切换tab项
    toggleTabs(index) {
      this.nowIndex = index;
     /*  this.name=this.tabsParam[index]
      this.apipostPlanManagement() */
    },
/*     apipostPlanManagement() {
   let _this = this;
      var WaterNum = _this.name;
      var object = { WaterNum };
     axios.post(urlClass.axiosUrlRC + 'GetWaterPump', JSON.stringify(object),{headers: {'Content-Type':'application/json;'}})
       .then(function (res) {
       var GetWaterPump=res.data.PumpData;
       Bus.$emit('GetWaterPump1',GetWaterPump)
       Bus.$emit('GetWaterPump2',res.data)
       })
       .catch(function (err) {
         console.log(err)

       })
    
    
  }, */
  },
  components: {
    BjsList2,
    DybList2,
    DynList2,
    DhList2,
    MlList2,
    NsList2
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

