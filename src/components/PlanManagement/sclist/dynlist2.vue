<template>
<div class="box">
    <div class="inbox">


    </div>
</div>
</template>
<script>
import Bus from "@/bus.js";

export default {
 name:"DynList2",
  components:{

  },
  data(){
return{

}
  },
   mounted(){
   
  },
  methods: {
     
  }
};
</script>
<style lang="scss" scoped>
.box {
 /*  width: 1128px; */
  /* height: 595px; */
  /* height: 61.4035087719vh; */
 /*  overflow: auto; */
}
.inbox {
 /*  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center; */
  /*   margin: 0 20px; */
  width: 100%;
  height: 100%;
}

.contentbox1 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  width: 100%;
  border:1px #e4e4ec solid;
}
.titlebox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 254px;
  border: 1px #e4e4ec solid;
  border-top:none;
  border-bottom:none; 
  cursor: pointer;
}

.intitlebox {
  width: 224px;
  height: 24px;
  text-align: start;
  padding-left: 10px;
  border-radius: 2px;
  font-size: 12px;
  font-family: "微软雅黑";
  font-weight: bold;
  opacity: 0.8;
  line-height: 24px;
  /* background-color: #fff; */
  border: 1px #e4e4ec solid;
  color: #788493;
   background-color: #ededef;
 background: -webkit-gradient(linear, 0 0, 0 100%, from(#fff), to(#ededef));
 background: -moz-linear-gradient(top, #fff, #ededef);
}
.img {
  margin-right: 5px;
}
/* .intitlebox::before{
    background-image: url('../../../../static/assets/img/深水_日常调度_切图_55.png')
} */
.listbox {
  list-style: none;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}
.listbox > li {
  font-size: 12px;
  font-family: "微软雅黑";
  margin: 0 20px;
  color: #bcc2cb;
}
.num {
  font-size: 12px;
  font-family: "微软雅黑";
  font-weight: bold;
  margin: 0 10px;
  color: #788493;;
}
.contentbox1-1 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  height: 154px;
  width: 100%;
  border: 1px #e4e4ec solid;
}
.titlebox1-1 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
 /*  display: flex; */
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 154px;
  width: 254px;
  border: 1px #e4e4ec solid;
   border-top:none;
  border-bottom:none;
  cursor: pointer;
}
.titlebox1-2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content:center;
  align-items: center;
  height: 154px;
   width: -moz-calc(100% - 254px);
  width: -webkit-calc(100% -254px);
  width: calc(100% - 254px);
/*   background-color: aqua; */
}
.inbox-echart {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  height: 134px;
  width: 100%;
 /*  width: 95%;
  background-color: #bcc2cb; */
}

.intitlebox1-1 {
  width: 224px;
  height: 24px;
  text-align: start;
  padding-left: 10px;
  border-radius: 2px;
  font-size: 12px;
  font-family: "微软雅黑";
  font-weight: bold;
  opacity: 0.8;
  line-height: 24px;
  /* background-color: #fff; */
  border: 1px #e4e4ec solid;
  margin-top: 10px;
      margin-left: 10px;
    color: #788493;
  background-color: #ededef;
 background: -webkit-gradient(linear, 0 0, 0 100%, from(#fff), to(#ededef));
 background: -moz-linear-gradient(top, #fff, #ededef);
    
}

.listbox1-1 {
  list-style: none;
  width: 224px;
  /* display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start; */
  margin-top: 10px;
      margin-left: 10px;
}
.listbox1-1 > li {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content:space-between;
  align-items: center;
  font-size: 12px;
  font-family: "微软雅黑";
  margin: 5px 0;
  color: #bcc2cb;
}

.num1-1 {
  font-size: 12px;
  font-family: "微软雅黑";
  font-weight: bold;
 /*  margin: 0 10px; */
   color: #788493;
  margin-left: 20px;
}

.contentbox2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  width: 100%;
  border: 1px #e4e4ec solid;
}
.contentbox2-1 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  height: 154px;
  width: 100%;
  border: 1px #e4e4ec solid;
  border-top:none;
}
.titlebox2-1 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
 /*  display: flex; */
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 154px;
  width: 254px;
  border: 1px #e4e4ec solid;
  cursor: pointer;
   border-top:none;
  border-bottom:none;
}
.titlebox2-2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content:center;
  align-items: center;
  height: 154px;
  width: -moz-calc(100% - 254px);
  width: -webkit-calc(100% -254px);
  width: calc(100% - 254px);
/*   background-color: aqua; */
}
.inbox-echart {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  height: 134px;
  width: 100%;
 /*  width: 95%;
  background-color: #bcc2cb; */
}

