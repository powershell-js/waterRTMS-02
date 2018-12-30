<template>
    <div class="outbox" :style="{height:(listoutboxHeight-95-80-35-130)+'px'}">
        <div class="tableoutbox" :style="{height:(listoutboxHeight-95-110-100-35)+'px'}">
                  <div class="inbox1">
                    <div style=" width:11%;height:30px;background-color:#ededef;line-height:30px;text-align:start;margin-left:5px">水厂名称</div>
                    <div style=" width:11%;height:30px;line-height:30px;text-align:start;margin-left:5px">出厂压力</div>
                    <div style=" width:11%;height:30px;line-height:30px;text-align:start;margin-left:5px">出厂流量</div>
                    <div style=" width:11%;height:30px;line-height:30px;text-align:start;margin-left:5px">清水池水位</div>
                    <div style=" width:7%;height:30px;line-height:30px;text-align:start;margin-left:5px">1#</div>
                    <div style=" width:7%;height:30px;line-height:30px;text-align:start;margin-left:5px">2#</div>
                    <div style=" width:7%;height:30px;line-height:30px;text-align:start;margin-left:5px">3#</div>
                    <div style=" width:7%;height:30px;line-height:30px;text-align:start;margin-left:5px">4#</div>
                    <div style=" width:7%;height:30px;line-height:30px;text-align:start;margin-left:5px">5#</div>
                    <div style=" width:7%;height:30px;line-height:30px;text-align:start;margin-left:5px">6#</div>
                    <div style=" width:7%;height:30px;line-height:30px;text-align:start;margin-left:5px">7#</div>
                    <div style=" width:7%;height:30px;line-height:30px;text-align:start;margin-left:5px">8#</div>
                </div>
                <div class="inbox2" v-for="(item,index) in stu" :key="index" style="border-bottom:1px solid #ededed;">  
                    <div style="display:flex;flex-direction:row;">
                      <div style="color:#000;width:165px;height:40px;line-height:40px;text-align:start;font-size:12px;margin-left:5px">{{item.WaterworksName}}</div>
                      <div style="color:#000;width:165px;height:40px;line-height:40px;text-align:start;font-size:12px;margin-left:5px">{{item.OutPressure}}</div>
                      <div style="color:#000;width:165px;height:40px;line-height:40px;text-align:start;font-size:12px;margin-left:5px">{{item.OutFlow}}</div>
                      <div style="color:#000;width:125px;height:40px;line-height:40px;text-align:start;font-size:12px;margin-left:5px">{{item.ClearWaterLevel}}</div>
                      <div class="bgbox" v-for="(items,indexs) in item.PumpList" :key="indexs" :class="stu[index].PumpList[indexs].OpenCloseType==1? 'nowclose' :(stu[index].PumpList[indexs].OpenCloseType==2? 'nowmissingdata' :(stu[index].PumpList[indexs].OpenCloseType==3? 'nowopen' :(stu[index].PumpList[indexs].OpenCloseType==4? 'nowopendingbeng' :'')))">{{items.Speed}}</div>
                    </div>
              </div>
        </div>
    </div>
</template>
<script>
import Bus from "@/bus.js";
export default {
      name:"waterdispatchingtable",
     data() {
    return {
      listoutboxHeight:0,
      stu: [],

    };
  },
  mounted() {
    this.listoutboxHeight = document.documentElement.clientHeight - 344;
    var that = this;
    window.onresize = function() {
      that.listoutboxHeight = document.documentElement.clientHeight - 344; 
    };
    Bus.$on("info7", e => {
       var that = this;
      that.stu = e.Data; /* 　console.log(`传来的数据是：${e}`) */
    });
  }
}
</script>
<style>
   
</style>
<style lang="scss" scoped>
.outbox{
    width: 100%;
    margin-top: 10px
   /*  background-color: brown */
}
.tableoutbox{
   width: -moz-calc(100% - 35px);
  width: -webkit-calc(100% - 35px);
  width: calc(100% - 35px);
  margin-left: 10px;
  min-width: 1580px;
}
.inbox1{
   /* width: 1000px; */
    display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-start;
  background-color:#ededef;
  font-size:12px;
  
}
.bgbox{
    height:30px;
    line-height:30px;
    width:105px;
    border-left:1px solid #ededed;
    text-align:center;
    font-size:12px;
    margin-left:5px;
        margin-top: 5px;
}
.nowmissingdata {
     height:30px;
    line-height:30px;
    width:105px;
   text-align: center;
      background-color: red;
}
.nowclose {
     height:30px;
    line-height:30px;
    width:105px;
   text-align: center;
  background-color: #b81616;

}
.nowopen {
     height:30px;
    line-height:30px;
    width:105px;
   text-align: center;
  background-color: #abe931;
 
}
.nowopendingbeng {
     height:30px;
    line-height:30px;
    width:105px;
  background-color: #abe931;
text-align: center;
}

</style>





