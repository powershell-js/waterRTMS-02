export default{
    initExtent:{
       /*  minX:380083.27864125,
        minY:252673.3739848,
        maxX:605825.77522175,
        maxY:400526.3930992, */
        minX:91018.9439,
        minY:7611.9801,
        maxX:142976.5999,
        maxY:34599.5340,
    },
    ///////////////////压力/////////////////////////////////////////
    pressureLimit:[26,29,32,35,38],
    pressureColor:["#39aa00","#73ffd6","#8cd300","#ffff00","#ff8200","#ff0000"],
    pressureWidth:[3,3.5,4,4.5,5,5.5],
    pressureIsDisplay:[true,true,true,true,true,true],
    ///////////////////管道流量/////////////////////////////////////////
    pipeFlowLimit:[10,50,100,500,1000,2000,3000],
    pipeFlowColor:["#399AFF","#D6FF00","#FF55FF","#00ffc6","#005de7","#73aa00","#e79a00","#ff0000"],
    pipeFlowWidth:[3,4,5,6,7,8,9,10],
    pipeFlowIsDisplay:[true,true,true,true,true,true,true,true],
    ///////////////////管道流速/////////////////////////////////////////
    pipeVelocityLimit:[0.05,0.1,0.3,0.5],
    pipeVelocityColor:["#00ffc6","#005de7","#73aa00","#e79a00","#ff0000"],
    pipeVelocityWidth:[3,4,5,6,7,8],
    pipeVelocityIsDisplay:[true,true,true,true,true,true],
     ///////////////////水压标高/////////////////////////////////////////
     headLimit:[40,43,46,49,52],
     headColor:["#0808ff","#399eff","#73ffd6","#e7ff4a","#ffa600","#ff0000"],
     headWidth:[3,3.5,4,4.5,5,5.5],
     headIsDisplay:[true,true,true,true,true,true],
      ///////////////////水力坡度/////////////////////////////////////////
    pipeSlopLimit:[0.01,0.05,0.1,0.5,2],
    pipeSlopColor:["#00ffc6","#005de7","#73aa00","#e79a00","#73ffd6","#ff0000"],
    pipeSlopWidth:[3,5,7,9,11,13],
    pipeSlopIsDisplay:[true,true,true,true,true,true],
     ///////////////////节点流量/////////////////////////////////////////
     demandLimit:[2.5,10,50,100],
     demandColor:["#bdebff","#0071ff","#00ff00","#ff8200","#ff0000"],
     demandWidth:[3,4,6,9,12],
     demandIsDisplay:[true,true,true,true,true],
      ///////////////////供水分界线/////////////////////////////////////////
      pipeSupplyAreaLimit:[1393378,1393379,1393373,1144896,1393374,1393375,1144895],
      pipeSupplyAreaColor:["#ff0000","#00c7ff","#a4bed4","#c61c84","#ff00c6","#00e7ee","#a4becc"],
      pipeSupplyAreaWidth:[6,6,6,6,6,6,6],
      pipeSupplyCompareAreaWidth:[2,2,2,2,2,2,2],
      pipeSupplyAreaIsDisplay:[true,true,true,true,true,true,true],
      pipeSupplyAreaLabels:['南山水厂','东湖水厂','笔架山水厂','盐田港水厂','梅林水厂','大涌新老水厂出水管总瞬时流量','沙头角水厂'],
     ///////////////////管龄/////////////////////////////////////////
     pipeAgeLimit:[5,10,15,20,25,30,'未知'],
     pipeAgeColor:["#00ffc6","#EEEE00","#005de7","#73aa00","#FF7F00","#EE00EE","#ff0000","#000000"],
     pipeAgeWidth:[2,3,4,5,6,7,8,1.5],
     pipeAgeIsDisplay:[true,true,true,true,true,true,true,true],
      ///////////////////管径分类/////////////////////////////////////////
    pipeDiameterLimit:[100,300,500,800,1000],
    pipeDiameterColor:["#00C7FF","#005DE7","#AD00E7","#39AA00","#FF8600","#E70000"],
    pipeDiameterWidth:[3,4,5,6,7,8],
    pipeDiameterIsDisplay:[true,true,true,true,true,true],
     ///////////////////管材分类///////////////////////////////////////// ,"#31A239","#94457B","#6B9E4A",'#31A2FF','#942C39','#8C5542','#A5AA39','#FF5500','#00FFC6','#4AAEB5','#AD5D21','#0071FF','#29A25A','#29AFF','#29FFFF','#FFA25A','#F9A25F','#2FF25A','#2FAFFA','#2FA2FF'
     pipeMaterialLimit:['未知','PE','PE承插管','PVC','薄壁不锈钢','镀锌管','刚塑复合管',
     '钢管','钢筋混凝土','钢丝网复合','高密度聚乙烯','灰口铸铁管','球磨铸铁管','塑料','铜管','硬聚氯乙烯','预应力钢管','铸铁'],
     pipeMaterialColor:["#A524AA","#A52484","#18388C","#847D42","#632CA5",
     "#00C7FF","#005DE7","#AD00E7","#39AA00","#FF8600","#E70000","#00ffc6","#EEEE00","#005de7","#73aa00","#FF7F00","#EE00EE","#ff0000"],
     pipeMaterialWidth:[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
     pipeMaterialIsDisplay:[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
    ///////////////////水龄/////////////////////////////////////////
    ageLimit:[24,48,72,96],
    ageColor:["#00ffc6","#005de7","#73aa00","#e79a00","#ff0000"],
    ageWidth:[1,2,3,4,5],
    ageIsDisplay:[true,true,true,true,true],
    ////////////////////压力波动////////////////////////////////////////////
    pressureChangColor:["#0000ff","#00ff00","#FFFF00","#FFB90F","#ff0000"],
    pressureChangLimit:[],
    pressureChangeIsDisplay:[true,true,true,true,true],
    ///////////////////流向变化次数/////////////////////////////////////////
    directionChangeLimit:[1,2,5,10],
    directionChangeColor:["#0000ff","#00FF00","#FFFF00","#FFB90F","#FF0000"],
    directionChangeWidth:[4,4,4,4,4],
    directionChangeIsDisplay:[true,true,true,true,true],
     ///////////////////停水管道/////////////////////////////////////////
     pipeStopWaterLimit:[1],
     pipeStopWaterColor:["#FF0000"],
     pipeStopWaterWidth:[3],
     pipeStopWaterIsDisplay:[true],
     ////////////////////模拟计算////////////////////////////////////////
     planCalPipeFlowIsDisplay:[true,true,true,true,true],
     planCalPipeVelocityIsDisplay:[true,true,true,true,true],
     ///////////////////////扩散分析/////////////////////////////////////
     diffusionColor:["#800000","#9e1c1c","#bf4343","#de7676","#ffb3b3"],
     diffusionWidth:[5,5,5,5,5],
     diffusionLevel:5,
     diffusionLimit:[],
     diffusionIsDisplay:[true,true,true,true,true],

     isDisplay:[true,true,true,true,true],

    spatialReference:2435,
    /**
     * 地图比例尺分类
     */
    myScale:[8000,20000],
    /**
     * 管道管径的分类
     */
    myDiameter:[100,300],
    layerId:{
         /**
         * 减压阀
         */
        'EN_PRVALVE':"0",
        /**
        * 流量阀
        */
        'EN_FCVALVE':"1",
        /**
        * 止回阀
        */
        'EN_CVALVE':"2",
        /**
        * 水泵
        */
        'EN_PUMP':"3",
        /**
        * 水池
        */
        'EN_TANK':"4",
        /**
        * 消火栓
        */
        'EN_HYDRANT':"5",
        /**
        * 阀门
        */
        'EN_VALVE':"6",
        /**
        * 节点
        */
        'EN_JUNCTION':"7",
        /**
        * 管道
        */
        'EN_PIPE':"8",
        'EN_PIPE_1':"9",
        'EN_PIPE_2':"10",

    }
      
}