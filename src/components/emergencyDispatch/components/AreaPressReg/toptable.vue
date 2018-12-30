<template>
     <div class="outbox">
        <div class="tabletitleoutbox">
            <div class="tabletitleinboxleft">水厂名称</div>
            <div class="tabletitleinboxmiddle">
                <div class="parametername1 parametername">出厂压力</div>
                <div class="parametername2 parametername">出厂流量</div>
                <div class="parametername3 parametername">清水池水位</div>
            </div>
            <div class="tabletitleinboxright">
                <div class="pumpnum1 pumpnum">1#</div>
                <div class="pumpnum2 pumpnum">2#</div>
                 <div class="pumpnum3 pumpnum">3#</div>
                <div class="pumpnum4 pumpnum">4#</div>
                <div class="pumpnum5 pumpnum">5#</div>
                <div class="pumpnum6 pumpnum">6#</div>
                 <div class="pumpnum7 pumpnum">7#</div>
                <div class="pumpnum8 pumpnum">8#</div>
            </div>
        </div>
        <div class="tableoutbox">
            <div class="tablelineoutbox" v-for="(item,index) in CurrentData" :key="index.id">
                <div class="tableprelineinboxleft"><div class="tableprelineinboxleftcontent" 
                :class="CurrentData[index].PumpList[index].Speed==ForecastData[index].PumpList[index].Speed&&CurrentData[index].PumpList[index].OpenCloseType==ForecastData[index].PumpList[index].OpenCloseType?'':'colorshowname'"
                >{{CurrentData[index].WaterworksName}}</div></div>
                <div class="tableprelineinboxright">
                    <div class="tableprelineinboxrighttop">
                        <div class="tableprelineinboxrighttop1">当前</div>
                        <div class="tableprelineinboxrighttop2">
                            <div class="outpresure">{{CurrentData[index].OutPressure}}</div>
                            <div class="outflow">{{CurrentData[index].OutFlow}}</div>
                            <div class="clear">{{CurrentData[index].ClearWaterLevel}}</div>
                        </div>
                        <div class="tableprelineinboxrighttop3">
                            <div class="celloutbox" v-for="(iteml,indexl) in CurrentData[index].PumpList" :key="indexl.id"
                            :class="iteml.OpenCloseType==1? 'one' :(iteml.OpenCloseType==2? 'two' :(iteml.OpenCloseType==3? 'three' :(iteml.OpenCloseType==4? 'four' :'')))">{{CurrentData[index].PumpList[indexl].Speed}}</div>
                        </div>
                    </div>
                    <div class="tableprelineinboxrightdown">
                        <div class="tableprelineinboxrightdown1">调度</div>
                        <div class="tableprelineinboxrightdown2">
                            <div class="dispatchoutpresure" :class="CurrentData[index].PumpList[index].Speed==ForecastData[index].PumpList[index].Speed&&CurrentData[index].PumpList[index].OpenCloseType==ForecastData[index].PumpList[index].OpenCloseType?'':'colorshow'">{{ForecastData[index].OutPressure}}</div>
                            <div class="dispatchoutflow" :class="CurrentData[index].PumpList[index].Speed==ForecastData[index].PumpList[index].Speed&&CurrentData[index].PumpList[index].OpenCloseType==ForecastData[index].PumpList[index].OpenCloseType?'':'colorshow'">{{ForecastData[index].OutFlow}}</div>
                            <div class="dispatchclear" :class="CurrentData[index].PumpList[index].Speed==ForecastData[index].PumpList[index].Speed&&CurrentData[index].PumpList[index].OpenCloseType==ForecastData[index].PumpList[index].OpenCloseType?'':'colorshow'">{{ForecastData[index].ClearWaterLevel}}</div>
                        </div>
                        <div class="tableprelineinboxrightdown3">
                             <div class="dispatchcelloutbox" v-for="(itemld,indexl) in ForecastData[index].PumpList" :key="indexl.id" 
                             :class="(CurrentData[index].PumpList[indexl].Speed!=itemld.Speed&&itemld.OpenCloseType==1)?'oned':(((CurrentData[index].PumpList[indexl].Speed!=itemld.Speed&&itemld.OpenCloseType==2))?'twod':
                             ((CurrentData[index].PumpList[indexl].Speed!=itemld.Speed&&itemld.OpenCloseType==3)?'threed':((CurrentData[index].PumpList[indexl].Speed!=itemld.Speed&&itemld.OpenCloseType==4)?'fourd':
                             ((CurrentData[index].PumpList[indexl].Speed==itemld.Speed&&itemld.OpenCloseType==1)?'one':((CurrentData[index].PumpList[indexl].Speed==itemld.Speed&&itemld.OpenCloseType==2)?'two':
                             ((CurrentData[index].PumpList[indexl].Speed==itemld.Speed&&itemld.OpenCloseType==3)?'three':(CurrentData[index].PumpList[indexl].Speed==itemld.Speed&&itemld.OpenCloseType==4)?'four':''))))))"
                             >{{ForecastData[index].PumpList[indexl].Speed}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import urlClass from '@/components/js/UrlClass';
import WindowsEvent from '@/components/js/WindowsEvent';
import mainClass from '@/components/js/MainClass';
import axios from "axios";
import Bus from "@/bus.js";
export default {
  name: "TopTable",
  data() {
    return {
     CurrentData:"",
     ForecastData:"",
     tableName:'',
    };
  },
  methods:{
    
    myEventListener: function(event) {
        var typeTemp = event.detail.type;
        var dataTemp = event.detail.data;
        if(typeTemp=="SchedulePressureCal"){
            let self = this
           self.$axios.post(
              urlClass.axiosUrlYJ + "DispatchCALC",
              JSON.stringify(dataTemp),
              {
                headers: { "Content-Type": "application/json;" }
              }).then(R=>{

                console.log(R)
                self.ForecastData = R.data.Data
                self.EmergencyDispatchCalculateCompare(R.data.Data);

            })
        }
        },
         EmergencyDispatchCalculateCompare(DispatchCALCReturn){
        var planList = new Array();
        for(var i=0;i<DispatchCALCReturn.length;i++){
            var obj = DispatchCALCReturn[i];
            var level = obj.OutPressure;
            level *= 100;
            var objTemp = {ElementId:obj.ID,Level:level,LayerId:4};
            planList.push(objTemp);
        }
       /*  for(var i=0;i<2;i++){
            var objTemp = {ElementId:i,Level:25,LayerId:4};
            planList.push(objTemp);
        } */
        if(this.tableName=="")
        {
             this.tableName = mainClass.GetRanLetterString(4);
        }
        var paramMeter = {Time:(new Date()).getHours(),PlanList:planList,Tf:1,TableName:this.tableName,IsSave:true};
        let self = this;
        console.log("应急调度调压计算后的模拟计算")
        console.log(JSON.stringify(paramMeter))
        this.$axios.post(
            urlClass.axiosUrl + "EmergencyDispatchCalculateCompare",
            JSON.stringify(paramMeter),
            {
            headers: { "Content-Type": "application/json;" }
            }).then(R=>{
            var result = R.data;
            var object = new Object();
            object.NodePressure = result.NodePressure;
            object.min = result.MinFlow;
            object.max = result.MaxFlow;
            object.allData = result.PipeFlow;
            object.DownHeadMax = result.DownHeadMax;
            object.minP = result.MinPressure;
            object.maxP = result.MaxPressure;
            object.TableName = this.tableName;
            object.minV = result.MinStrength;
            object.maxV = result.MaxStrength;
            object.strengthData = result.PipeStrength;
            WindowsEvent.MyDispatchEvent("PipeBurstDraw", object);
        })
    },
  },
  mounted() {
   let self = this;
    Bus.$on("indexCurrent", e => {
      self.CurrentData = e; /* 　console.log(`传来的数据是：${e}`) */
      console.log(`传来的数据是：${e}`)
    });
     Bus.$on("indexForecast", e => {
      self.ForecastData = e; 
    });
    window.addEventListener("event_name", this.myEventListener);
  },

};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
  <style lang="scss" scoped>
.outbox {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  width: 790px;
  height: 324px;
}
.tabletitleoutbox {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 790px;
  height: 24px;
  background-color: #212e44;
}
.tableoutbox {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  width: 790px;
  height: 300px;
  background-color: #384e6c;
  .tablelineoutbox {
    &:nth-child(odd) {
      .tableprelineinboxleft {
        background: #495865;
        color: #dde7f0;
        font: 12px "微软雅黑";
        width: 72px;
        height: 42px;
        border-radius: 2px;
      }
      .tableprelineinboxright {
        .tableprelineinboxrighttop {
          background: #495865;
          color: #dde7f0;
          font: 12px "微软雅黑";
        }
        .tableprelineinboxrightdown {
          background: #495865;
          color: #dde7f0;
          font: 12px "微软雅黑";
        }
      }
    }
    &:nth-child(even) {
      .tableprelineinboxleft {
        background: #15202a;
        color: #dde7f0;
        font: 12px "微软雅黑";
        width: 72px;
        height: 42px;
        border-radius: 2px;
      }
      .tableprelineinboxright {
        .tableprelineinboxrighttop {
          background: #15202a;
          color: #dde7f0;
          font: 12px "微软雅黑";
        }
        .tableprelineinboxrightdown {
          background: #15202a;
          color: #dde7f0;
          font: 12px "微软雅黑";
        }
      }
    }
  }
}
.tabletitleinboxleft {
  margin-left: 10px;
  margin-right: 50px;
  color: #dde7f0;
  font: 12px "微软雅黑";
  width: 57px
}
.tabletitleinboxmiddle {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.parametername {
  margin-right: 24px;
  color: #dde7f0;
  font: 12px "微软雅黑";
}
.tabletitleinboxright {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-left: 9px;
}
.pumpnum {
  margin-right: 39px;
  color: #dde7f0;
  font: 12px "微软雅黑";
}
.tablelineoutbox {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 48px;
  width: 790px;
  margin-top: 2px;
  background-color: #222f44;
}
.tableprelineinboxleft {
  width: 72px;
  height: 42px;
}
.tableprelineinboxleftcontent {
  line-height: 42px;
  margin-left: 2px;
}
.tableprelineinboxright {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 722px;
  height: 42px;
  margin-left: 2px;
}
.tableprelineinboxrighttop {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 722px;
  height: 20px;
  margin-bottom: 1px;
}
.tableprelineinboxrighttop1 {
  width: 26px;
  margin-left: 7px;
}
.tableprelineinboxrighttop2 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 200px;
  margin-left: 0px;
}
.outpresure {
  width: 55px;
  text-align: start;
  margin-left: 10px;
}
.outflow {
  width: 55px;
  text-align: start;
}
.clear {
  width: 45px;
  text-align: start;
}
.tableprelineinboxrighttop3 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 436px;
  margin-left: 30px;
}
.celloutbox {
  width: 40px;
  height: 16px;
  border: 1px #1a212b solid;
  border-radius: 2px;
  margin-right: 13px;
  color: #202833;
  line-height: 16px;
  text-align: center;
}
.tableprelineinboxrightdown {
  width: 722px;
  height: 20px;
  margin-top: 1px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.tableprelineinboxrightdown1 {
  width: 26px;
  margin-left: 7px;
}
.tableprelineinboxrightdown2 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 200px;
  margin-left: 0px;
}
.dispatchoutpresure {
  width: 55px;
  text-align: start;
  margin-left: 10px
}
.dispatchoutflow {
  width: 55px;
  text-align: start;
}
.dispatchclear {
  width: 45px;
  text-align: start;
}
.tableprelineinboxrightdown3 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 436px;
  margin-left: 30px;
}
.dispatchcelloutbox {
  width: 40px;
  height: 16px;
  border: 1px #1a212b solid;
  border-radius: 2px;
  margin-right: 13px;
  color: #202833;
  line-height: 16px;
  text-align: center;
  background: #495865;
}
.one {
  /* background-image: url("~@/assets/img/off.png"); */
  background-repeat: no-repeat;
  background-position: 0px 0px;
  background-color: #414d5e;
}
.two {
  background-image: url("~@/assets/img/异常.png");
  background-repeat: no-repeat;
  background-position: 11px 2px;
  background-color: red;
}
.three {
  background-color: #5e801c;
}
.four {
 /*  background-image: url("~@/assets/img/on.png"); */
  background-repeat: no-repeat;
  background-position: 0px 0px;
  background-color: #5e801c;
}
.colorshow {
  background-color: #abe931;
  padding-left: 2px;
  border-radius: 2px;
  color: #202833;
}
.colorshowname {
  background-color: #d56459;
  padding-left: 2px;
  border-radius: 2px;
}
.oned {
 /*  background-image: url("~@/assets/img/off.png"); */
  background-repeat: no-repeat;
  background-position: 0px 0px;
  background-color: #a2b5cf;
}
.twod {
  background-image: url("~@/assets/img/异常.png");
  background-repeat: no-repeat;
  background-position: 11px 2px;
  background-color: red;
}
.threed {
  background-color: #abe931;
}
.fourd {
  /* background-image: url("~@/assets/img/on.png"); */
  background-repeat: no-repeat;
  background-position: 0px 0px;
  background-color: #abe931;
}
</style>
