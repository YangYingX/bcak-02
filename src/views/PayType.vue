<template>
  <div>
    <div class="main">
      <div class="leftview">
        <el-form :model="paydatasearch"
                 status-icon>
          <div style="display: flex;     justify-content: space-around;">
            <el-form-item prop="pass">
              <el-input v-model="paydatasearch.parkname"
                        autocomplete="off"
                        class="wid"
                        placeholder="项目价格"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-select v-model="paydatasearch.paystatus"
                         placeholder="通知状态"
                         class="wid">
                <el-option label="已通知"
                           value="1"></el-option>
                <el-option label="未通知"
                           value="2"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-form>
        <div>
          <el-tree :data="treeData"
                   default-expand-all
                   @node-click="treeclick"></el-tree>
        </div>
      </div>
      <div class="rightview">
        <div>
          <el-button type="primary"
                     @click="submit"><i class="el-icon-search"></i></el-button>

          <el-button type="success"
                     @click="disposetable"><i class="el-icon-plus"></i>导出</el-button>
          <el-button type="primary"
                     @click="reset"><i class="el-icon-refresh-right"></i>重置</el-button>

        </div>

        <div> <el-table :id="'mytable'"
                    :data="tableData"
                    stripe
                    style="width: 100%"
                    @selection-change="select">

            <el-table-column prop="payname"
                             label="缴费项目名称"
                             width="180">
              <template scope="scope">
                {{ scope.row.payname||'暂无' }}
              </template>
            </el-table-column>
            <el-table-column prop="paylevel"
                             label="缴费项目优先级"
                             width="180">
              <template scope="scope">
                {{ scope.row.paylevel||'暂无' }}
              </template>
            </el-table-column>
            <el-table-column prop="paynum"
                             label="项目用量/时长">
              <template scope="scope">
                {{ scope.row.paynum||'暂无' }}
              </template>
            </el-table-column>
            <el-table-column prop="paymoney"
                             label="项目价格">
              <template scope="scope">
                {{ scope.row.paymoney||'暂无' }}
              </template>
            </el-table-column>
            <el-table-column prop="paytime"
                             label="创建时间"
                             width="180">
              <template scope="scope">
                {{ dayjs(scope.row.paytime)||'暂无' }}
              </template>
            </el-table-column>
            <el-table-column prop="username"
                             label="通知人">
              <template scope="scope">
                {{ scope.row.username||'暂无' }}
              </template>
            </el-table-column>
            <el-table-column prop="paystatus"
                             label="状态">
              <template scope="scope">
                {{ scope.row.paystatus==1?'已通知':'未通知' }}
              </template>
            </el-table-column>
            <el-table-column label="操作"
                             width="300">
              <template slot-scope="scope">
                <el-button size="mini"
                           @click="editnum(scope.row)">编辑</el-button>
                <el-button size="mini"
                           @click="showcost(scope.row)">查看</el-button>
                <el-button size="mini"
                           type="danger"
                           @click="Delete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table></div>
        <div class="page"><el-pagination @size-change="changesize"
                         @current-change="changepage"
                         :page-sizes="[10, 20, 30, 40]"
                         :page-size="this.paydatasearch.pageNum"
                         layout="total, sizes, prev, pager, next"
                         :total="pagetotal">
          </el-pagination></div>
      </div>
    </div>
    <el-dialog title="提示"
               :visible.sync="editVisible"
               width="60%">

      <div>
        <el-table ref="singleTable"
                  :data="userdata"
                  highlight-current-row
                  @current-change="userdatachange"
                  style="width: 100%">
          <el-table-column type="index"
                           label="序号"
                           width="50">
          </el-table-column>
          <el-table-column property="username"
                           label="用户账号"
                           width="120">
          </el-table-column>
          <el-table-column property="address"
                           label="家庭住址"
                           width="120">
          </el-table-column>
          <el-table-column property="type"
                           label="类型">
            <template scope="scope">
              {{ scope.row.type==1?'管理员':'普通用户' }}
            </template>
          </el-table-column>
          <el-table-column property="coststatus"
                           label="缴费状态">
            <template scope="scope">
              {{ scope.row.coststatus==1?'已缴费':'未缴费' }}
            </template>
          </el-table-column>
        </el-table>
      </div>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="submituserdatachange">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { DelPay, EditUserPay } from '../api/pay'
import { GetCostData } from '../api/index'
import { GetUserList } from '@/api/home';
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
var dayjs = require('dayjs')

