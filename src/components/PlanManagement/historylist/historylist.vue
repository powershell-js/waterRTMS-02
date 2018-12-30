<template>
    <div class="outbox"  :style="{height:(historyHeight-3)+'px'}">
       <div class="titlebox">
           <div class="line"></div>
           <div class="linefont">
             <div>历史调度方案列表</div>
             <div id="listnumfont">列表总数：{{list.length}}</div>
           </div>
       </div>
       <div class="gdtlistbox" :style="{height:historylistHeight+'px'}">
              <div class="gdtlistboxin">
                  <div class="inbox" v-for="(item,i) in list" :key="i">
                    <!-- 第一部分 -->
                        <div class="contentbox1" :id="i" :class="{'active': index == i}">
                                <div class="gdbox" @click="showdetaildata(i)" >
                                        <div class="gdbox1 gdboxs">
                                            <div class="scolor">{{titlelist[radionindex].date}}</div>
                                            <div class="sblod">{{list[i].SchemeDate}}{{list[i].HolidayName=""?"":list[i].HolidayName}}</div>
                                        </div>
                                         <div class="gdbox2 gdboxs">
                                             <div class="scolor">{{titlelist[radionindex].water}}</div>
                                             <div class="sblod">{{list[i].TotalWaterSupply}}</div>
                                         </div>
                                          <div class="gdbox3 gdboxs">
                                              <div class="scolor">{{titlelist[radionindex].lowpresure}}</div>
                                               <div class="sblod">{{list[i].MinPressure}}</div>
                                          </div>
                                          <div class="gdbox4 gdboxs">
                                              <div class="scolor">{{titlelist[radionindex].tataldh}}</div>
                                               <div class="sblod">{{list[i].TotalUnitConsumption}}</div>
                                          </div>
                                </div>


                        </div>
            </div>
              </div>
       </div>
    </div>
