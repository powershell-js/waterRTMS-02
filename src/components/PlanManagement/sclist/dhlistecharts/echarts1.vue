<template>
    <div>
          <div id="mainhl1"></div>
    </div>
</template>
<script>
import Bus from "@/bus.js";
import urlClass from "@/components/js/UrlClass";
export default {
  name: "Echarts1",
  data() {
    return {
      resstu1:{},
      bjsechartsdata1: [],
      bjsechartstime1: [],
      bjsechartsdata2: [],
      bjstimrdata: [],
      bjsechartstype1: "",
      bjsechartstype2 :""
    };
  },
  mounted() {
    var _this = this;
     Bus.$on("info11", e => {
      _this.resstu1 = e; 
        var WaterInflow =_this.resstu1.WaterInflow;
        var WaterSupply = _this.resstu1.WaterSupply;
        var data1 = [];
        var time1 = [];
        var data2 = [];
        var type1 = [];
        for (var i = 0; i < WaterInflow.length; i++) {
          data1.push(WaterInflow[i].Data);
          time1.push(WaterInflow[i].Time);
        }
        for (var i = 0; i < WaterSupply.length; i++) {
          data2.push(WaterSupply[i].Data);
        }
        _this.bjsechartsdata1 = data1;
        _this.bjsechartstime1 = time1;
        _this.bjsechartsdata2 = data2;
       _this.drawLine();
    });
  },

  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("mainhl1"));
      // 绘制图表
      myChart.setOption({
        grid: {
          height: 84,
      
          bottom: 10,
          top: 35,
          right: 1,
          left: 51
        },
        color: ["#859dc0", "#bcc2cb"],
        legend: {
          right: 10,
          width: 500,
          itemWidth: 40,
          textStyle: {
            color: "#6e7b8b"
          },
          data: ["供水量", "进水量"],
          icon: "rect", //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none

          itemWidth: 14, // 设置宽度

          itemHeight: 14, // 设置高度

          itemGap: 40 // 设置间距
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: [
          {
            data: this.bjsechartstime1,
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
            name: "供水量",
            type: "bar",
            barWidth: 6,
            data: this.bjsechartsdata1,
            zlevel: 2,
            itemStyle: {
              emphasis: {
                color: "red"
              }
            }
          },
          {
            name: "进水量",
            type: "line",
            data: this.bjsechartsdata2,
          zlevel: 99,
            itemStyle: {
              // 转折点 控制
              normal: {
                borderColor: "#b43d99"
              }
            },

            lineStyle: {
              normal: {
                width: 2,
                color: "#b43d99"
              }
            }
          }
        ]
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#mainhl1 {
      width: 1260px;
      height: 134px;
      margin-left: 20px;
    /*   border: 1px red solid; */
    }
</style>


