<template>
    <div class="urgent-wrapper">
        <div class="moni clearfix">
            <div style="float:left;height:40px;line-height:40px;" class="fontEd">停水后应急调度方案</div>
            <el-button @click="energyapi" type="success" class="mnfx">应急调度</el-button>
        </div>
        <div class="outer">
            <h4>调度方案列表</h4>
            <reduction-scheme></reduction-scheme>
        </div>
         <div class="affectd_users">
                <div class="table-wrapper-out">
                   <div class="titlebox">
                          <div class="presurecontrolarea"> 压力控制点压力</div>
                          <div class="btn-wrapper">
                            <div class="btn" ><el-button type="text" @click="dialogFormVisible = true"><i class="add"></i><span class="addfont">添加</span></el-button></div>
                         </div>
                  </div>
                  <!--   <div><h4>管网控制点压力列表</h4><div>添加</div></div> -->
                    <div class="table-wrapper">
                        <el-table :data="affectedDate" style="width: 100%" stripe :header-row-style="headerStyle" :row-style="rowStyle" height="95%">
                            <el-table-column prop="CodeId" label="编号"></el-table-column>
                            <el-table-column prop="PressureName" label="压力点名称"></el-table-column>
                            <el-table-column prop="StartTime" label="起始时间"></el-table-column>
                            <el-table-column prop="EndTime" label="终止时间"></el-table-column>
                            <el-table-column prop="CroPressure" label="目标压力（Mpa）"></el-table-column>
                            <el-table-column prop="CtPressure" label="结果压力（Mpa）"></el-table-column>
                            <el-table-column prop="donePress" label="操作">
                               <template slot-scope="scope">
                          <el-button
                            @click.native.prevent="deleteRow(scope.$index, affectedDate)"
                            type="text"
                            size="small">
                            <div class="deleteBtn"></div>
                          </el-button>
                        </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="pagination-wrapper">
                    <span style="float:left;line-height: 1;padding-top: 14px;">共&nbsp;{{affectedDate.length}}&nbsp;条</span>
                    <el-pagination
                        layout="prev, pager, next"
                        :total="affectedDate.length"
                        :page-size="5"
              
                        @current-change="handleCurrentChange"
                    >
                    </el-pagination>
                </div>
            
              <div class="tanchupart">
       <el-dialog title="压力控制点添加" :visible.sync="dialogFormVisible" width="400px" custom-class="inner-lay" modal modal-append-to-body close-on-click-modal center>
                <el-form :model="form">
                    <el-form-item label="压力控制点名称" :label-width="formLabelWidth">
                    <el-select v-model="form.region1"  placeholder="请选择压力控制点名称">
                       <el-option
                            v-for="(item,index) in affectedDate"
                            :key="item.id"
                            :label="item.PressureName"
                            :value="index">
                        </el-option>
                    </el-select>
                    </el-form-item> 
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click.native="addOne">确 定</el-button>
                </div>
                </el-dialog>


    </div>

            </div>
    </div>