</template>
<script>
import Bus from "@/bus.js";
import urlClass from "@/components/js/UrlClass";
export default {
  name: "Historylist",
  data() {
    return {
      /* i:-1, */
      titlelist:[
        {date:"日期",water:"总供水量(万m3/d)",lowpresure:"管网最低压力(MPa)",tataldh:"总单耗(kwh/km³·Mpa)"},
        {date:"时间",water:"供水量(m3/h)",lowpresure:"管网最低压力(MPa)",tataldh:"单耗(kwh/km³·Mpa)"}
      ],
      historylistHeight: 0,
     historyHeight:0,
      list: [
       /*  { data: "2018.07.06", w: 168.2, p: 0.21 },
        { data: "2018.08.05", w: 167.9, p: 0.22 },
        { data: "2018.08.16", w: 168.6, p: 0.24 },
        { data: "2018.08.26", w: 168.7, p: 0.21 },
        { data: "2018.09.06", w: 167.6, p: 0.23 },
        { data: "2018.09.13", w: 168.3, p: 0.21 },
        { data: "2018.10.03", w: 12465, p: 45654 },
        { data: "2018.10.06", w: 12465, p: 45654 },
        { data: "2018.10.06", w: 12465, p: 45654 },
        { data: "2018.10.06", w: 12465, p: 45654 },
        { data: "2018.10.06", w: 12465, p: 45654 },
        { data: "2018.10.06", w: 12465, p: 45654 },
        { data: "2018.10.06", w: 12465, p: 45654 },
        { data: "2018.10.06", w: 12465, p: 45654 },
        { data: "2018.10.06", w: 12465, p: 45654 },
        { data: "2018.10.06", w: 12465, p: 45654 },
        { data: "2018.10.06", w: 12465, p: 45654 },
        { data: "2018.10.06", w: 12465, p: 45654 },
        { data: "2018.10.06", w: 12465, p: 45654 },
        { data: "2018.10.06", w: 12465, p: 45654 } */
      ],
      radionindex:0,
      fanganlibiaosuoyindata:0,
      prelistdata:{},
      prelistshushicsdata:{},
      index:0
    };
  },
  mounted() {
    this.historylistHeight = document.documentElement.clientHeight - 289;
     this.historyHeight = document.documentElement.clientHeight - 246;
    var that = this;
    window.onresize = function() {
      that.historylistHeight = document.documentElement.clientHeight - 289;
      that.historyHeight = document.documentElement.clientHeight - 246;
    };
     Bus.$on("info6", e => {
      that.list = e.SchemeList; 
    });
     Bus.$on("radionumdata", e => {
      that.radionindex= e; 　
    });
     Bus.$on("fanganlibiaosuoyin", e => {
      that.fanganlibiaosuoyindata= e; 　
    });
  },
  methods:{
    showdetaildata(listnowindex){
       this.index = listnowindex
       Bus.$emit("historytoshuichangtab",0);
     /*  alert(listnowindex);
      console.log(this.list)
      console.log(this.list[listnowindex]) */
      var TotalWaterSupply = this.list[listnowindex].TotalWaterSupply;
      var WaterworksNo="笔架山水厂";
      var SchemeDate=this.list[listnowindex].SchemeDate;
      var prelistd={TotalWaterSupply,SchemeDate}
     this.prelistdata=prelistd;
     var prelistdatatotablist={WaterworksNo,SchemeDate};
     Bus.$emit("prelistdatatotablistfun", prelistdatatotablist);
     Bus.$emit("historytotable", SchemeDate);
     this.prelistshushicsdata=prelistdatatotablist;
      /* console.log(this.prelistdata) */
      this.ec4()
      this.ec5()
      this.ec16(this.ec15(this.ec14(this.ec13(this.ec12(this.ec11())))))
      this.ec7()
    },
     ec4() {
      var _this = this;
      _this.$axios
        .post(urlClass.axiosUrYA + "GetPressurePoint", JSON.stringify(_this.prelistdata), {
          headers: { "Content-Type": "application/json;" }
        })
        .then(res => {
          var _this = this;
          console.log(res)
          Bus.$emit("info4", res.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
     ec5() {
      var _this = this;
      _this.$axios
        .post(urlClass.axiosUrYA + "GetTotalNumber", JSON.stringify(_this.prelistdata), {
          headers: { "Content-Type": "application/json;" }
        })
        .then(res => {
          var _this = this;
          console.log(res)
          Bus.$emit("info5", res.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
       ec11() {
      var _this = this;
      _this.$axios
        .post(urlClass.axiosUrYA + "GetWaterquantity", JSON.stringify(_this.prelistshushicsdata), {
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
        .post(urlClass.axiosUrYA + "GetOutPressure", JSON.stringify(_this.prelistshushicsdata), {
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
        .post(urlClass.axiosUrYA + "GetWaterPoolLevel", JSON.stringify(_this.prelistshushicsdata), {
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
        .post(urlClass.axiosUrYA + "GetWaterUnitConsumption", JSON.stringify(_this.prelistshushicsdata), {
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
        .post(urlClass.axiosUrYA + "GetWaterTotalEfficiency", JSON.stringify(_this.prelistshushicsdata), {
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
        .post(urlClass.axiosUrYA + "GetWaterPump", JSON.stringify(_this.prelistshushicsdata), {
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
     ec7() {
      var _this = this;
     /*  alert("执行了ec7")
      console.log(_this.diaodulisttablecansu) */
      _this.$axios
        .post(urlClass.axiosUrYA + "ManagementDispatch", JSON.stringify(_this.prelistshushicsdata), {
          headers: { "Content-Type": "application/json;" }
        })
        .then(res => {
          var _this = this;
         /*  alert("ec7")
          console.log(res) */
          Bus.$emit("info7", res.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
  }
};
</script>
<style lang="scss" scoped>
.outbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
/*   height: 100%; */
  width: 285px;
}
.titlebox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  height: 41px;
  width: 285px;
  color: #6e7b8b;
  font-family: "微软雅黑";
  font-size: 14px;
  font-weight: bold;
  line-height: 41px;
  border-bottom: 1px #e4e4ec solid;
}
.line {
  height: 40px;
  width: 4px;
  background-color: #70991f;
}
.linefont {
   display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
  margin-left: 10px;
   height: 41px;
   width: 261px;
     line-height: 41px;
}
#listnumfont{
    color: #6e7b8b;
  font-family: "微软雅黑";
  font-size: 12px;
}
.gdtlistbox {
  width: 285px;
  /*  height: 643px; */
/*   height: 66.35706914vh; */
  overflow: auto;
  /* background-color: brown */
}
.gdtlistboxin{
  height: 100%;
}
.inbox {
  width: 100%;
 /*  height: 100%; */
}
.gdtlistbox::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 3px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.gdtlistbox::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
}

.gdtlistbox::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
 /*  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2); */
  border-radius: 10px;
  background: #fff;
}
.contentbox1 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  height: 109px;
  width: 100%;
  border-bottom: 1px #e4e4ec solid;
}

.contentbox1:hover {
  background-color: #f0f0f1;
}

.gdbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-start;
  height: 109px;
  width: 285px;
  margin-left: 20px;
  cursor: pointer;
}
.gdboxs {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 245px;
}
.gdbox1 {
  margin-bottom: 5px;
}
.gdbox2 {
  margin-bottom: 5px;
}
.gdbox3 {
/*   margin-top: 5px; */
}
.gdbox4 {
  margin-top: 5px;
}
.scolor {
  font-family: "微软雅黑";
  font-size: 12px;
  color: #acb3ba;
}
.sblod {
/*   font-weight: bold; */
 /*  margin-right: -10px; */

}
.active{
  background-color: #f0f0f1;
}
</style>


