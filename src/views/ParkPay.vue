<template>
  <div class="doc">
    <div>
      <el-form :inline="true"
               :model="selectform"
               class="demo-form-inline">

        <el-form-item>
          <el-input v-model="selectform.parkname"
                    placeholder="车位名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="selectform.orderpay"
                    placeholder="应缴金额"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="selectform.orderstatus"
                     placeholder="缴费状态">
            <el-option label="入住"
                       value="1"></el-option>
            <el-option label="未入住"
                       value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     @click="submit"><i class="el-icon-search"></i></el-button>
        </el-form-item>
        <el-button type="success"
                   @click="disposetable"><i class="el-icon-plus"></i>导出</el-button>
        <el-button type="primary"
                   @click="reset"><i class="el-icon-refresh-right"></i>重置</el-button>

      </el-form>
    </div>
    <div>
      <el-table :id="'mytable'"
                :data="tableData"
                stripe
                fixed
                style="width: 100%">

        <el-table-column type="index"
                         label="序号"
                         width="50">
        </el-table-column>
        <el-table-column prop="parkname"
                         label="车位名称"
                         width="180">
          <template scope="scope">
            {{ scope.row.parkname||'暂无' }}
          </template>
        </el-table-column>
        <el-table-column prop="parkpay"
                         label="车位金额"
                         width="180">
          <template scope="scope">
            {{ scope.row.parkpay||'暂无' }}
          </template>
        </el-table-column>
        <el-table-column prop="startdate"
                         label="开始时间"
                         width="180">
          <template scope="scope">
            {{ dayjs(scope.row.startdate)||'暂无' }}
          </template>
        </el-table-column>
        <el-table-column prop="enddate"
                         label="结束时间"
                         width="180">
          <template scope="scope">
            {{ dayjs(scope.row.enddate)||'暂无' }}
          </template>
        </el-table-column>
        <el-table-column prop="orderpay"
                         label="应缴金额"
                         width="80">
          <template scope="scope">
            {{ scope.row.orderpay||'暂无' }}
          </template>
        </el-table-column>
        <el-table-column prop="orderstatus"
                         label="缴费状态"
                         width="280">
          <template scope="scope">
            <el-switch :value="scope.row.orderstatus==1"
                       disabled
                       active-text="已缴费"
                       inactive-text="未缴费">

            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="280">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="danger"
                       @click="notify(scope.row)">通知缴费</el-button>
            <el-button size="mini"
                       @click="readnotify(scope.row)">缴费详情</el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page"><el-pagination @size-change="changesize"
                     @current-change="changepage"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="this.selectform.pageNum"
                     layout="total, sizes, prev, pager, next"
                     :total="pagetotal">
      </el-pagination></div>

    <el-dialog title="提示"
               :visible.sync="notifyVisible"
               width="30%">

      <el-form :model="rowForm"
               status-icon
               label-width="100px">

        <el-form-item label="开始日期">
          <el-col>
            <el-date-picker type="date"
                            placeholder="选择日期"
                            v-model="rowForm.startdate"
                            value-format="yyyy-MM-dd"
                            :disabled="Readonly"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="结束日期">
          <el-col>
            <el-date-picker type="date"
                            placeholder="选择日期"
                            v-model="rowForm.enddate"
                            value-format="yyyy-MM-dd"
                            :disabled="Readonly"></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="应缴金额">
          <el-input v-model.number="rowForm.orderpay"
                    :disabled="Readonly"></el-input>
        </el-form-item>

        <el-form-item label="缴费状态">
          <el-select v-model="rowForm.orderstatus"
                     placeholder="请选择缴费状态"
                     :disabled="Readonly">
            <el-option label="已缴费"
                       value="1"></el-option>
            <el-option label="未交费"
                       value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="缴费通知">
          <el-input v-model="rowForm.note"
                    type="textarea"
                    :disabled="Readonly"></el-input>
        </el-form-item>

      </el-form>

      <span slot="footer"
            class="dialog-footer"
            v-if="!Readonly">
        <el-button @click="notifyVisible = false">取 消</el-button>

        <el-button @click="this.rowForm={}">重置</el-button>
        <el-button type="primary"
                   @click="notifysubmit">确 定</el-button>
      </span>
      <span slot="footer"
            class="dialog-footer"
            v-if="Readonly">
        <el-button @click="notifyVisible = false">关闭</el-button>

      </span>
    </el-dialog>

  </div>