</template>
<script>
import ReductionScheme from "./ReductionScheme.vue";
import urlClass from '@/components/js/UrlClass'
import Bus from "@/bus.js"
export default {
  components: { ReductionScheme },
  data() {
    let affDate = () => {
      let arr = [];
      for (let i = 0; i < 100; i++) {
        arr.push({
          rowNo: "ZK0554",
          pressPoint: "压力点01",
          curPress: "0.43",
          ctrlPress: "0.15",
          donePress: "0.58"
        });
      }
      return arr;
    };
    return {
      page_total: 100,
      currentPage: 1, //默认显示第一页
       curCodeId: "",
      form: {
        region1: "",
  
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
      currentPage: 1, //默认显示第一页
      pageSize: 5, //默认每页显示10条
   
      headerStyle() {
        return {
          height: "40px",
          "line-height": "40px",
          "background-color": "#f0f0f1",
          color: "#778392"
        };
      },
      rowStyle() {
        return {
          height: "40px",
          "line-height": "40px",
          color: "#6e7b8b"
        };
      },
      affectedDate:[]
    };
  },
  created() {
    this.info = this.affectedDate.slice(0, 5);
  },
  methods: {
      handleCurrentChange(val) {
     /*  console.log(`当前页: ${val}`); */
      this.info = this.affectedDate.slice(5 * val - 5, 5 * val);
    },
    deleteRow(index, rows) {
        rows.splice(index, 1);
      },
    energyapi() {
      var _this = this;
      _this.$axios
        .post(urlClass.axiosUrlYJ + "EmergencyDispatchCALC")
        .then(res => {
          console.log(res) 
          Bus.$emit("energyapinum", res.data.Data);
        })
        .catch(error => {
          console.log(error);
        });
        _this.presurepointapi()
    },
    presurepointapi() {
      var _this = this;
      _this.$axios
        .post(urlClass.axiosUrlYJ + "EmergencyPressurePoint")
        .then(res => {
    _this.affectedDate=res.data.PressurePointList
          console.log(res)
        })
        .catch(error => {
          console.log(error);
        });
    },
    addOne() {
      this.dialogFormVisible = false;
    /*   var aaa={
         CodeId: "被添加的3SZKKLLKK00012a",
          PressureName: "被添加的3",
          RtPressure: "加0.64",
          sj: "0.54",
          img1
        } */
       var aaa=this.affectedDate[this.form.region1]
        this.affectedDate.push(aaa)
    },
  }
};
</script>
<style lang="less" scoped>
.clearfix:after {
  content: "";
  display: block;
  visibility: hidden;
  clear: both;
}
.clearfix {
  zoom: 1;
}
.fontEd {
  font-size: 14px;
  font-weight: bold;
  color: #6e7b8b;
}
.urgent-wrapper {
  height: calc(~"100% - 70px");
}
h4 {
  margin: 0 0 20px;
  padding: 0;
  font-size: 12px;
  color: #6e7b8b;
  line-height: 1;
  padding-bottom: 15px;
  border-bottom: 1px solid #d1d1da;
}
.titlebox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 51.56875vw;
  height: 40px;
  border-bottom: 1px #e4e4ec solid;
  margin-bottom: 15px;
}
.presurecontrolarea {
  color: #788493;
  font: bold 12px/40px "微软雅黑";
}
.add {
    display: inline-block;
  width: 15px;
  height: 15px;
  background: url("../../../assets/add.png") no-repeat;
  background-position: 1px 0px;
  margin: 0px 5px -4px 0px;
 cursor: pointer;
}
.addfont {
  color: #b3b3bb;
  font: bold 12px/40px "微软雅黑";
  cursor: pointer;
}
.moni {
  height: 40px;
  padding: 0 20px;
  border-bottom: 1px solid #d1d1da;
  box-sizing: border-box;
  .mnfx {
    float: right;
    font-size: 14px;
    color: #fff;
    font-weight: bold;
    text-align: center;
    height: 26px;
    margin-top: 7px;
  }
}
.outer {
  padding: 20px;
}

.affectd_users {
  height: calc(~"100% - 460px");
  .table-wrapper-out {
    padding: 0 20px;
    box-sizing: border-box;
    height: calc(~"100% - 20px");
  }

  h4 {
    margin: 0;
    padding: 0;
    font-size: 12px;
    color: #6e7b8b;
    line-height: 1;
    padding-bottom: 15px;
    border-bottom: 1px solid #d1d1da;
  }
  .table-wrapper {
    margin-top: 20px;
    height: calc(~"100% - 48px");
  }
}
</style>
<style lang="less">
.affectd_users {
  .pagination-wrapper {
    height: 40px;
    border-top: 1px solid #d1d1da;
    box-sizing: border-box;
    padding: 0 20px;
    .el-pagination {
      padding-top: 6px;
      box-sizing: border-box;
      display: inline-block;
      float: right;
    }
  }
}
.deleteBtn {
  width: 12px;
  height: 16px;
  background: url("../../../assets/delete.png") no-repeat;
  cursor: pointer;
}
</style>
