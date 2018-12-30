<template>
    <div class="overview-warp">
        <el-row type="flex" :gutter="15">
            <el-col :span="5" style="height:324px;padding:0">
                <div class="water-value">
                    <div>
                        <div class="water-value-head">
                        <el-row>
                            <el-col :span="12" style="padding-top:20px">
                                <span class="unit">当前总水量(m³/h)</span>
                            </el-col>
                            <el-col :span="12" style="text-align:right;padding-top:20px">
                                <span class="hb">10%</span>
                            </el-col>
                        </el-row>
                    </div>
                   <div style="margin-left:10px;margin-top:50px">
                      <div class="newwaternum1">
                           {{outFlowdata2}}
                      </div>
                       <!--  <template v-for="i in '89645'">
                        <led-number :key="i" :num="parseInt(i)"></led-number>
                    </template> -->
                   </div>
                    </div>
                   <div style="margin-top:40px">
                        <div class="water-value-head">
                        <el-row>
                            <el-col :span="12" style="padding-top:20px">
                                <span class="unit">调度总水量(m³/h)</span>
                            </el-col>
                            <el-col :span="12" style="text-align:right;padding-top:20px">
                                <span class="hb1">10%</span>
                            </el-col>
                        </el-row>
                    </div>
                   <div style="margin-left:10px;margin-top:50px;">
                       <!--  <template v-for="i in '89645'" >
                        <led-number :key="i" :num="parseInt(i)" id="lednum"></led-number>
                    </template> -->
                    <div class="newwaternum2">
                          {{outflowdatad}}
                      </div>
                   </div>
                    </div>



            </div>
                
            </el-col>
            <el-col :span="19">
                <toptable></toptable>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import LedNumber from './LedNumber.vue';
import toptable from './toptable.vue'
import Bus from "@/bus.js";
export default {
    components: { LedNumber, toptable },
    data() {
        return {
outFlowdata2:"------",
outflowdatad:"------"
        }
    },
      mounted() {
    let self = this;
    Bus.$on("CurrentDataoutflow1", e => {
      self.outFlowdata2 = e;
    });
    Bus.$on("ForecastDataoutflow2", e => {
      self.outflowdatad = e;
    });
  }
}    
</script>
<style lang="less" scoped>
.overview-warp{
    padding: 15px;
    background: url("~@/assets/深水_日常调度_背景_17.png") 100% 100%;
    height: 324px;
    .water-value{
       /*  padding: 15px; */
        background-color: rgba(16, 25, 39, 0.6);
        height: 100%;
        box-sizing: border-box;
        .water-value-head{
            margin-bottom: 30px;
            .unit{
                color: white;
                margin-left: 8px;
            }
            .hb{
                color: #00CCFF;
                position: relative;
                padding: 0 15px;
                &:before{
                    content: '';
                    display:block;
                    width:0;
                    height:0;
                    border-width:0 8px 8px;
                    border-style:solid;
                    border-color:transparent transparent #00CCFF;
                    position:absolute;
                    top:5px;
                    left:-5px;
                }
            }
            .hb1{
                color: #d56459;
                position: relative;
                padding: 0 15px;
                &:before{
                    content: '';
                    display:block;
                    width:0;
                    height:0;
                    border-width:0 8px 8px;
                    border-style:solid;
                    border-color:transparent transparent #d56459;
                    position:absolute;
                    top:5px;
                    left:-5px;
                }
            }
        }
    }
}
.newwaternum1{
font: bold 44px/30px "微软雅黑";
color:#00CCFF
}
.newwaternum2{
font: bold 44px/30px "微软雅黑";
color:#d56459
}
</style>
