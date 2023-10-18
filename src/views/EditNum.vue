<template>
  <div class="main">

    <el-form :model="Editform"
             status-icon
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <p class="tittle">房号信息</p>
      <div class="topsix">

        <el-form-item label="单元名称"
                      prop="unitname">
          <el-input v-model="Editform.unitname"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="幢号"
                      prop="buildnum">
          <el-input v-model="Editform.buildnum"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="楼层号"
                      prop="storeynum">
          <el-input v-model="Editform.storeynum"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="房号"
                      prop="homenum">
          <el-input v-model="Editform.homenum"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="住客姓名"
                      prop="homename">
          <el-input v-model="Editform.homename"
                    autocomplete="off"
                    @focus="dialogVisible=true"></el-input>
        </el-form-item>
        <el-form-item label="入住状态">
          <el-select @change="ch3"
                     :value="Editform.homestatus==null?'':(Editform.homestatus==1?'完好':'待维修')">
            <el-option label="入住"
                       value="1"></el-option>
            <el-option label="未入住"
                       value="2"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="twoarea">

        <div style="display: flex; justify-content: center;">
          <el-popover placement="top"
                      width="100"
                      trigger="hover"
                      popper-class="mypopover">
            <p style="font-size: 11px; font-weight: 700;">可填写房屋的详细信息介绍：<br>
              1.房屋的基本信息 <br>
              2.房屋的成员信息 <br>
              3.房屋的设备信息 <br>
              4.房屋未来的规划填报</p>
            <i slot="reference"
               class="el-icon-question"
               style="line-height: 40px; color: rgb(32, 160, 255);"></i>
          </el-popover>
          <el-form-item label="房屋信息"
                        label-width="80px">

            <el-input type="textarea"
                      placeholder="请输入内容"
                      v-model="Editform.homemessage"
                      style="width: 90vw;">
            </el-input>
          </el-form-item>
        </div>
        <div style="display: flex; justify-content: center;">
          <el-popover placement="top"
                      width="100"
                      trigger="hover"
                      popper-class="mypopover">
            <p style="font-size: 11px; font-weight: 700;">可对家庭成员的信息实时录入：<br>
              1.家庭的主要成员<br>
              2.家庭的主要成员的信息填报<br>
              3.家庭成员的健康信息状况<br>
              4.家庭成员每日健康体温检测填写</p>
            <i slot="reference"
               class="el-icon-question"
               style="line-height: 40px; color: rgb(32, 160, 255);"></i>
          </el-popover>
          <el-form-item label="家庭成员"
                        label-width="80px">

            <el-input type="textarea"
                      placeholder="请输入内容"
                      v-model="Editform.homesuggestion"
                      style="width: 90vw;">
            </el-input>
          </el-form-item>
        </div>
      </div>
      <p class="tittle">智能设备</p>
      <div class="topsix">
        <el-form-item label="洗衣机数量"
                      prop="washnum">
          <el-input v-model="Editform.washnum"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="WI-FI名称"
                      prop="wifiname">
          <el-input v-model="Editform.wifiname"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="空调数量"
                      prop="airnum">
          <el-input v-model="Editform.airnum"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="智能设备状态">
          <el-select @change="ch2"
                     :value="Editform.smartstatus==null?'':(Editform.smartstatus==1?'完好':'待维修')">
            <el-option label="完好"
                       value="1"></el-option>
            <el-option label="待维修"
                       value="2"></el-option>
          </el-select>
        </el-form-item>
      </div>

      <p class="tittle">家居设备</p>
      <div class="topsix">
        <el-form-item label="书桌数量"
                      prop="homedesk">
          <el-input v-model="Editform.homedesk"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="椅子数量"
                      prop="homechair">
          <el-input v-model="Editform.homechair"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="衣橱数量"
                      prop="homeclothes">
          <el-input v-model="Editform.homeclothes"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="家居设备状态">
          <el-select @change="ch1"
                     :value="Editform.familystatus==null?'':(Editform.familystatus==1?'完好':'待维修')">
            <el-option label="完好"
                       value="1"></el-option>
            <el-option label="待维修"
                       value="2"></el-option>
          </el-select>
        </el-form-item>
      </div>
    </el-form>
    <div>
      <el-dialog title="提示"
                 :visible.sync="dialogVisible"
                 width="60%"
                 :before-close="handleClose">
        <div>
          <el-radio-group v-model="selectedOption">
            <el-radio label="option1">选项1</el-radio>
            <el-radio label="option2">选项2</el-radio>
          </el-radio-group>

          <div v-if="selectedOption === 'option1'">
            <el-form>
              <el-form-item>
                <el-input v-model="Editform.homename"
                          autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
          </div>

          <div v-if="selectedOption === 'option2'">
            <!-- 选项2对应的页面内容 -->

            <!-- <el-table :id="'mytable'"
                      :data="tableData"
                      stripe
                      style="width: 100%"
                      @selection-change="select">

              <el-table-column prop="unitname"
                               label="单元名称"
                               width="180">
                <template scope="scope">
                  {{ scope.row.unitname||'暂无' }}
                </template>
              </el-table-column>
              <el-table-column prop="buildnum"
                               label="幢号"
                               width="180">
                <template scope="scope">
                  {{ scope.row.buildnum||'暂无' }}
                </template>
              </el-table-column>
              <el-table-column prop="storeynum"
                               label="楼层号">
                <template scope="scope">
                  {{ scope.row.storeynum||'暂无' }}
                </template>
              </el-table-column>
              <el-table-column prop="homenum"
                               label="房号">
                <template scope="scope">
                  {{ scope.row.homenum||'暂无' }}
                </template>
              </el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini"
                             @click="editnum(scope.row)">编辑</el-button>
                  <el-button size="mini"
                             type="danger"
                             @click="Delete(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table> -->

          </div>

        </div>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <div>
      <el-button type="primary"
                 @click="sub">保存</el-button>
      <el-button @click="back">返回</el-button>
    </div>
  </div>
