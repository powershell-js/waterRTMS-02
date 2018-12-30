<template>
  <div class="hello">
    <div class="mnplayer">
      <span>模拟播放</span>
    </div>
    <div class="outbox">
     <div class="bgbox">
       <div class="kdnumbox">
         <div>{{initData.sliderLabelArray[0]}}</div>
         <div>{{initData.sliderLabelArray[1]}}</div>
         <div>{{initData.sliderLabelArray[2]}}</div>
         <div>{{initData.sliderLabelArray[3]}}</div>
         <div>{{initData.sliderLabelArray[4]}}</div>
         <div>{{initData.sliderLabelArray[5]}}</div>
       </div>
        <div class="inbox">
        <div class="block">
          <el-slider :min="0" :max="initData.passTime" :step="initData.step" v-model="initData.sliderValue" v-on:change="sliderChange"></el-slider>
        </div>
     </div>
      </div>
    </div>

    <div class="anoutbox">
      <div class="poutbox">
              <img src="../../assets/slider/return.png" alt="" style="cursor:pointer;padding-right:20px" title="返回当前时间" v-on:click="Left">
            <img src="../../assets/slider/back.png" alt="" style="cursor:pointer;padding-right:20px" title="后退" v-on:click="Back">
            <img src="../../assets/slider/play.png" alt="" style="cursor:pointer;padding-right:20px" title="播放" v-show="isPlay" v-on:click="Play">
            <img src="../../assets/slider/stop.png" alt="" style="cursor:pointer;padding-right:20px" v-show="!isPlay" title="停止" v-on:click="Pause">
            <img src="../../assets/slider/next.png" alt="" style="cursor:pointer;padding-right:20px" title="前进" v-on:click="Next">
      </div>
      <div class="timeoutbox"><span>时间</span>&nbsp; <span>{{initData.sliderValue}}</span></div>
    </div>
  </div>
</template>

<script>
import "../../assets/iconfont/iconfont.css";
import WindowsEvent from "@/components/js/WindowsEvent";
export default {
  name: "HelloWorld",
  watch:{
      initData(){

      }
  },
  props:{
      initData:{
          type:Object,
          default:{
            step:1,
            sliderValue:5,
            passTime:5,
            sliderLabelArray:[0,1,2,3,4,5]

          },
      }
  },
  data() {
    return {
      step:1,
      msg: [],
      pdata: 1,
      zdata: 0,
      ldata: 0,
      rdata: 0,
      sliderValue: 0,
      passTime:5,
      time:1.2,
      isPlay:true,
      interval:'',
      labelValue:0,
    };
  },
  created() {
    var rulerdata = [];
    for (var i = 0; i <= 5; i++) {
      rulerdata.push(i+".00");
    }
    this.msg = rulerdata;
  },
  methods: {
    PlayAndPauseChange() {
        this.isPlay = !this.isPlay;
      if(this.pdata==0)
      this.pdata = 1;
      else
      this.pdata = 0;
    },
     Play() {
      this.PlayAndPauseChange();
      this.initData.sliderValue = 0;
      this.interval = window.setInterval(this.Playing, 1000); // this.interval = window.
    },
    Playing() {
      if (this.initData.sliderValue + this.initData.step <= this.initData.passTime) {
        this.initData.sliderValue = this.initData.sliderValue + this.initData.step;
        this.labelValue = this.initData.sliderValue;
        var level = this.initData.sliderValue/(this.initData.passTime/5);
        var obj = {sliderValue:Number(this.initData.sliderValue),level:level}
        WindowsEvent.MyDispatchEvent("DiffusionDrawPlaying", obj);
      } else {
        this.isPlay = true;
        this.pdata = 1;
        window.clearInterval(this.interval);
      }
    },
    sliderChange() {
      var level = this.initData.sliderValue/(this.initData.passTime/5);   
      var obj = {sliderValue:Number(this.initData.sliderValue),level:level}    
      WindowsEvent.MyDispatchEvent("DiffusionDrawPlaying", obj);
    },
    Pause() {
      this.PlayAndPauseChange();
      window.clearInterval(this.interval);
    },
    Back() {
      this.isPlay = true;
      this.pdata = 1;
      window.clearInterval(this.interval);
      if (this.initData.sliderValue - this.initData.step >= 0) {
        this.initData.sliderValue = this.initData.sliderValue - this.initData.step;
        this.labelValue = this.initData.sliderValue;
        var level = this.initData.sliderValue/(this.initData.passTime/5);  
               var obj = {sliderValue:Number(this.initData.sliderValue),level:level}       
                 WindowsEvent.MyDispatchEvent("DiffusionDrawPlaying", obj);
      }
    },
    Next() {
      this.isPlay = true;
      this.pdata = 1;
      window.clearInterval(this.interval);
      if (this.initData.sliderValue + this.initData.step <= this.initData.passTime) {
        this.initData.sliderValue = this.initData.sliderValue + this.initData.step;
        this.labelValue = this.initData.sliderValue;
        var level = this.initData.sliderValue/(this.initData.passTime/5);    
             var obj = {sliderValue:Number(this.initData.sliderValue),level:level}    
                  WindowsEvent.MyDispatchEvent("DiffusionDrawPlaying", obj);
      }
    },
    Left() {
      this.initData.sliderValue = Number(this.initData.passTime);
      window.clearInterval(this.interval);
      var level = this.initData.sliderValue/(this.initData.passTime/5);   
            var obj = {sliderValue:Number(this.initData.sliderValue),level:level}   
                  WindowsEvent.MyDispatchEvent("DiffusionDrawPlaying", obj);
    },
    formatTooltip(val) {
      return val / 100;
    },
    checkplay() {
      if (this.pdata == 0) {
        //this.pdata = 1;
        this.zdata = 0;
        this.ldata = 0;
        this.rdata = 0;
        this.Pause();
      } else if (this.pdata == 1) {
        //this.pdata = 0;
        this.zdata = 0;
        this.ldata = 0;
        this.rdata = 0;
        this.Play();
      }
      
    },
    zhant() {
      this.Left();
      if (this.zdata == 0) {
        this.zdata = 1;
        //this.pdata = 1;
        this.ldata = 0;
        this.rdata = 0;
      } else if (this.zdata == 1) {
        this.zdata = 0;
        //this.pdata = 1;
        this.ldata = 0;
        this.rdata = 0;
      }
    },
    leftplay() {
      this.Back();
      if (this.ldata == 0) {
        this.ldata = 1;
        //this.pdata = 0;
        this.rdata = 0;
        this.zdata = 0;
      } else if (this.ldata == 1) {
        this.ldata = 0;
        //this.pdata = 0;
        this.rdata == 0;
        this.zdata = 0;
      }
    },
    rightplay() {
      this.Next();
      if (this.rdata == 0) {
        this.rdata = 1;
        //this.pdata = 0;
        this.ldata = 0;
        this.zdata = 0;
      } else if (this.rdata == 1) {
        this.rdata = 0;
       // this.pdata = 0;
        this.ldata = 0;
        this.zdata = 0;
      }
    }
  }
};
</script>
<style>
.el-slider__runway {
  width: 344px!important;
  height: 10px!important;
  margin: 0!important;
  background-color: hsl(216, 100%, 99%, 0.1)!important;
  border-radius: 3px!important;
  position: relative!important;
  cursor: pointer!important;
  vertical-align: middle!important;
}
.el-slider__bar {
  width: 344px!important;
  height: 10px!important;
  background-color: rgb(72, 162, 252, 0.1)!important;
  border-top-left-radius: 3px!important;
  border-bottom-left-radius: 3px!important;
  position: absolute!important;
  opacity: 0.1!important;
}
.el-slider__button-wrapper {
  height: 22px!important;
    width: 10px!important;
  top: 0px!important;
}
/* .el-slider__button {
    width: 8px;
    height: 56px;
    border-radius: 0%;
} */
.el-slider__button {
   width: 16px!important;
    height: 16px!important;
    border: 0px!important;
  border-radius: 0%!important;
  position: relative;
  border-style: none!important;
  border-color: #ffffff transparent!important;
  background-color: rgb(255, 253, 253, 0.1)!important; 
}