.intitlebox2-1 {
  width: 224px;
  height: 24px;
  text-align: start;
  padding-left: 10px;
  border-radius: 2px;
  font-size: 12px;
  font-family: "微软雅黑";
  font-weight: bold;
  opacity: 0.8;
  line-height: 24px;
 /*  background-color: #fff; */
  border:1px #e4e4ec solid;
  margin-top: 10px;
      margin-left: 10px;
    color: #788493;
      background-color: #ededef;
 background: -webkit-gradient(linear, 0 0, 0 100%, from(#fff), to(#ededef));
 background: -moz-linear-gradient(top, #fff, #ededef);
}

.listbox2-1 {
  list-style: none;
  width: 224px;
  /* display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start; */
  margin-top: 10px;
      margin-left: 10px;
}
.listbox2-1 > li {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content:space-between;
  align-items: center;
  font-size: 12px;
  font-family: "微软雅黑";
  margin: 5px 0;
  color: #bcc2cb;
}

.num2-1 {
  font-size: 12px;
  font-family: "微软雅黑";
  font-weight: bold;
 /*  margin: 0 10px; */
 
  margin-left: 20px;
    color: #788493;
}

.contentbox3 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
 /*  width: 100%; */
  border: 1px #e4e4ec solid;
  border-top:none;
}
.contentbox3-1 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  height: 154px;
  width: 100%;
  border: 1px #e4e4ec solid;
  border-top:none;
}
.titlebox3-1 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
 /*  display: flex; */
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 154px;
  width: 254px;
  border: 1px #e4e4ec solid;
  cursor: pointer;
   border-top:none;
  border-bottom:none;
}
.titlebox3-2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content:center;
  align-items: center;
  height: 154px;
   width: -moz-calc(100% - 254px);
  width: -webkit-calc(100% -254px);
  width: calc(100% - 254px);
/*   background-color: aqua; */
}
.inbox-echart {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  height: 134px;
  width: 100%;
 /*  width: 95%;
  background-color: #bcc2cb; */
}

.intitlebox3-1 {
  width: 224px;
  height: 24px;
  text-align: start;
  padding-left: 10px;
  border-radius: 2px;
  font-size: 12px;
  font-family: "微软雅黑";
  font-weight: bold;
  opacity: 0.8;
  line-height: 24px;
   background-color: #ededef;
 background: -webkit-gradient(linear, 0 0, 0 100%, from(#fff), to(#ededef));
 background: -moz-linear-gradient(top, #fff, #ededef);
  border: 1px #e4e4ec solid;
  margin-top: 10px;
      margin-left: 10px;
    color: #788493;
}

.listbox3-1 {
  list-style: none;
  width: 224px;
  /* display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start; */
  margin-top: 10px;
      margin-left: 10px;
}
.listbox3-1 > li {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content:space-between;
  align-items: center;
  font-size: 12px;
  font-family: "微软雅黑";
  margin: 5px 0;
  color: #bcc2cb;
}

.num3-1 {
  font-size: 12px;
  font-family: "微软雅黑";
  font-weight: bold;
 /*  margin: 0 10px; */
    color: #788493;
  margin-left: 20px;
}

.contentbox4 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
 /*  width: 100%; */
  border: 0.5px #e4e4ec solid;
  border-top:none;
}
.contentbox5 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
 /*  width: 100%; */
  border: 0.5px #e4e4ec solid;
   border-top:none;
  
}
.contentbox6 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
 /*  width: 100%; */
  border: 0.5px #e4e4ec solid;
}
.contentbox6-1 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  height: 270px;
  width: 100%;
  border:1px #e4e4ec solid;
}
.titlebox6-1 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
 /*  display: flex; */
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 270px;
  width: 254px;
  border: 1px #e4e4ec solid;
  cursor: pointer;
   border-top:none;
  border-bottom:none;
}
.titlebox6-2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content:center;
  align-items: center;
  height: 270px;
  width: -moz-calc(100% - 254px);
  width: -webkit-calc(100% -254px);
  width: calc(100% - 254px);
/*   background-color: aqua; */
}
.inbox-table6-2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  height: 270px;
  width: 100%;
  /*  width: 95%;
  background-color: #bcc2cb; */
}

.intitlebox6-1 {
  width: 224px;
  height: 24px;
  text-align: start;
  padding-left: 10px;
  border-radius: 2px;
  font-size: 12px;
  font-family: "微软雅黑";
  font-weight: bold;
  opacity: 0.8;
  line-height: 24px;
   background-color: #ededef;
 background: -webkit-gradient(linear, 0 0, 0 100%, from(#fff), to(#ededef));
 background: -moz-linear-gradient(top, #fff, #ededef);
  border: 1px #e4e4ec solid;
  margin-top: 10px;
      margin-left: 10px;
    color: #788493;
}

.listbox6-1 {
  list-style: none;
  width: 224px;
  /* display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start; */
  margin-top: 10px;
      margin-left: 10px;
}
.listbox6-1 > li {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content:space-between;
  align-items: center;
  font-size: 12px;
  font-family: "微软雅黑";
  margin: 5px 0;
  color: #bcc2cb;
}

.num6-1 {
  font-size: 12px;
  font-family: "微软雅黑";
  font-weight: bold;
 /*  margin: 0 10px; */
    color: #788493;
  margin-left: 20px;
}


</style>



