<template>
    <div class="box">
        <div class="controlface">控制面板</div>
         <!--  <div class="better"></div> -->
          <div><el-button type="text" @click="dialogFormVisible = true"><img src="../../../assets/img/深水_日常调度_切图_05.png" alt=""></el-button>
                <el-dialog title="压力控制点添加" :visible.sync="dialogFormVisible" width="400px">
                <el-form :model="form">
                    <el-form-item label="压力控制点名称" :label-width="formLabelWidth">
                    <el-select v-model="form.region1" @change="HandleValueChange" placeholder="请选择压力控制点名称">
                       <el-option
                            v-for="item in addOptions"
                            :key="item.CodeId"
                            :label="item.PressureName"
                            :value="item.CodeId">
                        </el-option>
                    </el-select>
                    </el-form-item>
                     <el-form-item label="起始时间"  :label-width="formLabelWidth">
                    <el-select v-model="form.region2" @change="HandleValueChangebegintime" placeholder="请选起始时间">
                         <el-option
                            v-for="item in begintime"
                            :key="item.TimeId"
                            :label="item.Time"
                            :value="item.TimeId">
                        </el-option>
                    </el-select>
                    </el-form-item>
                     <el-form-item label="终止时间" :label-width="formLabelWidth">
                    <el-select v-model="form.region3" @change="HandleValueChangeEndtime" placeholder="请选择终止时间">
                       <el-option
                            v-for="item in endtime"
                            :key="item.ETimeId"
                            :label="item.ETime"
                            :value="item.ETimeId">
                        </el-option>
                    </el-select>
                    </el-form-item>
                     <el-form-item label="目标压力" :label-width="formLabelWidth" >
                    <el-input v-model="form.name" autocomplete="off" class="inputwidth"><template slot="append">MPa</template></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
                </el-dialog>
            </div>
      <!--   <div class="better">优化调度</div> -->
    </div>
</template>
<script>
export default {
  name: "Control",
  data() {
    return {
      dialogTableVisible: false,
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
      begintime: [
        {
          TimeId: 1,
          Time: "10:20:20"
        },
        {
          TimeId: 2,
          Time: "11:20:20"
        },
        {
          TimeId: 3,
          Time: "12:20:20"
        },
        {
          TimeId: 4,
          Time: "13:20:20"
        }
      ],
      curTimeId: "",
      endtime: [
        {
          ETimeId: 1,
          ETime: "10:20:20"
        },
        {
          ETimeId: 2,
          ETime: "11:20:20"
        },
        {
          ETimeId: 3,
          ETime: "12:20:20"
        },
        {
          ETimeId: 4,
          ETime: "13:20:20"
        }
      ],
      curETimeId: "",
      form: {
        name: "",
        region1: "",
        region2: "",
        region3: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "100px"
    };
  },
  methods: {
    HandleValueChange(v) {
      let self = this;
      this.curCodeId = v;
      this.addOptions.forEach(function(ele, index) {
        if (ele.curCodeId === v) {
          self.form.target = ele.CtPressure;
          self.selectedOption = ele || {};
        }
      });
    },
    HandleValueChangebegintime(v) {
      let self = this;
      this.curTimeId = v;
      this.begintime.forEach(function(ele, index) {
        if (ele.curTimeId === v) {
          self.form.target = ele.CtPressure;
          self.selectedOption = ele || {};
        }
      });
    },
    HandleValueChangeEndtime() {
      let self = this;
      this.curETimeId = v;
      this.endtime.forEach(function(ele, index) {
        if (ele.curETimeId === v) {
          self.form.target = ele.CtPressure;
          self.selectedOption = ele || {};
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.box {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  min-width: 980px;
  height: 48px;
  border: 1px #e4e4ec solid;
}
.controlface {
  font-size: 18px;
  font-family: "微软雅黑";
  font-weight: bold;
  color: #788493;
}
.better {
  width: 100px;
  height: 30px;
  /*  background-color: #70991f; */
  border-radius: 5px;
  /*  font-size: 14px;
   text-align: center;
   line-height: 30px;
    font-family: "微软雅黑";
    color:#fff;  */
  cursor: pointer;
  margin: 10px -80px 0px 0px;
}
.inputwidth {
  width: 170px;
}
</style>


