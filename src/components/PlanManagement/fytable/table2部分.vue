<template>
  <div class="outbox" :style="{height:(listoutboxHeight-95-80-68)+'px'}">
     <div class="tableoutbox" :style="{height:(listoutboxHeight-95-100-48)+'px'}">
          <div class="titlebox">
          <div class="presurecontrolarea"> 压力控制点压力</div>
          <div class="btn-wrapper">
            <div class="btn" ><el-button type="text" @click="dialogFormVisible = true"><i class="add"></i><span class="addfont">添加</span></el-button></div>
          </div>
      </div>
     <div class="tablebox">
        <el-table
                :data="tableData"
                :default-sort = "{prop: 'RtPressure', order: 'ascending'}"
                empty-text
                style="width: 100%" stripe :header-cell-style="headerStyle" :row-style="rowStyle" height="100%"
                element-loading-spinner="el-icon-loading" element-loading-background="rgba(143, 188, 143, 0.8)">
                <el-table-column
                    prop="CodeId"
                    label="编号"      
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="PressureName"
                    label="压力点名称"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="RtPressure"
                    sortable
                    label="全天最低压力（MPa）"
                    min-width="100">
                    <template slot-scope="scope">
                            <div class="slotoutbox1">
                                <div class="slotinbox11" :class="scope.row.PressureName<=3?'specialcolor':''">{{scope.row.RtPressure}}</div>
                                <div class="slotinbox12"  @click="showecharts(scope.row,scope.column)"></div>
                            </div>
                      </template>
                </el-table-column>
                <el-table-column
                          prop="sj"
                          label="操作"
                          min-width="100">
                        <template slot-scope="scope">
                          <el-button
                            @click.native.prevent="deleteRow(scope.$index, tableData)"
                            type="text"
                            size="small">
                            <div class="deleteBtn"></div>
                          </el-button>
                        </template>
                </el-table-column>
          </el-table>
      </div>
      <div class="fenpagebox">
            <div class="totalnum">共<span>{{tableData.length}}</span>条</div>
            <div class="block">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :page-size="5"
                  layout="prev, pager, next"
                  :total="24">
                </el-pagination>
            </div>
      </div>

    <div class="tanchupart">
       <el-dialog title="压力控制点添加" :visible.sync="dialogFormVisible" width="400px" custom-class="inner-lay" modal modal-append-to-body close-on-click-modal center>
                <el-form :model="form">
                    <el-form-item label="压力控制点名称" :label-width="formLabelWidth">
                    <el-select v-model="form.region1"  placeholder="请选择压力控制点名称">
                       <el-option
                            v-for="item in addOptions"
                            :key="item.CodeId"
                            :label="item.PressureName"
                            :value="item.CodeId">
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
import img1 from "../../../assets/add.png";
import Bus from "@/bus.js";
export default {
  name: "Table2",
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

      tableData: [
        {
          bh: "SZKKLLKK00012a",
          name: "1",
          mb: "0.65",
          sj: "0.54",
          img1
        },
        {
          bh: "SZKKLLKK00012b",
          name: "2",
          mb: "0.66",
          sj: "0.54",
          img1
        },
        {
          bh: "SZKKLLKK00012c",
          name: "3",
          mb: "0.68",
          sj: "0.54",
          img1
        },
        {
          bh: "SZKKLLKK00012d",
          name: "4",
          mb: "0.64",
          sj: "0.54",
          img1
        },
        {
          bh: "SZKKLLKK00012e",
          name: "5",
          mb: "0.64",
          sj: "0.54",
          img1
        },
        {
          bh: "SZKKLLKK00012",
          name: "6",
          mb: "0.64",
          sj: "0.54",
          img1
        },
        {
          bh: "SZKKLLKK00012f",
          name: "7",
          mb: "0.98",
          sj: "0.54",
          img1
        },
        {
          bh: "SZKKLLKK00012g",
          name: "8",
          mb: "0.64",
          sj: "0.54"
        },
        {
          bh: "SZKKLLKK00012h",
          name: "9",
          mb: "0.64",
          sj: "0.54",
          img1
        },
        {
          bh: "SZKKLLKK00012i",
          name: "10",
          mb: "0.64",
          sj: "0.54",
          img1
        },
        {
          bh: "SZKKLLKK00012j",
          name: "11",
          mb: "0.64",
          sj: "0.54",
          img1
        },
        {
          bh: "SZKKLLKK00012k",
          name: "12",
          mb: "0.64",
          sj: "0.54",
          img1
        },
        {
          bh: "SZKKLLKK00012m",
          name: "13",
          mb: "0.64",
          sj: "0.54",
          img1
        },
        {
          bh: "SZKKLLKK00012",
          name: "14",
          mb: "0.64",
          sj: "0.54",
          img1
        },
        {
          bh: "SZKKLLKK00012",
          name: "15",
          mb: "0.64",
          sj: "0.54",
          img1
        },
        {
          bh: "SZKKLLKK00012",
          name: "16",
          mb: "0.64",
          sj: "0.54",
          img1
        },
        {
          bh: "SZKKLLKK00012",
          name: "17",
          mb: "0.64",
          sj: "0.54",
          img1
        },
        {
          bh: "SZKKLLKK00012",
          name: "18",
          mb: "0.64",
          sj: "0.54",
          img1
        },
        {
          bh: "SZKKLLKK00012",
          name: "19",
          mb: "0.64",
          sj: "0.54",
          img1
        },
        {
          bh: "SZKKLLKK00012",
          name: "20",
          mb: "0.64",
          sj: "0.54",
          img1
        },
        {
          bh: "SZKKLLKK00012",
          name: "21",
          mb: "0.64",
          sj: "0.54",
          img1
        },
        {
          bh: "SZKKLLKK00012",
          name: "22",
          mb: "0.64",
          sj: "0.54",
          img1
        },
        {
          bh: "SZKKLLKK00012",
          name: "23",
          mb: "0.64",
          sj: "0.54",
          img1
        },
        {
          bh: "SZKKLLKK00012z",
          name: "24",
          mb: "0.64",
          sj: "0.54",
          img1
        }
      ],
      dialogFormVisible: false,
      addOptions: [
        {
          CodeId: 1,
          PressureName: "深南大道"
        },
        {
          CodeId: 2,
          PressureName: "深南大道2"
        },
        {
          CodeId: 3,
          PressureName: "深南大道3"
        }
      ],
      curCodeId: "",
      form: {
        region1: "",
  
      },
      formLabelWidth: "120px",
      currentPage: 1, //默认显示第一页
      pageSize: 5 //默认每页显示10条
    };
  },
  created() {
    this.info = this.tableData.slice(0, 5);
  },
    mounted() {
    this.listoutboxHeight = document.documentElement.clientHeight - 344;
    var that = this;
    window.onresize = function() {
      that.listoutboxHeight = document.documentElement.clientHeight - 344; 
    };
    Bus.$on("info4", e => {
       var that = this;
      that.tableData = e.Data; /* 　console.log(`传来的数据是：${e}`)*/
      /* 　console.log(`传来的数据是：${PressureName}`)*/
    });
  },
  methods: {
    deleteRow(index, rows) {
        rows.splice(index, 1);
      },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.info = this.tableData.slice(5 * val - 5, 5 * val);
    },
    
   addOne() {
      this.dialogFormVisible = false;
      var aaa={
         CodeId: "被添加的3SZKKLLKK00012a",
          PressureName: "被添加的3",
          RtPressure: "加0.64",
          sj: "0.54",
          img1
        }
        this.tableData.push(aaa)
    },
 showecharts(val){
   console.log(val);
   alert(val.CodeId)
 }
  }
};
</script>
<style>
.el-dialog__header {
    display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
 /*  width: 400px; */
  height: 30px;
  /*   padding: 20px 20px 10px; */
}
.el-dialog__title {
    font-size: 12px;
    font-family: "微软雅黑"
}
.el-dialog__footer {
    padding: 0px 20px 20px;
   
}
   .el-pager li {
        color:#6e7b8b
    }
    .el-pager li.active {
    color: #6e7b8b;
    cursor: default;
}
.el-button.el-button--mini {
   
    height: 28px;
    width: 70px;
}
</style>