export default {
  data () {
    return {
      tableData: [],
      editVisible: false,
      pagemsg: {
        pageNum: 10,
        currPage: 0
      },
      dwtableData: [

      ],
      paydatasearch: {
        c_id: 7,
        paymoney: '',
        paystatus: '',
        currPage: 0,
        pageNum: 9,
      },
      userlistdata: {
        username: '',
        currPage: 0,
        pageNum: 7,
      },
      pagetotal: 0,
      treeData: [{
        id: 1,
        label: "缴费项目",
        children: [{
          id: 2,
          label: "电费项目",
          children: [{
            id: 7,
            label: "电费目录表"
          }]
        }, {
          id: 3,
          label: "水费项目",
          children: [{
            id: 8,
            label: "水费固定月目录表"
          }, {
            id: 9,
            label: "水费按量计价目录表"
          }]
        }, {
          id: 4,
          label: "天然气项目",
          children: [{
            id: 10,
            label: "天然气目录表"
          }]
        }, {
          id: 5,
          label: "物业费项目",
          children: [{
            id: 11,
            label: "物业费目录表"
          }]
        }, {
          id: 6,
          label: "宽带费项目",
          children: [{
            id: 12,
            label: "宽带费目录表"
          }]
        }]
      }],
      userdata: [],
      usertotal: 0,
      noticedata: {

        u_id: 9,
        c_id: 337,
        coststatus: 2,
        paystatus: 1,
        username: '',
        token: sessionStorage.getItem('token')
      }

    }


  },
  mounted () {
    GetCostData(this.paydatasearch).then((result) => {
      console.log(result);
      this.tableData = result.data
      this.pagetotal = data.total
    }).catch((err) => {

    });
    GetUserList(this.userlistdata).then((result) => {
      console.log(result, 'user');
      this.userdata = result.data
      this.usertotal = result.total
    }).catch((err) => {

    });
  },
  methods: {
    treeclick (e) {
      this.paydatasearch.c_id = e.id
      this.submit()
    },
    dayjs (e) {
      if (e) { return dayjs(e).format('YYYY-MM-DD') }
      else { return '暂无' }

    },
    async submit () {
      let res = await GetCostData(this.paydatasearch)
      this.tableData = res.data
      this.pagetotal = res.total

    },
    changepage (e) {
      this.paydatasearch.currPage = e - 1
      this.submit()
    },
    changesize (e) {
      this.paydatasearch.pageNum = e
      this.submit()
    },
    opensubmit () {
      this.$router.push('/house/unit/add')
    },
    reset () {
      this.paydatasearch = {
        c_id: 7,
        paymoney: '',
        paystatus: '',
        currPage: 0,
        pageNum: 9,
      }
    },
    Delete (row) {
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await DelPay({ id: row.id, token: sessionStorage.getItem('token') })

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

    disposetable () {
      let res = this.tableData.map((item) => {
        return {
          '缴费项目名称': item.payname,
          '缴费项目优先级': item.paylevel,
          '项目用量': item.paynum,
          '项目价格': item.paymoney,
          '创建时间': this.dayjs(item.paytime),
          '通知状态': item.paystatus == 1 ? '已通知' : '未入住'
        }
      })
      console.log(res);
      this.dwtableData = res
      this.$confirm('此操作将下载一个含有已选择数据的excl表格, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.exportToExcel(this.dwtableData, '房号数据')
        this.$message({
          type: 'success',
          message: '下载成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消下载'
        });
      });

    },
    exportToExcel (tableData, fileName) {
      const worksheet = XLSX.utils.json_to_sheet(tableData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(data, fileName + '.xlsx');
    }, select (e) {
      console.log(e);
      this.pretabledata = e
    },
    editnum (row) {
      this.editVisible = true
      console.log(row);
      this.noticedata.c_id = row.c_id
      this.noticedata.paystatus = row.paystatus
    },
    userdatachange (e) {
      console.log(e);
      this.noticedata.u_id = e.id
      this.noticedata.coststatus = e.coststatus
      this.noticedata.username = e.username
    },
    submituserdatachange () {


      this.$confirm('确定要通知该用户缴费吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        EditUserPay(this.noticedata).then((result) => {
          this.$message({
            type: 'success',
            message: '通知成功!'

          });
          console.log(result);
          this.editVisible = false
        }).catch((err) => {

        });


      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消通知'
        });
      });

    },
    showcost (row) {
      this.$router.push(`/pay/showpayType/${row.id}`)
    }

  },

}
</script>

<style lang="less" >
.leftview {
  width: 30vw;
}
.rightview {
  width: 70vw;
}
.wid {
  width: 15vw;
}
.main {
  margin: 20px;
  padding: 20px;
  display: flex;
}
</style>