.el-slider__button:hover {
  border-radius: 0%!important;
  position: relative!important;
 /*  top:-16px!important; */
  width: 10px!important;
  border-style: none!important;
  border-color: #ffffff transparent!important;
  background-color: rgb(255, 253, 253, 0.1)!important;
}
.el-slider__button:before {
  content: url("../../assets/img/03.png")!important;
  position: absolute!important;
  height: 0!important;
  width: 0!important;
  top: -12px!important;
  left: 0px!important;

}
.el-slider__button:hover {
  -webkit-transform: scale(1)!important; 
   -ms-transform: scale(1)!important;  
   transform: scale(1)!important;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content:flex-start;
 /*  align-items: center; */
  width: 492px;
  height: 195px;
  border: 1px #d1d1da solid;
  /* margin: 0px 500px; */
}
.mnplayer{
  width: 492px;
  height: 40px;
 display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}
.mnplayer>span{
  margin:10px 0px 0px 20px;
  font-size:12px;
  font-family:"微软雅黑";
  color:#6e7b8b;
}
.outbox {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 492px;
  height: 20px;
  margin-top:40px
}
.bgbox{
   display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
   width: 382px;
  height: 64px;
    background-color: #f0f0f1;
}
.kdnumbox{
   width: 360px;
  height: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content:space-between;
  align-items: center;
  margin-bottom:20px;
  margin-right:10px;
  font-size:12px;
  font-family:"微软雅黑";
  color:#6e7b8b;
}
.inbox {
  width: 356px;
  height: 10px;
    background-image: url("../../assets/kdc.png");
  background-repeat: no-repeat;
  }
.anoutbox {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content:space-between;
  align-items: center;
  width: 492px;
  height: 60px;
  /*   background-color: aqua; */
  margin-bottom: -30px;
  margin-top:30px
}
.poutbox{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
margin-left:52px;
}
.box {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 20px;
  height: 20px;
  /* background-color: rgb(57, 223, 84); */
 /*  margin: 0 20px; */
}
.box1{
  margin-right:15px;
}
.box2{
  margin-right:15px;
}
.box3{
  margin-right:15px;
}
.icon-bofang2 {
  color: rgb(48, 100, 241);
}
.bcolor {
  color: rgb(48, 100, 241);
}
.timeoutbox{
  margin-right:52px;
}
.timeoutbox>span{
  font-size:12px;
  font-family:"微软雅黑";
  color:#6e7b8b;
}
.iconfont{
  color:#6e7b8b
}
</style>
