<template>
  <div>
    <div class="main">
      <div class="leftview">
        <el-form :model="parkdata"
                 status-icon
                 label-position="top"
                 label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="车位名"
                        prop="pass">
            <el-input v-model="parkdata.parkname"
                      autocomplete="off"
                      class="wid"></el-input>
          </el-form-item>
          <el-form-item label="车位金额"
                        prop="checkPass">
            <el-input v-model="parkdata.parkpay"
                      autocomplete="off"
                      class="wid"></el-input>
          </el-form-item>

          <el-form-item label="车位类型">
            <el-select v-model="parkdata.parktype"
                       placeholder="请选择车位类型"
                       class="wid">
              <el-option label="地上"
                         value="1"></el-option>
              <el-option label="地下"
                         value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车位状态">
            <el-select v-model="parkdata.parkstatus"
                       placeholder="请选择车位状态"
                       class="wid">
              <el-option label="已有车"
                         value="1"></el-option>
              <el-option label="未有车"
                         value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="search()">查询</el-button>
            <el-button @click="reset()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="rightview">
        <div class="tit">
          <p>车位信息</p>
          <el-button @click="openadd">新增</el-button>
        </div>
        <el-table :data="tableData"
                  stripe
                  style="width: 100%">
          <el-table-column type="index"
                           label="序号"
                           width="50">
          </el-table-column>
          <el-table-column prop="parkname"
                           label="车位名称"
                           sortable
                           width="100">
          </el-table-column>
          <el-table-column prop="parkpay"
                           label="车位金额"
                           sortable
                           width="100">
          </el-table-column>
          <el-table-column prop="parktype"
                           label="车位类型"
                           width="180">
            <template scope="scope">
              <el-switch v-model="scope.row.parktype"
                         @change="changepark(scope.row)"
                         active-text="地上"
                         inactive-text="地下">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="parkstatus"
                           label="车位状态"
                           width="180">
            <template scope="scope">
              <el-switch v-model="scope.row.parkstatus"
                         @change="changepark(scope.row)"
                         active-text="已有车"
                         inactive-text="未有车">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="address"
                           label="操作"
                           width="380">
            <template scope="scope">
              <el-button size="mini"
                         icon="el-icon-share"
                         :disabled="scope.row.parkstatus"
                         @click="openuserlist(scope.row)">分配车位</el-button>
              <el-button size="mini"
                         icon="el-icon-edit"
                         @click="openeditui(scope.row)">编辑</el-button>
              <el-button size="mini"
                         icon="el-icon-delete"
												 @click="">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">

          <el-pagination @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :page-sizes="[9, 10, 20, 30]"
                         :page-size="parkdata.pageNum"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="parktotal">
          </el-pagination>
        </div>
      </div>

    </div>
    <el-dialog title="提示"
               :visible.sync="adddilog"
               width="30%"
               :before-close="handleClose">

      <el-form :model="addparkdata"
               status-icon
               label-position="top"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="车位名"
                      prop="pass">
          <el-input v-model="addparkdata.parkname"
                    autocomplete="off"
                    class="wid"></el-input>
        </el-form-item>
        <el-form-item label="车位金额"
                      prop="checkPass">
          <el-input v-model="addparkdata.parkpay"
                    autocomplete="off"
                    class="wid"></el-input>
        </el-form-item>

        <el-form-item label="车位类型">
          <el-select v-model="addparkdata.parktype"
                     placeholder="请选择车位类型"
                     class="wid">
            <el-option label="地上"
                       value="1"></el-option>
            <el-option label="地下"
                       value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车位状态">
          <el-select v-model="addparkdata.parkstatus"
                     placeholder="请选择车位状态"
                     class="wid">
            <el-option label="已有车"
                       value="1"></el-option>
            <el-option label="未有车"
                       value="2"></el-option>
          </el-select>
        </el-form-item>

      </el-form>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addpark">确 定</el-button>
      </span>
    </el-dialog>
    <el-drawer :visible.sync="drawervisable"
               direction="ltr"
               custom-class="widthhhh">
      <h1>车位分配</h1>
      <div style="display: flex; justify-content: center; flex-direction: center;">
        <el-table :data="usertabledata"
                  stripe
                  highlight-current-row
                  style="width: 100%"
                  ref="multipleTable_select"
                  class="el-ov-single-checkbox-table"
                  @select="handleSelect_select">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>

          <el-table-column type="index"
                           label="序号"
                           width="50">
          </el-table-column>
          <el-table-column prop="username"
                           label="用户账号"
                           width="120">
          </el-table-column>
          <el-table-column prop="homeaddress"
                           label="家庭住址"
                           width="120">
          </el-table-column>
          <el-table-column prop="type"
                           label="类型"
                           width="100">
            <template scope="scope">
              {{ scope==1?'管理员':'普通用户' }}
            </template>
          </el-table-column>
          <el-table-column prop="parkname"
                           label="车位"
                           width="100">
          </el-table-column>
        </el-table>

      </div>
      <div class="block">

        <el-pagination @size-change="userpagsizeChange"
                       @current-change="userCurrentChange"
                       :page-sizes="[10, 20, 30, 40]"
                       :page-size="userdata.pageNum"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="usertotal">
        </el-pagination>
      </div>
      <div>
        <el-button type="primary"
                   @click="drawervisable=false">取消</el-button>
        <el-button type="primary"
                   @click="submituserpark">确定</el-button>

      </div>
    </el-drawer>
    <el-dialog title="提示"
               :visible.sync="editVisible"
               width="30%">

      <el-form :model="editdata"
               status-icon
               label-position="top"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="车位名"
                      prop="pass">
          <el-input v-model="editdata.parkname"
                    autocomplete="off"
                    class="wid"></el-input>
        </el-form-item>
        <el-form-item label="车位金额"
                      prop="checkPass">
          <el-input v-model="editdata.parkpay"
                    autocomplete="off"
                    class="wid"></el-input>
        </el-form-item>

        <el-form-item label="车位类型">
          <el-select v-model="editdata.parktype"
                     placeholder="请选择车位类型"
                     class="wid">
            <el-option label="地上"
                       value="1"></el-option>
            <el-option label="地下"
                       value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车位状态">
          <el-select v-model="editdata.parkstatus"
                     placeholder="请选择车位状态"
                     class="wid">
            <el-option label="已有车"
                       value="1"></el-option>
            <el-option label="未有车"
                       value="2"></el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="editpark">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { GetParkData, GetUsersdata } from '@/api';
