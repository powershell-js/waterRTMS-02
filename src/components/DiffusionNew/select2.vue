<template>
      <div class="outbox2">
        <div class="outbox2-2">
          <div class="inbox2-1">
            <div class="wrdiput">
              <div v-for="(item0,index0) in list0" :key="index0" class="wrdiputoutbox">
                <div class="wrdiputinbox">
                  <span>{{item0.Label}}</span>
                  <span
                    class="delet0"
                    @click="selectapi0(index0)"
                    style="color:#729a18"
                  ><img :src="deletimgurl" alt="" style="width:12px;height:12px;margin-bottom:-2px"></span>
                </div>
              </div>
            </div>
            <div class="jiahao" @click="showselct">
              <img :src="imgurl" alt style="width:12px;height:12px">
            </div>
          </div>
          <div class="szdfont" @click="selectfun">水质点</div>
          <!-- <div class="searchpoint">.&nbsp;.&nbsp;.</div> -->
          <el-button type="success" size="min" style="margin-left: 10px;" v-on:click="selectClick">选择</el-button>
        </div>
                <!-- 下拉框部分 -->
                    <div class="drapedwon" v-show="drap1">
                      <div
                        v-for="(item,index) in list1"
                        :key="index"
                        :class="{'active': list1[index].forhide == true}"
                        class="drapedwonlist1"
                        @click="selectapi(index)"
                      >
                        <div class="listinboix1">
                          <span>{{list1[index].Label}}</span>
                        </div>
                      </div>
                    </div>

                    <div class="drapedwon2" v-show="drap2">
                      <div v-for="(item2,index2) in list0" :key="index2" class="drapedwonlist2">
                        <div class="listinboix2">
                          <span>{{item2.Label}}</span>
                          <span
                            class="delet"
                            @click="selectapi2(index2)"
                            style="color:#729a18"
                          ><img :src="deletimgurl" alt="" style="width:12px;height:12px;margin-bottom:-2px"></span>
                        </div>
                      </div>
                    </div>
          <!-- 下拉框部分结束 -->
      </div>
    
</template>

<script>
import jttop from "../../assets/img/jttop.png";
import jtdown from "../../assets/img/jtdown.png";
import deletimg from "../../assets/img/delet2.png"
import WindowsEvent from "@/components/js/WindowsEvent";
export default {
  name: "select2",
  props:{
    list1:{
      type:Array,
      default:[],
    },
     list0:{
      type:Array,
      default:[],
    }
  },
  data() {
    return {
      deletimgurl:deletimg,
      imgurl: jtdown,
      drap1: false,
      drap2: false,
      nowIndex: 0,
      listnum0: [],
    };
  },
  mounted() {
   /*  var arr1 = [];
    for (var i = 0; i < 20; i++) {
      var label = "szxxc00" + i;
      var value = i;
      var a = { label, value };
      arr1.push({
        name: a,
        forhide: false
      });
    }
    this.list1 = arr1; */
    window.addEventListener("event_name", this.myEventListener);
  },
  methods: {
     myEventListener: function(event) {
        var typeTemp = event.detail.type;
      var dataTemp = event.detail.data;
      if (typeTemp == "DiffusionMapClickReturn") {
         if(dataTemp=="-1")
         alert("该点已经被选择,请重新选择!")
         else
         {
           this.list0.push(dataTemp);
         }
      }
      else if(typeTemp==""){

      }
     },
    selectClick() {
      WindowsEvent.MyDispatchEvent("DiffusionMapClick", true);
    },
    selectfun() {
      if (this.drap1 == false) {
        this.drap1 = true;
        this.drap2 = false;
      } else {
        this.drap1 = false;
      }
    },
    showselct() {
      if (this.drap2 == false) {
        this.drap2 = true;
        this.drap1 = false;
      } else {
        this.drap2 = false;
      }
      if (this.imgurl == jtdown) {
        this.imgurl = jttop;
      } else if (this.imgurl == jttop) {
        this.imgurl = jtdown;
      }
    },
    selectapi(val) {
      // list1[index].forhide
      var a = val;
      var that = this;
      this.$set(that.list1[a], "forhide", !that.list1[a].forhide);
      var list0 = this.list0;
      if (list0.indexOf(this.list1[val]) == -1) {
        console.log(this.list1[val])
        list0.push(this.list1[val]);
      } else {
        list0.splice(list0.indexOf(this.list1[val]), 1);
      }
      this.list0 = list0;
      WindowsEvent.MyDispatchEvent("DeleteSourceIds", this.list0);
    },
    selectapi2(val2) {
      var that = this;
      for (var i = 0; i < this.list1.length; i++) {
        if (this.list1[i].name == this.list0[val2].name) {
          that.$set(that.list1[i], "forhide", false);
        }
      }
      this.list0.splice(val2, 1);
      WindowsEvent.MyDispatchEvent("DeleteSourceIds", this.list0);
    },
    selectapi0(val0) {
      var that = this;
      for (var i = 0; i < this.list1.length; i++) {
        if (this.list1[i].name == this.list0[val0].name) {
          that.$set(that.list1[i], "forhide", false);
        }
      }
      this.list0.splice(val0, 1);
      WindowsEvent.MyDispatchEvent("DeleteSourceIds", this.list0);
    }
  }
};
</script>
<style>
.el-input__inner {
  height: 28px;
  line-height: 28px;
  padding: 0 5px;
}
.el-input__icon {
  line-height: 28px;
}
.el-input {
  font-size: 12px;
}
.el-select .el-input__inner:focus {
  border-color: #dcdfe6;
}
.el-select:hover .el-input__inner {
  border-color: #dcdfe6;
}

