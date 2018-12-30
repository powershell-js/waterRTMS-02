<template>
   <div class="hello">
         <div class="outbox">
        <div class="inbox1">
            <div style=" width:3%;height:20px;background-color:#ededef;line-height:20px;text-align:center">电价</div>
            <div style=" width:27%;height:20px;background-color:#4a76a8;line-height:20px"><!-- 1 --></div>
            <div style=" width:50%;height:20px;background-color:#da5abd;line-height:20px"><!-- 2 --></div>
            <div style=" width:20%;height:20px;background-color:#4a76a8;line-height:20px"><!-- 3 --></div>
        </div>
        <div class="inbox2" v-for="(item,index) in GetWaterPumpmes" :key="index" style="border-bottom:1px solid #ededed;">  
            <div style="display:flex;flex-direction:row;">
              <div style="color:#000;background:#ededef;width:32px;height:30px;line-height:30px;text-align:center">{{index+1}}#</div>
              <div class="bgbox" style="height:30px;line-height:30px;width:5%;border-left:1px solid #ededed;text-align:center"  v-for="(items,indexs) in item.PumpList" :key="indexs"
              :class="items.OpenCloseType==1? 'historyclose' :(items.OpenCloseType==2? 'historymissingdata' :(items.OpenCloseType==3? 'historyopen' :(items.OpenCloseType==4? 'historyopendingbeng' :(items.OpenCloseType==5? 'nowclose' :(items.OpenCloseType==6? 'nowmissingdata' :(items.OpenCloseType==7? 'nowopen' :(items.OpenCloseType==8? 'nowopendingbeng' :'')))))))">{{items.Speed}}</div>
            </div>
      </div>
    </div>
    </div>
</template>
<script>
import Bus from "@/bus.js";
export default {
  name: "ListTable",
  data() {
    return {
      stu: [],
      GetWaterPumpmes:""
    };
  },
  mounted() {
    let that = this;
     Bus.$on("GetWaterPump1", e => {
      that.GetWaterPumpmes = e; 
    });
  },
};
</script>
<style scoped>
.outbox{
  width: 868px;
  height: 100%;
}
.inbox1{
   width: 868px;
    display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-start;
}
/* .bgbox{
  background-image: url("~@/assets/img/斜纹_红.png");
  background-repeat: no-repeat;
background-size: 100%;
background-position: center
} */
.historymissingdata {
/* background-image: url("~@/assets/img/斜纹_红.png"); */
background-image: url("~@/assets/img/kong_02.png");
background-repeat: no-repeat;
background-position: -2px 4px;
background-color: #f0f0f1;
  margin-top: 2px;
  margin-bottom: -2px;
}
.historyclose {
   background-image: url("~@/assets/img/斜纹_透明.png");
    background-color: #b81616;
  margin-top: 2px;
  margin-bottom: -2px;
}
.historyopen {
  background-image: url("~@/assets/img/斜纹_绿.png");
  margin-top: 2px;
  margin-bottom: -2px;
}
.historyopendingbeng {
   background-image: url("~@/assets/img/斜纹_绿.png");
  margin-top: 2px;
  margin-bottom: -2px;
}
.nowmissingdata {
      /* background-color: red; */
    background-color: #f0f0f1;
    background-image: url("~@/assets/img/kong_01.png");
background-repeat: no-repeat;
background-position: -2px 4px;
background-color: #f0f0f1;
  margin-top: 2px;
  margin-bottom: -2px;
}
.nowclose {
  background-color: #b81616;
  margin-top: 2px;
  margin-bottom: -2px;
}
.nowopen {
  background-color: #abe931;
  margin-top: 2px;
  margin-bottom: -2px;
}
.nowopendingbeng {
  background-color: #abe931;
  margin-top: 2px;
  margin-bottom: -2px;
}
</style>
