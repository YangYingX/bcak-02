<template>
  <div>

    <div class="main">
      <div class="leftview">
        <el-form ref="form"
                 :model="paymsgsearch"
                 label-position="top"
                 label-width="120px">
          <el-form-item label="用户名"
                        prop="username">
            <el-input v-model="paymsgsearch.username"></el-input>
          </el-form-item>
          <el-form-item label="支付名称">
            <el-select v-model="paymsgsearch.payname"
                       placeholder="请选择支付名称">
              <el-option label="支付宝"
                         value="支付宝"></el-option>
              <el-option label="微信"
                         value="微信"></el-option>
              <el-option label="银联"
                         value="银联"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="费用类型"
                        prop="costtype">
            <el-input v-model="paymsgsearch.costtype"></el-input>
          </el-form-item>
          <el-form-item label="费用状态">
            <el-select v-model="paymsgsearch.coststatus"
                       placeholder="请选择费用状态">
              <el-option label="已支付"
                         value="已支付"></el-option>
              <el-option label="未支付"
                         value="未支付"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开始日期"
                        prop="startDate">
            <el-date-picker v-model="startenddata"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="支付金额"
                        prop="paymoney">
            <el-input v-model="paymsgsearch.paymoney"></el-input>
          </el-form-item>
          <el-form-item label="缴费优先级"
                        prop="paylevel">
            <el-input v-model="paymsgsearch.paylevel"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="resetForm">重置</el-button>
            <el-button type="primary"
                       @click="submit">立即查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="rightview">
        <div>

          <el-button type="success"
                     @click="disposetable"><i class="el-icon-plus"></i>导出</el-button>

        </div>

        <div> <el-table :id="'mytable'"
                    :data="tableData"
                    stripe
                    style="width: 100%"
                    @selection-change="select">
            <el-table-column prop="payname"
                             label="缴费产品"
                             width="180">
              <template scope="scope">
                {{ scope.row.payname||'暂无' }}
              </template>
            </el-table-column>
            <el-table-column prop="username"
                             label="缴费人员">
              <template scope="scope">
                {{ scope.row.username||'暂无' }}
              </template>
            </el-table-column>
            <el-table-column prop="costtype"
                             label="支付类型">
              <template scope="scope">
                {{ scope.row.costtype||'暂无' }}
              </template>
            </el-table-column>
            <el-table-column prop="paymoney"
                             label="缴费金额">
              <template scope="scope">
                {{ scope.row.paymoney||'暂无' }}
              </template>
            </el-table-column>

            <el-table-column prop="paylevel"
                             label="缴费项目优先级"
                             width="180">
              <template scope="scope">
                {{ scope.row.paylevel||'暂无' }}
              </template>
            </el-table-column>
            <el-table-column prop="costtime"
                             label="支付时间">
              <template scope="scope">
                {{ dayjs(scope.row.costtime)||'暂无' }}
              </template>
            </el-table-column>

            <el-table-column prop="coststatus"
                             label="支付状态">
              <template scope="scope">
                {{ scope.row.coststatus==1?'已支付':'未支付' }}
              </template>
            </el-table-column>
            <el-table-column label="操作"
                             width="300">
              <template slot-scope="scope">

                <el-button size="mini"
                           @click="showcost(scope.row)">查看</el-button>
                <el-button size="mini"
                           @click="down(scope.row)">导出</el-button>
                <el-button size="mini"
                           type="danger"
                           @click="Delete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table></div>
        <div class="page"><el-pagination @size-change="changesize"
                         @current-change="changepage"
                         :page-sizes="[10, 20, 30, 40]"
                         :page-size="this.paymsgsearch.pageNum"
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

import { DelPayMsg, EditUserPay, GetPayMsg } from '../api/pay'

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
      startenddata: '',
      dwtableData: [
      ],
      paymsgsearch: {

        currPage: 0,
        pageNum: 10
      },
      userlistdata: {
        username: '',
        currPage: 0,
        pageNum: 7,
      },
      pagetotal: 0,

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
    GetPayMsg(this.paymsgsearch).then((result) => {
      console.log(result);
      this.tableData = result.data
    }).catch((err) => {

    });


  },
  methods: {

    dayjs (e) {
      if (e) { return dayjs(e).format('YYYY-MM-DD') }
      else { return '暂无' }

    },
    async submit () {
      let res = await GetPayMsg(this.paymsgsearch)
      this.tableData = res.data
      this.pagetotal = res.total

    },
    changepage (e) {
      this.paymsgsearch.currPage = e - 1
      this.submit()
    },
    changesize (e) {
      this.paymsgsearch.pageNum = e
      this.submit()
    },
    opensubmit () {
      this.$router.push('/house/unit/add')
    },
    reset () {
      this.paymsgsearch = {
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
        let res = await DelPayMsg({ id: row.id, token: sessionStorage.getItem('token') })
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
          '缴费产品': item.payname,
          '缴费人员': item.username,
          '支付类型': item.costtype,
          '缴费金额': item.paymoney,
          '缴费优先级': item.paylevel,
          '支付时间': this.dayjs(item.costtime),
          '支付状态': item.coststatus == 1 ? '已支付' : '未支付',
        }
      })
      console.log(res);
      this.dwtableData = res
      this.$confirm('此操作将下载一个含有已选择数据的excl表格, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.exportToExcel(this.dwtableData, '数据列表')
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
    down (row) {
      let res = [row].map((item) => {
        return {
          '缴费产品': item.payname,
          '缴费人员': item.username,
          '支付类型': item.costtype,
          '缴费金额': item.paymoney,
          '缴费优先级': item.paylevel,
          '支付时间': this.dayjs(item.costtime),
          '支付状态': item.coststatus == 1 ? '已支付' : '未支付',
        }
      })

      this.exportToExcel(res, '数据列表')
      this.$message({
        type: 'success',
        message: '下载成功!'
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
      this.$router.push(`/pay/showpaymsg/${row.id}`)
    },
    jptadd () {
      this.$router.push('/pay/addpaytype')
    },
    resetForm () {
      this.paymsgsearch = {


        currPage: 0,
        pageNum: 10


      }
    },

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
.el-form-item {
  margin: 0 !important;
}
.el-form-item__label {
  /* 修改 label 的高度，例如： */
  height: 30px !important; /* 设置为 30px */
}
</style>