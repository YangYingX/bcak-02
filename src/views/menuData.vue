<template>
  <div class="doc">

    <div> <el-table :data="tableData"
                stripe
                style="width: 100%">
        <el-table-column prop="id"
                         label="编码"
                         width="50">
        </el-table-column>
        <el-table-column prop="title"
                         label="菜单名称"
                         width="180">
        </el-table-column>
        <el-table-column prop="content"
                         label="菜单级别"
                         width="180">
          一级
        </el-table-column>
        <el-table-column prop="desc"
                         show-overflow-tooltip
                         label="菜单描述">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="show(scope.row)">查看下一级</el-button>

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

  </div>
</template>

<script>
import { GetMenuData } from '@/api/menu'


export default {
  data () {
    return {
      tableData: [],
      checkVisible: false,
      pagemsg: {
        prentId: 0,
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
    GetMenuData(this.pagemsg).then((result) => {

      this.tableData = result.data
      this.pagetotal = result.total
    }).catch((err) => {

    });
  },
  methods: {

    async submit () {
      let res = await GetMenuData(this.pagemsg)
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
      this.addform = {
        communityname: '',
        title: '',
        content: '',
        token: sessionStorage.getItem('token')
      }
    },


    show (row) {
      this.$router.push(`/menu/muenSecond/${row.id}`)
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