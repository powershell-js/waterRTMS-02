<template>
    <div class="box">
       <div class="listbox">
          水厂调度方案列表
       </div>
    <div class="dispachtable">
      <waterdispatchingtable/>
    </div>
    </div>
</template>
<script>
import waterdispatchingtable from '@/components/PlanManagement/sclist/waterdispatchingtable'
export default {
  name: "Tablist2",
  components:{
    waterdispatchingtable
  },
  data() {
    return {
     
  }
  },

  methods: {
  
/*     apipostPlanManagement() {
   let _this = this;
      var WaterNum = _this.name;
      var object = { WaterNum };
     axios.post(urlClass.axiosUrlRC + 'GetWaterPump', JSON.stringify(object),{headers: {'Content-Type':'application/json;'}})
       .then(function (res) {
       var GetWaterPump=res.data.PumpData;
       Bus.$emit('GetWaterPump1',GetWaterPump)
       Bus.$emit('GetWaterPump2',res.data)
       })
       .catch(function (err) {
         console.log(err)

       })
    
    
  }, */
  },
 
};
</script>
<style lang="scss" scoped>
.box {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  /*   margin: 0 20px; */
  width: 100%;
  
}
.listbox {
  list-style: none;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-width: 1128px;
  height: 40px;
  color: #788493;
  font: bold 12px/40px "微软雅黑";
  padding-left: 30px;
    border: 1px #e4e4ec solid;
  /*  background-color: #f5f5f6; */
}
.dispachtable{
  width: 100%;
  min-width: 1128px;
  height: 298px;
 /*  background-color: rgb(94, 94, 94) */
}
</style>