import { AddParkData, EditParkData, UserParkData } from '../api/park'
export default {
  data () {
    return {
      addparkdata: {
        parkname: '',
        parkpay: '',
        parktype: '',
        parkstatus: '',
        token: sessionStorage.getItem('token')
      },
      parkdata: {
        parkname: '',
        parkpay: '',
        parktype: '',
        parkstatus: '',
        currPage: 0,
        pageNum: 9
      },
      userdata: {
        currPage: 0,
        pageNum: 10
      },
      editdata: {},
      usertabledata: [],
      usertotal: 0,
      parktotal: 0,
      tableData: [],
      adddilog: false,
      drawervisable: false,
      editVisible: false,
      //分配车位
      userparkdata: {
        u_id: 0,
        parkId: 0,
        parkname: '',
        parkstatus: 0,
        token: sessionStorage.getItem('token')
      },
      userparktype: 0
    }


  }, mounted () {
    GetParkData(this.parkdata).then((result) => {
      console.log(result);
      this.tableData = result.data
      this.parktotal = result.total
      this.tableData.map(item => { item.parktype = this.TorF(item.parktype) })
      this.tableData.map(item => { item.parkstatus = this.TorF(item.parkstatus) })
    }).catch((err) => {

    });
    GetUsersdata(this.userdata).then((result) => {
      console.log(result);
      this.usertabledata = result.data
      this.usertotal = result.total
    }).catch((err) => {

    });
  }, methods: {
    search () {
      GetParkData(this.parkdata).then((result) => {
        console.log(result);
        this.tableData = result.data
        this.parktotal = result.total
        this.tableData.map(item => { item.parktype = this.TorF(item.parktype) })
        this.tableData.map(item => { item.parkstatus = this.TorF(item.parkstatus) })
      }).catch((err) => {

      });
    },
    searchuser () {
      GetUsersdata(this.userdata).then((result) => {
        console.log(result);
        this.usertabledata = result.data
        this.usertotal = result.total
      }).catch((err) => {

      });
    },
    handleSelect_select (selection, row) {
      //清空所有选中
      this.$refs.multipleTable_select.clearSelection();
      //选中当前checkbox
      this.$refs.multipleTable_select.toggleRowSelection(row, true);
      //保存当前选中的对象
      console.log(row);
      this.userparkdata.u_id = row.id
    },


    reset () {
      this.parkdata = {
        parkname: '',
        parkpay: '',
        parktype: '',
        parkstatus: '',
        currPage: 0,
        pageNum: 9
      }
    },

    handleSizeChange (e) {
      this.parkdata.pageNum = e
      this.search()
    }, handleCurrentChange (e) {
      this.parkdata.currPage = e - 1
      this.search()
    },
    userpagsizeChange (e) {
      this.userdata.pageNum = e
      this.searchuser()
    }, userCurrentChange (e) {
      this.userdata.currPage = e - 1
      this.searchuser()
    },


    openadd () {
      this.adddilog = true
    },
    addpark () {
      AddParkData(this.addparkdata).then((result) => {
        console.log(result);
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.adddilog = false
      }).catch((err) => {

      });
    },
    TorF (e) {
      console.log(e);
      if (e == 1) {
        return true
      } else {
        return false
      }
    },
    changepark (row) {
      console.log(row);
      this.editdata.u_id = row.id
      this.editdata.parkname = row.parkname
      this.editdata.parktype = row.parktype ? '1' : '2'
      this.editdata.parkstatus = row.parkstatus ? '1' : '2'
      this.editdata.token = sessionStorage.getItem('token')
      EditParkData(this.editdata).then((result) => {
        this.$message({
          message: '修改成功',
          type: 'success'
        });
      }).catch((err) => {

      });
    },
    openuserlist (row) {
      console.log(row);
      this.userparkdata.parkId = row.id
      this.userparkdata.parkname = row.parkname
      this.userparkdata.parkstatus = row.parkstatus ? '1' : '0'
      this.userparktype = row.parktype ? 0 : 1
      this.drawervisable = true

    },
    submituserpark () {


      this.$confirm('确定修改车位?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        UserParkData(this.userparkdata).then((result) => {
          this.$message({
            type: 'success',
            message: `${result}!`
          });
          this.drawervisable = false
          let editdata = {}
          editdata.u_id = this.userparkdata.parkId
          editdata.parkname = this.userparkdata.parkname
          editdata.parktype = this.userparktype
          editdata.parkstatus = '1'
          editdata.token = sessionStorage.getItem('token')
          EditParkData(editdata)
          this.search()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        });
      });

    },
    openeditui (row) {
      this.editVisible = true
      this.editdata.u_id = row.id
      this.editdata.parkname = row.parkname
      this.editdata.parktype = row.parktype ? '1' : '2'
      this.editdata.parkstatus = row.parkstatus ? '1' : '2'
      this.editdata.token = sessionStorage.getItem('token')

    },
    editpark () {
      EditParkData(this.editdata).then((result) => {
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.editVisible = false
        this.search()
      }).catch((err) => {

      });
    }

  }

}
</script>

<style lang="less" >
.leftview {
  width: 30vw;
}
.rightview {
  width: 60vw;
}
.wid .el-input__inner {
  width: 25vw;
}
.main {
  margin: 20px;
  padding: 20px;
  display: flex;
}
.el-form--label-top .el-form-item__label {
  padding: 0;
  line-height: 20px;
}
.tit {
  height: 50px;
  display: flex;
}
.widthhhh {
  width: 50vw !important;
  .el-table {
    max-width: 40vw;
  }
}
.el-ov-single-checkbox-table {
  thead {
    th:first-child {
      span:first-child {
        display: none;
      }
    }
  }
}
</style>