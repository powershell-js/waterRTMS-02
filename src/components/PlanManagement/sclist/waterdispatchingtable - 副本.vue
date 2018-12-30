<template>
    <div class="outbox" :style="{height:(listoutboxHeight-95-80-35-130)+'px'}">
        <div class="tableoutbox" :style="{height:(listoutboxHeight-95-110-100-35)+'px'}">
              <el-table
            :data="tableData"
            border-top
            empty-text
            style="width: 100%" stripe :header-cell-style="headerStyle" :row-style="rowStyle" height="100%"
            element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading" element-loading-background="rgba(143, 188, 143, 0.8)"
             >
                <el-table-column class="red"
                prop="WaterworksName"
                label="水厂名称"
               min-width="100">
                </el-table-column>
                <el-table-column
                prop="OutPressure"
                label="出厂压力"
               min-width="100">
                </el-table-column>
                <el-table-column
                prop="OutFlow"
                label="出厂流量"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="ClearWaterLevel"
                label="清水池水位"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="PumpList[0].Speed"
                label="1#"
                min-width="100">
                 <template slot-scope="scope">
                            <div class="slotoutbox1">
                                <div class="slotinbox11">{{scope.row.PumpList[0].Speed}}</div>
                    
                            </div>
                      </template>
                </el-table-column>
                  <el-table-column
                prop="PumpList[1].Speed"
                label="2#"
                min-width="100">
                <template slot-scope="scope1">
                            <div class="slotoutbox1">
                                <div class="slotinbox11">{{scope1.row.PumpList[1].Speed}}</div>
                    
                            </div>
                      </template>
                </el-table-column>
                  <el-table-column
                prop="PumpList[2].Speed"
                label="3#"
                min-width="100">
                <template slot-scope="scope2">
                            <div class="slotoutbox1">
                                <div class="slotinbox11">{{scope2.row.PumpList[2].Speed}}</div>
                    
                            </div>
                      </template>
                </el-table-column>
                  <el-table-column
                prop="PumpList[3].Speed"
                label="4#"
                min-width="100">
                <template slot-scope="scope3">
                            <div class="slotoutbox1">
                                <div class="slotinbox11">{{scope3.row.PumpList[3].Speed}}</div>
                    
                            </div>
                      </template>
                </el-table-column>
                  <el-table-column
                prop="PumpList[4].Speed"
                label="5#"
                min-width="100">
                <template slot-scope="scope4">
                            <div class="slotoutbox1">
                                <div class="slotinbox11">{{scope4.row.PumpList[4].Speed}}</div>
                    
                            </div>
                      </template>
                </el-table-column>
                  <el-table-column
                prop="PumpList[5].Speed"
                label="6#"
                min-width="100">
                 <template slot-scope="scope5">
                            <div class="slotoutbox1">
                                <div class="slotinbox11"></div>
                    
                            </div>
                      </template>
                </el-table-column>
                  <el-table-column
                prop="PumpList[6].Speed"
                label="7#"
                min-width="100">
               
                </el-table-column>
                   <el-table-column
                prop="PumpList[7].Speed"
                label="8#"
                min-width="100">
               
                </el-table-column>
     </el-table>
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
       info: [],
      headerStyle() {
        return {
          "background-color": "#f0f0f1",
          "color": "#6e7b8b",
          "font-size": "12px",
          "font-family": "微软雅黑"
        };
      },
      rowStyle() {
        return {
          "height": "40px",
          "line-height": "40px",
          "color": "#6e7b8b"
        };
      },

      tableData: [],

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
      that.tableData = e.Data; /* 　console.log(`传来的数据是：${e}`) */
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
  margin-left: 10px
}
.slotinbox11{
     width:120px;
     height: 26px;
     line-height: 26px;
     text-align: start;
     border-radius: 2px;
     background-color: aqua;
     padding-left: 20px;
     margin-left: -20px
}

</style>





