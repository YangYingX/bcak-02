<template>
  <div class="doc">
    <div>
      <el-form :inline="true"
               :model="addform"
               class="demo-form-inline">
        <el-form-item>
          <el-input v-model="addform.communityname"
                    placeholder="请输入发布小区"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="addform.title"
                    placeholder="请输入公告主题"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="addform.content"
                    placeholder="请输入发布内容"></el-input>
        </el-form-item>

        <el-button type="success"
                  @click="add"><i class="el-icon-plus"></i>录入</el-button>
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
                         label="公告主题"
                         width="180">
        </el-table-column>
        <el-table-column prop="content"
                         label="公告内容"
                         width="180">
        </el-table-column>
        <el-table-column prop="createtime"
                         label="发布时间">
          <template scope="scope">
            {{ dayjs(scope.row.createtime) }}
          </template>
        </el-table-column>
        <el-table-column prop="communityname"
                         label="小区名称"
                         width="180">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="show(scope.row)">查看</el-button>
            <el-button size="mini"
                       type="danger"
                       @click="Delete(scope.row)">归档</el-button>
          </template>
        </el-table-column>
      </el-table></div>
    <div class="page"><el-pagination @size-change="changesize"
                     @current-change="changepage"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="this.addform.pageNum"
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
          <el-form-item label="小区名称：">
            <el-input v-model="readdata.communityname"
                      placeholder="请输入发布小区"></el-input>
          </el-form-item>

          <el-form-item label="发布时间">
            <el-date-picker v-model="readdata.createtime"
                            type="date"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="公告主题">
            <el-input v-model="readdata.title"
                      placeholder="请输入公告主题"></el-input>
          </el-form-item>
          <el-form-item label="公告内容">
            <el-input v-model="readdata.content"
                      placeholder="请输入发布内容"></el-input>
          </el-form-item>

          <el-form-item label="公告状态">
            <el-input v-model="readdata.content"
                      placeholder="请输入发布内容"></el-input>
          </el-form-item>

        </el-form>

        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="checkVisible = false">关闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>

import { GetPostMsg, AddPostMsg, DelPostMsg } from '@/api/post'
var dayjs = require('dayjs')
export default {
  data () {
    return {
      tableData: [],
      checkVisible: false,
      pagemsg: {
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
    GetPostMsg(this.pagemsg).then((result) => {

      this.tableData = result.data
      this.pagetotal = result.total
    }).catch((err) => {

    });
  },
  methods: {
    dayjs (e) {
      return dayjs(e).format('YYYY-MM-DD HH mm:ss')
    },
    async submit () {
      let res = await GetPostMsg(this.pagemsg)
      this.tableData = res.data
      this.pagetotal = res.total

    },
    changepage (e) {
      this.pagemsg.currPage = e
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
      this.addform = {
        communityname: '',
        title: '',
        content: '',
        token: sessionStorage.getItem('token')
      }
    },
    Delete (row) {

      this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await DelPostMsg({ id: row.id, token: sessionStorage.getItem('token') })

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
      AddPostMsg(this.addform).then((result) => {
        console.log(result)
        this.submit();
      }).catch((err) => {

      });
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