<template>
  <div class="doc">
    <div>
      <el-form :inline="true"
               :model="addform"
               class="demo-form-inline">
        <el-form-item>
          <el-input v-model="pagemsg.username"
                    placeholder="用户账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="pagemsg.type"
                     placeholder="角色类型">
            <el-option label="管理员"
                       value="1"></el-option>
            <el-option label="普通用户"
                       value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>

          <el-col :span="11">
            <el-date-picker v-model="dataarea"
                            @change="changeData"
                            value-format="yyyy-MM-dd"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </el-col>

        </el-form-item>

        <el-button type="success"
                   @click="add"><i class="el-icon-plus"></i>搜索</el-button>
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
        <el-table-column prop="title"
                         username="登录账户"
                         width="180">
        </el-table-column>
        <el-table-column prop="type"
                         label="角色类型"
                         width="180">
          <template scope="scope">
            {{ scope.row.type === 1 ? '管理员' : '普通用户'}}
          </template>
        </el-table-column>
        <el-table-column prop="email"
                         label="邮箱"
                         width="180">
        </el-table-column>
        <el-table-column prop="createtime"
                         label="登录时间">
          <template scope="scope">
            {{ dayjs(scope.row.createtime) }}
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">

            <el-button size="mini"
                       type="danger"
                       @click="Delete(scope.row)">删除记录</el-button>
          </template>
        </el-table-column>
      </el-table></div>
    <div class="page"><el-pagination @size-change="changesize" [],
                     @current-change="changepage"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="this.addform.pageNum"
                     layout="total, sizes, prev, pager, next"
                     :total="pagetotal">
      </el-pagination></div>

  </div>
</template>

<script>
import { GetLoginData, DelLoginData } from '@/api/menu'

var dayjs = require('dayjs')
export default {
  data () {
    return {
      tableData: [],
      dataarea: [],
      checkVisible: false,
      pagemsg: {
        username: '',
        type: '',
        startDate: '',
        endDate: '',
        pageNum: 10,
        currPage: 0
      },
      pagetotal: 0,
      addform: {
        communityname: '',
        title: '',
        content: '',
        token: sessionStorage.getItem('token')
      },
      readdata: {

      }

    }
  },
  mounted () {
    GetLoginData(this.pagemsg).then((result) => {

      this.tableData = result.data
      this.pagetotal = result.total
    }).catch((err) => {

    });
  },
  methods: {
    changeData () {
      console.log(this.dataarea);
      this.pagemsg.startDate = this.dataarea[0]
      this.pagemsg.endDate = this.dataarea[1]
    },
    dayjs (e) {
      return dayjs(e).format('YYYY-MM-DD HH mm:ss')
    },
    async submit () {
      let res = await GetLoginData(this.pagemsg)
      this.tableData = res.data
      this.pagetotal = res.total

    },
    changepage (e) {
      this.pagemsg.currPage = e - 1
      this.submit()
    },
    changesize (e) {
      this.pagemsg.pageNum = e
      this.submit()
    },
    opensubmit () {
      this.$router.push('/house/unit/add')
    },
    reset () {
      this.pagemsg = {
        username: '',
        type: '',
        startDate: '',
        endDate: '',
        pageNum: 10,
        currPage: 0
      }
    },
    Delete (row) {

      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await DelLoginData({ id: row.id, token: sessionStorage.getItem('token') })

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
    show (row) {
      this.checkVisible = true
      this.readdata = row
    },
    add () {
      this.submit()
    },
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