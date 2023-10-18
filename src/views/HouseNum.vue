<template>
  <div class="doc">
    <div>
      <el-form :inline="true"
               :model="selectform"
               class="demo-form-inline">
        <el-form-item>
          <el-select v-model="selectform.homestatus"
                     placeholder="入住状态">
            <el-option label="入住"
                       value="1"></el-option>
            <el-option label="未入住"
                       value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="selectform.unitname"
                    placeholder="单元名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="selectform.buildnum"
                    placeholder="幢号"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input v-model="selectform.homenum"
                    placeholder="房号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="selectform.homename"
                    placeholder="住客姓名"></el-input>
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
        <el-table-column type="selection"
                         width="55">
        </el-table-column>
        <el-table-column type="index"
                         label="序号"
                         width="50">
        </el-table-column>
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
        <el-table-column prop="homename"
                         label="住客姓名">
          <template scope="scope">
            {{ scope.row.homename||'暂无' }}
          </template>
        </el-table-column>
        <el-table-column prop="homestatus"
                         label="状态">
          <template scope="scope">
            {{ scope.row.homestatus==1?'已入住':'未入住' }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="show(scope.row)">编辑</el-button>
            <el-button size="mini"
                       type="danger"
                       @click="Delete(scope.row)">删除</el-button>
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
  </div>
</template>

<script>
import { GetHouseUtil, GetHouseNum, DelHouseUtil } from '../api/home'
var dayjs = require('dayjs')
export default {
  data () {
    return {
      tableData: [],

      pagemsg: {
        pageNum: 10,
        currPage: 0
      },
      pagetotal: 0,
      selectform: {
        homestatus: 1,
        unitname: '',
        buildnum: '',
        homenum: '',
        homename: '',
        currPage: 0,
        pageNum: 10,
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
    GetHouseUtil(this.pagemsg).then((result) => {

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
      let res = await GetHouseNum(this.selectform)
      this.tableData = res.data
      this.pagetotal = res.total

    },
    changepage (e) {
      this.selectform.currPage = e
      this.submit()
    },
    changesize (e) {
      this.selectform.pageNum = e
      this.submit()
    },
    opensubmit () {
      this.$router.push('/house/unit/add')
    },
    reset () {
      this.selectform = {
        homestatus: '',
        unitname: '',
        buildnum: '',
        homenum: '',
        homename: '',
        currPage: 0,
        pageNum: 10,
        token: sessionStorage.getItem('token')
      }
    },
    Delete (row) {

      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await DelHouseUtil({ id: row.id, token: sessionStorage.getItem('token') })

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
      this.$router.push(`/house/show/${row.id}`)
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