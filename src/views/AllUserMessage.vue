<template>
  <div class="doc">
    <div>
      <el-form :inline="true"
               :model="selectform"
               class="demo-form-inline">

        <el-form-item>
          <el-select v-model="selectform.CharType"
                     placeholder="请选择查询类型">
            <el-option label="用户名"
                       value="username"></el-option>
            <el-option label="昵称"
                       value="nickname"></el-option>
            <el-option label="家庭地址"
                       value="homeaddress"></el-option>
            <el-option label="性别"
                       value="sex"></el-option>
            <el-option label="邮箱"
                       value="email"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-input v-model="selectform.inputText"
                    placeholder="请输入查询内容"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     @click="submit"><i class="el-icon-search"></i></el-button>
        </el-form-item>
        <el-button type="success"
                   @click="opensubmit"><i class="el-icon-plus"></i>录入</el-button>
        <el-button type="primary"
                   @click="reset"><i class="el-icon-refresh-right"></i>重置</el-button>

      </el-form>
    </div>
    <div> <el-table :data="tableData"
                stripe
                style="width: 100%">
        <el-table-column type="index"
                         label="序号"
                         width="50">
        </el-table-column>
        <el-table-column prop="username"
                         label="用户账号"
                         width="180">
        </el-table-column>
        <el-table-column prop="nickname"
                         label="用户名称"
                         width="180">
        </el-table-column>
        <el-table-column prop="sex"
                         label="性别">
        </el-table-column>
        <el-table-column prop="homeaddress"
                         label="家庭住址">

        </el-table-column>
        <el-table-column prop="email"
                         label="邮箱">

        </el-table-column>
        <el-table-column prop="note"
                         label="描述">
        </el-table-column>
        <el-table-column label="类型">
          <template scope="scope">
            {{ scope.row.type == 1 ? '管理员' : '普通用户'}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="edit(scope.row)">编辑</el-button>
            <el-button size="mini"
                       @click="read(scope.row)">查看</el-button>
            <el-button size="mini"
                       type="danger"
                       @click="Delete(scope.row)">归档</el-button>
          </template>
        </el-table-column>
      </el-table></div>
    <div class="page"><el-pagination @size-change="changesize"
                     @current-change="changepage"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="this.selectform.pageNum"
                     layout="total, sizes, prev, pager, next"
                     :total="pagetotal">
      </el-pagination></div>
    <div>
      <el-dialog title="提示"
                 :visible.sync="checkVisible"
                 width="30%">

        <el-form :inline="true"
                 :model="readdata"
                 class="demo-form-inline">
          <el-form-item label="用户账号">
            <el-input v-model="readdata.username"
                      placeholder="用户账号"
                      :readonly="readonly"></el-input>
          </el-form-item>

          <el-form-item label="用户密码">
            <el-input v-model="readdata.password"
                      type="password"
                      placeholder="用户密码"
                      :readonly="readonly">
            </el-input>
          </el-form-item>

          <el-form-item label="用户名称">
            <el-input v-model="readdata.nickname"
                      placeholder="用户名称"
                      :readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="readdata.sex"
                      placeholder="性别"
                      :readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="readdata.type"
                       placeholder="请选择"
                       :readonly="readonly">
              <el-option label="管理员"
                         value="1"></el-option>
              <el-option label="普通用户"
                         value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="家庭住址">
            <el-input v-model="readdata.homeaddress"
                      placeholder="家庭住址"
                      :readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="readdata.email"
                      placeholder="邮箱"
                      :readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="用户描述">
            <el-input v-model="readdata.note"
                      placeholder="用户描述"
                      :readonly="readonly"></el-input>
          </el-form-item>

        </el-form>

        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="checkVisible = false">关闭</el-button>
          <el-button type="primary"
                     @click="updata">保存</el-button>
          <el-button type="primary"
                     @click="reset">重置</el-button>
        </span>
      </el-dialog>
    </div>
    <div>
      <el-dialog title="提示"
                 :visible.sync="addVisible"
                 width="30%">

        <el-form :inline="true"
                 :model="addform"
                 class="demo-form-inline">
          <el-form-item label="用户账号">
            <el-input v-model="addform.username"
                      placeholder="用户账号"
                      :readonly="readonly"></el-input>
          </el-form-item>

          <el-form-item label="用户密码">
            <el-input v-model="addform.password"
                      type="password"
                      placeholder="用户密码"
                      :readonly="readonly">
            </el-input>
          </el-form-item>

          <el-form-item label="用户名称">
            <el-input v-model="addform.nickname"
                      placeholder="用户名称"
                      :readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="addform.sex"
                      placeholder="性别"
                      :readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="addform.type"
                       placeholder="请选择"
                       :readonly="readonly">
              <el-option label="管理员"
                         value="1"></el-option>
              <el-option label="普通用户"
                         value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="家庭住址">
            <el-input v-model="addform.homeaddress"
                      placeholder="家庭住址"
                      :readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="addform.email"
                      placeholder="邮箱"
                      :readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="用户描述">
            <el-input v-model="addform.note"
                      placeholder="用户描述"
                      :readonly="readonly"></el-input>
          </el-form-item>

        </el-form>

        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="addVisible = false">关闭</el-button>
          <el-button type="primary"
                     @click="add">保存</el-button>
          <el-button type="primary"
                     @click="reset">重置</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { GetUsersdata } from '@/api/index'
import { GetUsersByTypePage, Updata, GetUsersByTypeChar, DelUserdata, AddUserdata } from '@/api/user'
var dayjs = require('dayjs')
export default {
  data () {
    return {
      tableData: [],
      checkVisible: false,
      addVisible: false,
      readonly: false,
      pagemsg: {

        pageNum: 10,
        currPage: 0
      },
      readdata: {
        u_id: 9,
        username: '',
        password: '',
        nickname: '',
        sex: '',
        homeaddress: '',

        email: '',
        note: '',
      },
      pagetotal: 0,
      selectform: {

        inputText: '',
        CharType: '',
        pageNum: 10,
        currPage: 1,
        token: sessionStorage.getItem('token')
      },
      addform: {

        inputText: '',
        CharType: '',
        pageNum: 10,
        currPage: 1,
        token: sessionStorage.getItem('token')
      },
      pickerOptions0: {
        disabledDate (time) {
          return time.getTime() > Date.now() - 8.64e6;//如果没有后面的-8.64e6就是不可以选择今天的
        }
      },
    }
  },
  mounted () {
    GetUsersdata(this.pagemsg).then((result) => {

      this.tableData = result.data
      this.pagetotal = result.total
    }).catch((err) => {

    });
  },
  methods: {
    dayjs (e) {
      return dayjs(e).format('YYYY-MM-DD HH mm:ss')
    },
    change () {
      GetUsersdata(this.pagemsg).then((result) => {

        this.tableData = result.data
        this.pagetotal = result.total
      }).catch((err) => {

      });
    },
    async submit () {
      let res = await GetUsersByTypeChar(this.selectform)

      this.tableData = res.data
      this.pagetotal = res.total

    },
    changepage (e) {
      this.pagemsg.currPage = e - 1
      this.change()
    },
    changesize (e) {
      this.pagemsg.pageNum = e
      this.change()
    },
    reset () {
      this.selectform = {

        inputText: '',
        CharType: '',
        pageNum: 10,
        currPage: 1,
        token: sessionStorage.getItem('token')
      }
    },
    Delete (row) {

      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await DelUserdata({ id: row.id, token: sessionStorage.getItem('token') })

        this.$message({
          type: 'success',
          message: '删除成功!'

        });
        this.submit()

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    edit (row) {
      this.readonly = false
      this.show(row)
    },
    read (row) {
      this.readonly = true
      this.show(row)
    },
    show (row) {
      this.readdata.u_id = row.id
      this.readdata.username = row.username
      this.readdata.password = row.password
      this.readdata.nickname = row.nickname
      this.readdata.sex = row.sex
      this.readdata.homeaddress = row.homeaddress
      this.readdata.type = row.type
      this.readdata.email = row.email
      this.readdata.note = row.note
      this.checkVisible = true

    },
    updata () {
      Updata(this.readdata).then((result) => {
        console.log(result);
        this.$message({
          type: 'success',
          message: '编辑成功!'

        });
      }).catch((err) => {

      });
    }, opensubmit () {
      this.addVisible = true
    },
    add () {
      AddUserdata(this.addform).then((result) => {
        this.$message({
          type: 'success',
          message: '增加成功!'

        });
        this.addVisible = false

      }).catch((err) => {

      });
    },
    reset () {
      this.addform = {

        inputText: '',
        CharType: '',
        pageNum: 10,
        currPage: 1,
        token: sessionStorage.getItem('token')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.doc {
  padding: 20px;
  margin: 20px;
}
.page {
  display: flex;
  justify-content: end;
}
</style>