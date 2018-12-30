<template>
    <div>
          <div id="mainn"></div>
    </div>
</template>
<script>
import Bus from "@/bus.js";
export default {
  name: "Echarts1",
  data() {
    return {
dynJSLData:[],
dynJSLTime:[]
    };
  },
/*  props:['dynJSLData','dynJSLTime'], */
  mounted() {
  let self = this;
 Bus.$on("WaterInFlowCurvedatafun", e => {
      self.dynJSLData= e;
    });
     Bus.$on("WaterInFlowCurvetimefun", e => {
      self.dynJSLTime= e;
    });
  },
 watch:{
     dynJSLData(){
         this.drawLine();
     }
 },
  methods: {
    drawLine() {
      let self = this;
      let myChart = this.$echarts.init(document.getElementById("mainn"));

      myChart.setOption({
        grid: {
          bottom: 10,
          top: 35,
          right: 1,
          left: 51
        },
        color: ["#859dc0", "#bcc2cb"],

        tooltip: {
          trigger: "axis"
        },
        xAxis: [
          {
            type:'category',
            data:self.dynJSLTime,
            axisLabel: {
              inside: false,
              textStyle: {
                color: "#fff"
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            z: 10
          }
        ],
        yAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              color: "#dfdfdf",
              width: 1,
              type: "dashed"
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#999"
            }
          }
        },

        series: [
          {
            name: "进水量",
            type: "bar",
            data: self.dynJSLData,
            itemStyle: {
                normal: {
                    color: '#859dc0'
                }
            },

          }
        ]
      });
    }
  }
};
</script>
<style  scoped>
#mainn {
    width: 100%;
    height: 156px;
}
</style>


