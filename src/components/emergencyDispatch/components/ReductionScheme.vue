<template>
    <div class="reduction-scheme-warp">
        <table>
            <tr class="head">
                <td v-for="h in head" :key="h" :width="checkable?'11%':'12%'">{{h}}</td>
                <td v-for="i in 8" :key="i" :width="checkable?'7%':'8%'">{{i}}#</td>
            </tr>
            <tr v-for="item in energyapidata" :key="item.code">
                <td>{{item.WaterworksName}}</td>
                <td>{{item.OutPressure}}</td>
                <td>{{item.OutFlow}}</td>
                <td v-if="checkable"><el-checkbox v-model="item.isSlchooseable"></el-checkbox></td>
                <td v-for="p in item.PumpList" :key="p.PumpNo">
                    <!-- <div class="bz-data" v-html="p.Speed||'&#12288;'" :class="p.OpenCloseType == 1?'gray':(p.OpenCloseType == 2?'red':'green')"></div> -->
                    <div class="bz-data" v-html="p.OpenCloseType == 1?'OFF':(p.OpenCloseType == 4?'ON':(p.Speed||'&#12288;'))" :class="p.OpenCloseType == 1?'gray':(p.OpenCloseType == 2?'red':'green')"></div>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
import Bus from "@/bus.js"
import urlClass from '@/components/js/UrlClass'
import mainClass from '@/components/js/MainClass'
import WindowsEvent from '@/components/js/WindowsEvent'
export default {
    components: {},
    props: {
        checkable: {
            type: Boolean,
            default: false
        },
        url: String,
        param: {
            type: Object,
            default: function() {
                return {}
            }
        }
    },
    data() {
        return {
            energyapidata:[],
            // head: ['水厂名称','出厂压力(MPa)','出厂流量(m³/h)'],
            tableName:'',
            factoryData: [],
            initData:[
                 {
            OutFlow: '--',
            OutPressure: '--',
            PumpList: [
                {
                    OpenCloseType: 2,
                    PumpNo: 1,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 2,
                    Speed: ""
                },
                {
                    OpenCloseType: 1,
                    PumpNo: 3,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 4,
                    Speed: ""
                }
            ],
            WaterworksName: "笔架山水厂"
        },
        {
            OutFlow: '--',
            OutPressure: '--',
            PumpList: [
                {
                    OpenCloseType: 0,
                    PumpNo: 1,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 2,
                    Speed: ""
                },
                {
                    OpenCloseType: 4,
                    PumpNo: 3,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 4,
                    Speed: ""
                },
                {
                    OpenCloseType: 2,
                    PumpNo: 5,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 6,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 7,
                    Speed: ""
                }
            ],
            WaterworksName: "大涌北水厂"
        },
        {
            OutFlow: '--',
            OutPressure: '--',
            PumpList: [
                {
                    OpenCloseType: 0,
                    PumpNo: 1,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 2,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 3,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 4,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 5,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 6,
                    Speed: ""
                }
            ],
            WaterworksName: "大涌南水厂"
        },
        {
            OutFlow: '--',
            OutPressure: '--',
            PumpList: [
                {
                    OpenCloseType: 0,
                    PumpNo: 1,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 2,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 3,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 4,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 5,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 6,
                    Speed: ""
                }
            ],
            WaterworksName: "东湖水厂"
        },
        {
            OutFlow: '--',
            OutPressure: '--',
            PumpList: [
                {
                    OpenCloseType: 0,
                    PumpNo: 1,
                    Speed: ""
                }
            ],
            WaterworksName: "梅林水厂"
        },
        {
            OutFlow: '--',
            OutPressure: '--',
            PumpList: [
                {
                    OpenCloseType: 0,
                    PumpNo: 1,
                    Speed: ""
                }
            ],
            WaterworksName: "南山水厂"
        }
                ],
        }
    },
    methods: {
        fetchDispatchCALC() {
            let self = this
            console.log(this.param)
            this.$axios.post(this.url, this.param).then(R=>{
                self.factoryData = R.data.Data
            })
        },
        myEventListener: function(event) {
        var typeTemp = event.detail.type;
        var dataTemp = event.detail.data;
        console.log(JSON.stringify(dataTemp))
        if(typeTemp=="SchedulePressureCal"){
            let self = this
            this.$axios.post(
              urlClass.axiosUrlYJ + "DispatchCALC",
              JSON.stringify(dataTemp),
              {
                headers: { "Content-Type": "application/json;" }
              }).then(R=>{
                self.factoryData = R.data.Data
                self.EmergencyDispatchCalculateCompare(R.data.Data);

            })
        }
        },
         EmergencyDispatchCalculateCompare(DispatchCALCReturn){
        var planList = new Array();
        /* for(var i=0;i<DispatchCALCReturn.length;i++){
            var obj = DispatchCALCReturn[i];
            var level = obj.OutPressure;
            level *= 100;
            var objTemp = {ElementId:obj.ID,Level:level};
            planList.push(objTemp);
        } */
        for(var i=0;i<2;i++){
            var objTemp = {ElementId:i,Level:25,LayerId:4};
            planList.push(objTemp);
        }
        if(this.tableName=="")
        {
             this.tableName = mainClass.GetRanLetterString(4);
        }
        var paramMeter = {Time:(new Date()).getHours(),PlanList:planList,Tf:1,TableName:this.tableName,IsSave:true};
        console.log("应急调度调压计算后的模拟计算")
        console.log(JSON.stringify(paramMeter))
        let self = this
        this.$axios.post(
            urlClass.axiosUrl + "EmergencyDispatchCalculateCompare",
            JSON.stringify(paramMeter),
            {
            headers: { "Content-Type": "application/json;" }
            }).then(R=>{
            var result = R.data;
            var object = new Object();
            object.NodePressure = result.NodePressure;
            object.min = result.MinFlow;
            object.max = result.MaxFlow;
            object.allData = result.PipeFlow;
            object.DownHeadMax = result.DownHeadMax;
            object.minP = result.MinPressure;
            object.maxP = result.MaxPressure;
            object.TableName = this.tableName;
            object.minV = result.MinStrength;
            object.maxV = result.MaxStrength;
            object.strengthData = result.PipeStrength;
            WindowsEvent.MyDispatchEvent("PipeBurstDraw", object);
        })
    },
    },
    created() {
        this.factoryData = this.initData;
        //this.fetchDispatchCALC()
    },
    mounted() {
        window.addEventListener("event_name", this.myEventListener);
         Bus.$on("energyapinum", e => {
      this.energyapidata = e; 

    });
     Bus.$on("energyapinumwater", e => {
      this.energyapidata = e; 

    });
      
    },
    computed: {
        // factoryData() {
        //     return this.$store.state.emergencyDispatch.factoryData
        // },
        head() {
            let h = ['水厂名称','出厂压力(MPa)','出厂流量(m³/h)']
            if(this.checkable)
                h.push('水量是否可选')
            return h
        }
    },
}
</script>
<style lang="less" scoped>
.reduction-scheme-warp{
    // padding: 10px;
    box-sizing: border-box;
    table{
        width: 100%;
        .head{
            background-color: #F0F0F1;
            line-height: 24px;
        }
        td{
            // line-height: 24px;
            padding: 8px 2px;
            .bz-data{
                text-align: center;
                display: inline-block;
                width: 100%;
                margin-bottom: 2px;
                &.green{
                    background-color: #ABE931;
                }
                &.red{
                    background:#f0f0f1;
        background-image: url("~@/assets/img/kong_01.png");
                }
                &.gray{
                    background-color: #F03939;
                }
            }
        }
    }
}
</style>