<style scoped>
.outbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 70.66875vw;
  height: 42vh;
   margin-left: 20px;
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
  width: 70.66875vw;
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
  background: url("~@/assets/img/add.png") no-repeat;
  background-position: 1px 0px;
  margin: 0px 5px -4px 0px;
 cursor: pointer;
}
.addfont {
  color: #b3b3bb;
  font: bold 12px/40px "微软雅黑";
  cursor: pointer;
}
.fenpagebox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  /*  background-color: aqua; */
  width: 70.66875vw;
  height: 40px;
  margin-top: 10px;
}
.tablebox {
  width: 70.66875vw;
  height: 27.077399vh;
}
.block {
  margin-top: 10px; color: #788493;
  font: bold 12px/40px "微软雅黑";
}
.totalnum{
     color: #788493;
  font: bold 12px/40px "微软雅黑";
}
.deleteBtn {
  width: 12px;
  height: 16px;
  background: url("~@/assets/delete.png") no-repeat;
  cursor: pointer;
}
.slotoutbox1{
    display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 110px;
}
.slotinbox11{
     width:60px;
     height: 26px;
     line-height: 26px;
     text-align: start;
     border-radius: 2px;
     padding-left: 10px;
}
.slotinbox12{
    width:16px;
     height: 20px;
     background: url("~@/assets/曲线01.png") no-repeat;
      cursor: pointer;
}
.slotinbox12:hover{
     width:16px;
     height: 20px;
     background: url("~@/assets/曲线02.png") no-repeat;
      cursor: pointer;
}
.specialcolor{
background-color: red;
color: #fff
}
.inputwidth {
  width: 170px;
}
</style>

