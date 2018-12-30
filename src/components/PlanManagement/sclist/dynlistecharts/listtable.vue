<template>
   <div class="hello">
        <div>{{apilist61data}}</div>
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
              :class="items.OpenCloseType==1? 'one' :(items.OpenCloseType==2? 'two' :(items.OpenCloseType==3? 'three' :(items.OpenCloseType==4? 'four' :(items.OpenCloseType==5? 'five' :(items.OpenCloseType==6? 'six' :(items.OpenCloseType==7? 'seven' :(items.OpenCloseType==8? 'eight' :'')))))))">{{items.Speed}}</div>
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
  created() {
     var _this = this;
    this.table1()
  },
  mounted() {
    var _this = this;
    this.table1()
  },
methods:{
  table1(){
    var SchemeNo= "2";
       var WaterworksNo = "大涌南水厂";
    var object = {SchemeNo,WaterworksNo};
    var _this = this;
    this.$axios
      .post(
        urlClass.axiosUrYA+"GetWaterPump",
        JSON.stringify(object),
         {headers: {'Content-Type':'application/json;'}}
      )
      .then(res => {
        var _this = this;
        var bjslistshow=res.data
         _this.stu =res.data.PumpData;
         Bus.$emit('msg3p3', bjslistshow)
      })
      .catch(error => {
        console.log(error);
      });
  }
}
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
/* .bgbox{
  background-image: url("~@/assets/img/斜纹_红.png");
  background-repeat: no-repeat;
background-size: 100%;
background-position: center
} */
.one {
background-image: url("~@/assets/img/斜纹_红.png");
  margin-top: 2px;
  margin-bottom: -2px;
}
.two {
   background-image: url("~@/assets/img/斜纹_透明.png");
    background-color: #f0f0f1;
  margin-top: 2px;
  margin-bottom: -2px;
}
.three {
  background-image: url("~@/assets/img/斜纹_绿.png");
  margin-top: 2px;
  margin-bottom: -2px;
}
.four {
   background-image: url("~@/assets/img/斜纹_绿.png");
  margin-top: 2px;
  margin-bottom: -2px;
}
.five {
    background-color: red;
  margin-top: 2px;
  margin-bottom: -2px;
}
.six {
  background-color: #f0f0f1;
  margin-top: 2px;
  margin-bottom: -2px;
}
.seven {
  background-color: #abe931;
  margin-top: 2px;
  margin-bottom: -2px;
}
.eight {
  background-color: #abe931;
  margin-top: 2px;
  margin-bottom: -2px;
}
</style>
