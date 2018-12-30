<template>
    <div class="box">

        <div class="kedu">
        
        </div>

        <div class="contentbox1-1">
            <Echarts1></Echarts1>
        </div>

        <div class="contentbox3-1">
            <Echarts3></Echarts3>
        </div>

        <div class="contentbox6-1">
            <ListTable/>
        </div>



    </div>
</template>
<script>
import urlClass from '@/components/js/UrlClass'
import Bus from "@/bus.js";
import ListTable from "./bjslistecharts/listtable";
import Echarts1 from "./bjslistecharts/echarts1";
import Echarts3 from "./bjslistecharts/echarts3";
export default {
  name: "BjsList",
  components: {
    ListTable,
    Echarts1,
    Echarts3,

  },

};
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  box-sizing: border-box;
}

.kedu {
  width: 100%;
  height: 28px;
  background-color: #fff;
  border: 1px #e4e4ec solid;
  border-top: none;
  border-bottom: none;
}

.contentbox1-1 {
  height: 154px;
  width: 100%;
  border: 1px #e4e4ec solid;
}

.contentbox3-1 {
  height: 154px;
  width: 100%;
  border: 1px #e4e4ec solid;
  border-top: none;
}

.contentbox6-1 {
  height: 224px;
  width: 100%;
  border: 1px #e4e4ec solid;
}
</style>


