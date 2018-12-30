<template>
  <div class="hello">
         <div class="outbox">
        <div class="inbox1">
            <div style=" width:3%;height:20px;background-color:#ededef;line-height:20px;text-align:center">电价</div>
            <div style=" width:27%;height:20px;background-color:#4a76a8;line-height:20px;text-align:center"><!-- 1 --></div>
            <div style=" width:50%;height:20px;background-color:#da5abd;line-height:20px;text-align:center"><!-- 2 --></div>
            <div style=" width:20%;height:20px;background-color:#4a76a8;line-height:20px;text-align:center"><!-- 3 --></div>
        </div>
        <div class="inbox2" v-for="(item,index) in stu" :key="index" style="border-bottom:1px solid #ededed;">  
            <div style="display:flex;flex-direction:row;">
              <div style="color:#000;background:#ededef;width:46px;height:30px;line-height:30px;text-align:center">{{index+1}}#</div>
              <div class="bgbox" style="height:30px;line-height:30px;width:5%;border-left:1px solid #ededed;text-align:center"  v-for="(items,indexs) in item.PumpList" :key="indexs"
              :class="items.OpenCloseType==5? 'nowclose' :(items.OpenCloseType==6? 'nowmissingdata' :(items.OpenCloseType==7? 'nowopen' :(items.OpenCloseType==8? 'nowopendingbeng' :'')))">{{items.Speed}}</div>
            </div>
      </div>
    </div>
    </div>
</template>
<script>
import qs from "qs";
import Bus from "@/bus.js";
import urlClass from "@/components/js/UrlClass";
export default {
  name: "ListTable",
  data() {
    return {
      stu: [],
    };
  },
  mounted() {
    var _this = this;
     Bus.$on("info16", e => {
      _this.stu = e.PumpData; /* 　console.log(`传来的数据是：${e}`) */
    });
  },

};
</script>
<style scoped>
.outbox{

  width: 1334px;
  height: 100%;

}
.inbox1{
   width: 1334px;
    display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-start;
}
.nowmissingdata {
      /* background-color: red; */
    background-color: #f0f0f1;
    background-image: url("~@/assets/img/kong_01.png");
background-repeat: no-repeat;
background-position: 8px 4px;
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
