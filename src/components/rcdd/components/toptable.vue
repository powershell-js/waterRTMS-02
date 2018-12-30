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
import urlClass from "@/components/js/UrlClass";
import axios from "axios";
import Bus from "@/bus.js";
export default {
  name: "TopTable",
  data() {
    return {
      CurrentData: "",
      ForecastData: ""
    };
  },
  mounted() {
    var _this = this;
    _this.restotable();
    this.setin = setInterval(function() {
      _this.restotable();
    }, 60000);
  },
  methods: {
    restotable() {
      var _this = this;
      _this.$axios
        .post(urlClass.axiosUrlRC + "GetWaterworks")
        .then(res => {
          _this.CurrentData = res.data.CurrentData;
          _this.ForecastData = res.data.ForecastData;
          var outflow = parseFloat(
            res.data.CurrentData[0].OutFlow +
              res.data.CurrentData[1].OutFlow +
              res.data.CurrentData[2].OutFlow +
              res.data.CurrentData[3].OutFlow +
              res.data.CurrentData[4].OutFlow +
              res.data.CurrentData[5].OutFlow
          ).toFixed(2);
          var ForecastDataoutflow = parseFloat(
            res.data.ForecastData[0].OutFlow +
              res.data.ForecastData[1].OutFlow +
              res.data.ForecastData[2].OutFlow +
              res.data.ForecastData[3].OutFlow +
              res.data.ForecastData[4].OutFlow +
              res.data.ForecastData[5].OutFlow
          ).toFixed(2);
var percentnum=parseInt(((ForecastDataoutflow-outflow)/ForecastDataoutflow)*100);

          Bus.$emit("toptabledjs", res.data);
          Bus.$emit("outFlow", outflow);
          Bus.$emit("ForecastDataoutflow", ForecastDataoutflow);
           Bus.$emit("percentnumdata", percentnum);
         var resmin=res.data.Minutes;
         var newscon=new Date().getHours()*3600+new Date().getMinutes()*60+new Date().getSeconds();
         var totalsecon=newscon+resmin*60
         var h = parseInt((totalsecon / 60 / 60)); 
        var m = parseInt(((totalsecon-h*3600) / 60)); 
        var s = parseInt(totalsecon-h*3600-m*60); 
        var padDate = function(value) {
        return value < 10 ? "0" + value : value;
      };
      var hours = padDate(h);
      var minutes = padDate(m);
      var seconds = padDate(s);
      var djstime=hours + ":" + minutes + ":" + seconds;
      Bus.$emit("djstimeapi", djstime);
      console.log(djstime);
 
          
        })
        .catch(error => {
          console.log(error.data);
        });
    }
  },
  beforeDestroy: function() {
    if (this.setin) {
      clearInterval(this.setin); //在Vue实例销毁前，清除我们的定时器
    }
  }
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
  width: 842px;
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
  width: 842px;
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
  width: 842px;
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
  margin-right: 68px;
  color: #dde7f0;
  font: 12px "微软雅黑";
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
  margin-left: 28px;
}
.pumpnum {
  margin-right: 42px;
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
  width: 842px;
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
  width: 762px;
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
  width: 762px;
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
  margin-left: 16px;
}
.outpresure {
  width: 50px;
  text-align: start;
}
.outflow {
  width: 50px;
  text-align: start;
}
.clear {
  width: 50px;
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
  width: 476px;
  margin-left: 42px;
}
.celloutbox {
  width: 40px;
  height: 16px;
  border: 1px #1a212b solid;
  border-radius: 2px;
  margin-right: 16px;
  color: #202833;
  line-height: 16px;
  text-align: center;
}
.tableprelineinboxrightdown {
  width: 762px;
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
  margin-left: 16px;
}
.dispatchoutpresure {
  width: 50px;
  text-align: start;
}
.dispatchoutflow {
  width: 50px;
  text-align: start;
}
.dispatchclear {
  width: 50px;
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
  width: 476px;
  margin-left: 42px;
}
.dispatchcelloutbox {
  width: 40px;
  height: 16px;
  border: 1px #1a212b solid;
  border-radius: 2px;
  margin-right: 16px;
  color: #202833;
  line-height: 16px;
  text-align: center;
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
