<template>
    <div>
          <div id="mainl2"></div>
    </div>
</template>
<script>
import Bus from "@/bus.js";
import urlClass from "@/components/js/UrlClass";
export default {
  name: "Echarts2",
  data() {
    return {
      resstu2:{},
      bjsechartsdatap1: [],
      bjsechartstimep1: []
    };
  },
  mounted() {
    var _this = this;
     Bus.$on("info12", e => {
      _this.resstu2 = e; 
       var OutPressure = _this.resstu2.OutPressure;
          var datap1 = [];
          var timep1 = [];
          for (var i = 0; i < OutPressure.length; i++) {
            datap1.push(OutPressure[i].Data);
            timep1.push(OutPressure[i].Time);
          }
          _this.bjsechartsdatap1 = datap1;
          _this.bjsechartstimep1 = timep1;
          _this.drawLine()
    });
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("mainl2"));
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
          data: ["出厂压力"],
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
            data: this.bjsechartstimep1,
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
            name: "出厂压力",
            type: "bar",
            barWidth: 6,
            data: this.bjsechartsdatap1,
            zlevel: 99,
            itemStyle: {
              emphasis: {
                color: "red"
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
#mainl2 {
  width: 1260px;
  height: 134px;
  margin-left: 20px;
  /*   border: 1px red solid; */
}
</style>


