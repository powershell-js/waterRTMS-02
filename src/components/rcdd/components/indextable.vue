<template>
    <div class="outbox">
        <div class="inbox">
            <!--左侧部分  -->
            <div class="tableleft">
                <div class="topbox">
                   <div class="topbox1">
<div class="xcdjstime">下次调度时间</div>
<div class="xctimeshow">{{time1}}</div>
                   </div>
                   <div class="topbox2">
                      <IndextableDaojishijdt/>
                   </div>
                    <!-- <div class="topbox2">
                        <div>00:25:33</div>
                    </div>
                    <div id="topbox3"><div class="topbox3-1"></div></div> -->
                </div>
                <div class="downbox">
                    <div class="downbox1">
                        <div class="dangqiangsl">当前总供水量（m³/h）</div>
                        <!-- <div class="downbox1-bfb"><img src="../../../assets/img/深水_日常调度_切图01_23.png" alt=""> 10%</div> -->
                    </div>
                    <div class="downbox2">
                        <div>{{outFlowdata}}</div>
                    </div>
                    <div class="downbox3">
                        <div class="dangqiangs3">调度总供水量（m³/h）</div>
                        <div class="downbox1-bfb3" :class="showpercentnumdata>0?'percentcolorblue':'percentcolorred'"><i :class="showpercentnumdata>0?'percentcolorbluebg':'percentcolorredbg'"></i> {{(showpercentnumdata<0?(-showpercentnumdata):showpercentnumdata)}}%</div>
                    </div>
                    <div class="downbox4">
                        <div>{{ForecastDataoutflowdata}}</div>
                    </div>
                </div>
            </div>
            <!-- 右侧部分 -->
            <div class="tableright">
              <TopTable/>
            </div>
        </div>
    </div>
</template>
<script>
import Bus from "@/bus.js";
import TopTable from "@/components/rcdd/components/toptable";
import IndextableDaojishijdt from "@/components/rcdd/components/indextable/daojishijdt";
export default {
  name: "Indextable",
  data() {
    return {
      time1: "",
      outFlowdata: "------",
      ForecastDataoutflowdata: "------",
      showpercentnumdata:"---",
    };
  },
  components: {
    TopTable,
    IndextableDaojishijdt
  },
  mounted() {
    let self = this;
    Bus.$on("djstimeapi", e => {
      self.time1 = e; /* 　console.log(`传来的数据是：${e}`) */ 
    });
    Bus.$on("outFlow", e => {
      self.outFlowdata = e;
    });
    Bus.$on("ForecastDataoutflow", e => {
      self.ForecastDataoutflowdata = e;
    });
     Bus.$on("percentnumdata", e => {
      self.showpercentnumdata = e;
   
    });
  }
};
</script>
<style lang="scss" scoped>
.outbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 362px;
  /*  background-color: #921e1e; */
  background: url(../../../assets/img/深水_日常调度_背景_17.png) 100% 100%;
  overflow: hidden;
}
.inbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: -moz-calc(100% - 40px);
  width: -webkit-calc(100% - 40px);
  width: calc(100% - 40px);
  height: 324px;
  /*  background-color: #1e2092; */
}
.tableleft {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 20%;
  min-width: 218px;
  height: 324px;
  /*  background-color: #1e9279  */
}
.topbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 162px;
  /*   background-color: #101927;
  opacity: 0.6; */
  background-color: rgba(16, 25, 39, 0.6);
  /* background-color: brown; */
}
.topbox1 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: chartreuse;
  height: 32px;
}
.xcdjstime {
  color: #000;
  font-family: "微软雅黑";
  font-size: 12px;
  margin-left: 10px;
}
.xctimeshow {
  color: #000;
  font-family: "微软雅黑";
  font-size: 12px;
  margin-right: 10px;
  letter-spacing: 1px;
}
.topbox2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}
.downbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  /* justify-content: space-between; */
  align-items: center;
  width: 100%;
  height: 152px;
  background-color: rgba(16, 25, 39, 0.6);
  /*  background-color: #101927;
  opacity: 0.6; */
  /* background-color: rgb(52, 107, 209); */
}
.downbox1 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.dangqiangsl {
  color: #fff;
  font-family: "微软雅黑";
  font-size: 12px;
  margin-left: 10px;
  margin-top: 10px;
}
.downbox1-bfb {
  color: #00ccff;
  font-family: "微软雅黑";
  font-size: 12px;
  margin-right: 10px;
  margin-top: 10px;
}
.downbox2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
}
.downbox2 > div {
  color: #00ccff;
  font-size: 28px;
  font-family: "微软雅黑";
  font-weight: bold;
  margin-left: 10px;
  letter-spacing: 1px;
}
.downbox3 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.dangqiangs3 {
  color: #fff;
  font-family: "微软雅黑";
  font-size: 12px;
  margin-left: 10px;
  margin-top: 10px;
}
.downbox1-bfb3 {
  /* color: #d56459; */
  font-family: "微软雅黑";
  font-size: 12px;
  margin-right: 10px;
  margin-top: 10px;
  /* width: 20px;
  height: 25px; */
 /*   */
}
.percentcolorblue{
  color: #00ccff;
}
.percentcolorred{
 color: #d56459;
}
.percentcolorbluebg{
  display: inline-block;
  width: 15px;
  height: 8px;
background-image: url("../../../assets/img/深水_日常调度_切图01_23.png");
background-repeat: no-repeat;
background-position: 0px 0px
}
.percentcolorredbg{
  display: inline-block;
  width: 15px;
  height: 8px;
background-image: url("../../../assets/img/深水_日常调度_切图01_24-1.png");
background-repeat: no-repeat;
background-position: 0px 0px
}
.downbox4 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
}
.downbox4 > div {
  color: #d56459;
  font-size: 28px;
  font-family: "微软雅黑";
  font-weight: bold;
  margin-left: 10px;
  letter-spacing: 1px;
}
.tableright {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: -moz-calc(70% - 20px);
  width: -webkit-calc(70% - 20px);
  width: calc(80% - 20px);
  height: 324px;
  /*   background-color: #37465d;
  opacity: 0.6; */
  background-color: rgba(55, 70, 93, 0.6);
  /* overflow: auto; */
  /*  background-color: #69921e   */
}
</style>