</template>

<script>
import { GetHouseNum, } from '../api/home'
import { GetParkOrder } from '../api/index'
import { NotifyParkData } from '../api/park'
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
var dayjs = require('dayjs')
export default {
  data () {
    return {
      tableData: [],
      dwtableData: [

      ],
      Readonly: false,
      pagetotal: 0,
      selectform: {
        parkname: '',
        orderstatus: '',
        orderpay: '',
        pageNum: 10,
        currPage: 0
      },
      rowForm: {},
      pretabledata: [],
      notifyVisible: false
    }
  },
  mounted () {
    GetParkOrder(this.selectform).then((result) => {
      console.log(result);
      this.tableData = result.data
      this.pagetotal = result.total
    }).catch((err) => {

    });
  },
  methods: {
    dayjs (e) {
      if (e) { return dayjs(e).format('YYYY-MM-DD+HH:mm:ss') }
      else { return '暂无' }

    },
    async submit () {
      let res = await GetHouseNum(this.selectform)
      this.tableData = res.data
      this.pagetotal = res.total

    },
    changepage (e) {
      this.selectform.currPage = e - 1
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
        parkname: '',
        orderstatus: '',
        orderpay: '',
        pageNum: 10,
        currPage: 0
      }
    },



    editnum (row) {
      this.$router.push(`/house/editnum/${row.id}`)
    },
    disposetable () {
      let res = this.tableData.map((item) => {
        return {
          '车位名称': item.parkname,
          '车位金额': item.parkpay,
          '开始时间': item.startdate,
          '结束时间': item.enddate,
          '应缴金额': item.orderpay,
          '缴费状态': item.orderstatus == 1 ? '已缴费' : '未缴费'
        }
      })
      console.log(res);
      this.dwtableData = res
      this.$confirm('此操作将下载一个含有已选择数据的excl表格, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.exportToExcel(this.dwtableData, '车位数据')
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
    },
    notify (row) {
      this.Readonly = false
      this.notifyVisible = true
      this.rowForm = row
      console.log(row);
    },
    readnotify (row) {
      this.Readonly = true
      this.notifyVisible = true
      this.rowForm = row
      console.log(row);
    },
    notifysubmit () {

      NotifyParkData({
        u_id: this.rowForm.id,
        startdate: this.dayjs(this.rowForm.startdate),
        enddate: this.dayjs(this.rowForm.enddate),
        orderpay: this.rowForm.orderpay,
        orderstatus: this.rowForm.orderstatus,
        note: this.rowForm.note,
        token: sessionStorage.getItem('token')
      }).then((result) => {
        this.$message({
          message: `result`,
          type: 'success'
        });
        this.notifyVisible = false

      }).catch((err) => {

      });
    }


  }
}
</script>

<style lang="less" >
.doc {
  padding: 20px;
  margin: 20px;
}
.page {
  display: flex;
  justify-content: end;
}

.el-switch__label--left {
  position: relative;
  left: 70px;
  color: #fff;
  z-index: -1111;
}
.el-switch__core {
  width: 70px !important;
}
.el-switch__label--right {
  position: relative;
  right: 70px;
  color: #fff;
  z-index: -1111;
}
.el-switch__label--right.is-active {
  z-index: 1111;
  color: #fff !important;
}
.el-switch__label--left.is-active {
  z-index: 1111;
  color: #9c9c9c !important;
}
</style>