.el-input.is-active .el-input__inner,
.el-input__inner:focus {
  border-color: #dcdfe6;
  outline: 0;
}
.el-select .el-input.is-focus .el-input__inner {
  border-color: #dcdfe6;
}
.el-select-dropdown__item {
  font-size: 12px;
  font-family: "微软雅黑";
  color: #818d9a;
}
.el-select-dropdown__item.selected {
  color: #729a18;
  font-weight: 700;
}
</style>
<style scoped>
/* .select {
  margin: 60px 400px;
  
}
 */

.outbox2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 268px;
  height: 28px;
  position: relative;
/*   margin-top: 30px; */
  /* background-color:red; */
}
.outbox2-1 {
  font-size: 12px;
  font-family: "微软雅黑";
  color: #818d9a;
  width: 60px;
  height: 28px;
  line-height: 28px;
}
.outbox2-2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.inbox2-1 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
.wrdiput {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 112px;
  height: 28px;
  /*  background-color: #f0f0f1; */
  overflow: hidden;
}
.wrdiputoutbox {
  width: 142px;
  height: 28px;
}
.wrdiputinbox {
  font-size: 12px;
  font-family: "微软雅黑";
  color: #818d9a;
  width: 68px;
  height: 24px;
  line-height: 24px;
  margin-left: 10px;
}

.jiahao {
  width: 20px;
  height: 28px;
  line-height: 28px;
  padding-left: -4px;
  /*  background-color: #f0f0f1; */
  /* margin-left: 10px; */
  cursor: pointer;
}
.delet0 {
  margin-left:0px;

}
.iconfont {
  font-size: 12px;
}
.szdfont {
  width: 48px;
  height: 28px;
  line-height: 28px;
  font-size: 12px;
  font-family: "微软雅黑";
  color: #818d9a;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;
      text-align: center;
}
.searchpoint {
  width: 26px;
  height: 28px;
  line-height: 22px;
  font-size: 12px;
  font-family: "微软雅黑";
  color: #818d9a;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;
      text-align: center;
}

/* 下拉框部分样式 */
.drapedwon {
  width: 151px;
  height: 163px;
  border: 1px #e4e4ec solid;
  /*  background-color: #d1d1da; */
  position: absolute;
  top: 28px;
  left: 145px;
  overflow: auto;
  background-color: #fff;
  z-index: 99;
}

.drapedwonlist1 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  color: #818d9a;
}
/* .drapedwonlist1:nth-child(even){
    background-color: #818d9a
} */
.listinboix1 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 30px;
  width: 108px;
  /*  margin-left: 20px; */
}
.listinboix1 > span {
  font-size: 12px;
  font-family: "微软雅黑";
  /* color: #818d9a; */
  cursor: pointer;
}

.drapedwon2 {
  width: 130px;
  height: 110px;
  border: 1px #e4e4ec solid;
  /*  background-color: #d1d1da; */
  position: absolute;
  top: 28px;
  left: 0px;
  overflow: auto;
  background-color: #fff;
   z-index: 99;
}
.drapedwonlist2:hover {
  background-color: #f0f0f1;
}
.listinboix2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  width: 90px;
  margin: 0 15px;
}
.listinboix2 > span {
  font-size: 12px;
  font-family: "微软雅黑";
  color: #818d9a;
  cursor: pointer;
}
.delet {
  margin-left: 20px;
}
.active {
  background-color: #f0f0f1;
  color: #729a18;
  /*  border-bottom: 1px #d1d1da solid; */
}

select {
  border: none;
  outline: none;
}
</style>