</template>

<script>
import { ShowHouseUtil, UpdataHouses, GetUserList } from '../api/home'
export default {
  data () {
    return {
      selectedOption: 'option1',
      dialogVisible: true,
      ruleForm: {
        pass: '',
        checkPass: '',
        age: ''
      },
      Editform: {
        airnum: '123',//空调数量
        buildnum: "666",//幢号
        familystatus: '2',//家居设备状态
        homechair: '123',//椅子数量
        homeclothes: '123',//衣橱数量
        homedesk: '123',//桌子数量
        homemessage: "111",//房屋信息
        homename: "555",//住客名称
        homenum: '777',//房号
        homestatus: '1',//入住状态
        homesuggestion: "222",//家庭成员
        id: '2473',//id
        smartstatus: '1',//智能设备状态
        storeynum: '12',//楼层号
        unitcontext: null,//描述（来自富文本）
        unitname: "维尔亚",//单元名称
        unitnum: '6',//
        unitstatus: '1',//建成状态（状态）
        washnum: '123',//洗衣机数量
        wifiname: "123"//wifi名称
      },

      Userlist: {
        username: '',
        currPage: 0,
        pageNum: 7
      },
      UsersData: {

      }
      , userstotal: 0
    }
  },
  mounted () {
    ShowHouseUtil({ id: this.$route.params.id, token: sessionStorage.getItem('token') }).then((result) => {
      this.Editform = result[0]

    }).catch((err) => {

    });
    GetUserList(this.Userlist).then((result) => {
      console.log(result);
      thia.UsersData = result.data
      thia.userstotal = result.total
    }).catch((err) => {

    });

  },
  methods: {
    ch1 (e) {
      this.Editform.familystatus = e
    },
    ch2 (e) {
      this.Editform.smartstatus = e
    },
    ch3 (e) {
      this.Editform.homestatus = e
    },
    sub () {
      this.$confirm('此操作将保存修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        UpdataHouses({ ...this.Editform, token: sessionStorage.getItem('token'), h_id: this.Editform.id }).then((result) => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
          this.$router.push('/house/number')
        }).catch((err) => {

        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消保存'
        });
      });
    },
    back () {
      this.$router.push('/house/number')

    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    }

  }

}

</script>

<style>
.main {
  margin: 20px;
  padding: 20px;
}
.topsix {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.twoarea {
  display: grid;
  grid-template-columns: 1fr;
}
.tittle {
  margin: 0;
  padding: 0;
  font-size: 20px;
  font-weight: 700;
  border-left: 5px solid rgb(32, 160, 255);
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  margin-bottom: 30px;
}
.el-input {
  width: 40vw;
}
.mypopover {
  border: 1px solid black;
  font-size: 10px; /* 更改内容文字的大小 */
}
</style>