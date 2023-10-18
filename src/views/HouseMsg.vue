<template>
  <div class="doc">

    <el-menu @select="select"
             background-color="#eee"
             class="el-menu-demo"
             mode="horizontal">
      <el-menu-item index="1">智能设备</el-menu-item>
      <el-menu-item index="2">家居设备</el-menu-item>
    </el-menu>
    <div v-if="this.tabletype==1">
      <div>
        <el-form :inline="true"
                 :model="selectform"
                 class="demo-form-inline">
          <el-form-item>
            <el-select v-model="selectform.smartstatus"
                       placeholder="家庭设备状态">
              <el-option label="完好"
                         value="1"></el-option>
              <el-option label="待维修"
                         value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-date-picker v-model="timearea"
                            type="daterange"
                            value-format="yyyy-MM-dd"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-input v-model="selectform.homenum"
                      placeholder="房号"></el-input>
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
          <el-table-column prop="unitname"
                           label="单元名称"
                           width="180">
          </el-table-column>
          <el-table-column prop="buildnum"
                           label="幢号"
                           width="100">
          </el-table-column>
          <el-table-column prop="homenum"
                           label="房号"
                           width="100">
          </el-table-column>
          <el-table-column prop="homename"
                           label="房主"
                           width="140">
          </el-table-column>
          <el-table-column prop="airnum"
                           label="空调"
                           width="100">
          </el-table-column>
          <el-table-column prop="wifiname"
                           label="Wi-Fi"
                           width="120">
          </el-table-column>
          <el-table-column prop="washnum"
                           label="洗衣机"
                           width="100">
          </el-table-column>
          <el-table-column prop="createtime"
                           label="授予时间"
                           width="300">
            <template scope="scope">
              {{ dayjs(scope.row.createtime) }}
            </template>
          </el-table-column>
          <el-table-column prop="smartstatus"
                           label="状态">
            <template scope="scope">
              {{ scope.row.smartstatus==1?'完好':'待维修' }}
            </template>
          </el-table-column>
          <el-table-column label="操作状态">
            <template scope="scope">
              <el-switch v-model="scope.row.smartstatus"
                         active-color="#13ce66"
                         @change="changesmart(scope.row)"
                         inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
        </el-table></div>
    </div>
    <div v-if="this.tabletype==2">
      <div>
        <el-form :inline="true"
                 :model="selectform"
                 class="demo-form-inline">
          <el-form-item>
            <el-select v-model="selectform.familystatus"
                       placeholder="家庭设备状态">
              <el-option label="完好"
                         value="1"></el-option>
              <el-option label="待维修"
                         value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-date-picker v-model="timearea"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-input v-model="selectform.homenum"
                      placeholder="房号"></el-input>
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
          <el-table-column prop="unitname"
                           label="单元名称"
                           width="180">
          </el-table-column>
          <el-table-column prop="buildnum"
                           label="幢号"
                           width="100">
          </el-table-column>
          <el-table-column prop="homenum"
                           label="房号"
                           width="100">
          </el-table-column>
          <el-table-column prop="homename"
                           label="房主"
                           width="140">
          </el-table-column>
          <el-table-column prop="homedesk"
                           label="书桌"
                           width="100">
          </el-table-column>
          <el-table-column prop="homechair"
                           label="椅子"
                           width="120">
          </el-table-column>
          <el-table-column prop="homeclothes"
                           label="衣柜"
                           width="100">
          </el-table-column>
          <el-table-column prop="createtime"
                           label="授予时间"
                           width="300">
            <template scope="scope">
              {{ dayjs(scope.row.createtime) }}
            </template>
          </el-table-column>
          <el-table-column prop="familystatus"
                           label="状态">
            <template scope="scope">
              {{ scope.row.familystatus==1?'完好':'待维修' }}
            </template>
          </el-table-column>
          <el-table-column label="操作状态">
            <template scope="scope">
              <el-switch v-model="scope.row.familystatus"
                         active-color="#13ce66"
                         @change="changefamily(scope.row)"
                         inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
        </el-table></div>
    </div>
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
import { SearchdeviceList, DelHouseUtil, ChangeSmart } from '../api/home'
var dayjs = require('dayjs')
export default {
  data () {
    return {
      tableData: [],
      tabletype: 1,
      pagemsg: {
        pageNum: 10,
        currPage: 0
      },
      pagetotal: 0,
      selectform: {
        smartstatus: '',
        familystatus: '',
        homenum: '',
        startDate: '',
        endDate: '',
        pageNum: 10,
        currPage: 0,
        token: sessionStorage.getItem('token')
      },
      pickerOptions0: {
        disabledDate (time) {
          return time.getTime() > Date.now() - 8.64e6;//如果没有后面的-8.64e6就是不可以选择今天的
        }
      },
      timearea: [],


      pickerOptions: {

        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    }
  },
  mounted () {
    SearchdeviceList(this.selectform).then((result) => {
      this.tableData = result.data
      this.tableData.map(item => item.smartstatus = this.TorF(item.smartstatus))
      this.tableData.map(item => item.familystatus = this.TorF(item.familystatus))

      console.log(this.tableData);
      this.pagetotal = result.total
    }).catch((err) => {

    });
  },
  methods: {
    dayjs (e) {
      return dayjs(e).format('YYYY-MM-DD HH mm:ss')
    },
    async submit () {
      this.selectform.startDate = this.timearea[0]
      this.selectform.endDate = this.timearea[1]
      let res = await SearchdeviceList(this.selectform)

      this.tableData = res.data
      this.pagetotal = res.total
      this.tableData.map(item => item.smartstatus = this.TorF(item.smartstatus))
      this.tableData.map(item => item.familystatus = this.TorF(item.familystatus))
      console.log(this.tableData);
      console.log(this.timearea);
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
        smartstatus: '',
        familystatus: '',
        homenum: '',
        startDate: '',
        endDate: '',
        pageNum: 10,
        currPage: 0,
        token: sessionStorage.getItem('token')
      }
      this.submit()
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
    },
    TorF (e) {
      console.log(e);
      if (e == 1) {

        return true
      } else {
        return false
      }
    }, changesmart (row) {
      console.log(row.smartstatus);


      this.$confirm('是否要更改此设备的状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (row.smartstatus) {
          ChangeSmart({ id: row.id, smartstatus: 1, token: sessionStorage.getItem('token') }).then((result) => {
            console.log(result);
            this.$message({
              type: 'success',
              message: '更改成功!'
            });
          }).catch((err) => {

          });
        } else {
          ChangeSmart({ id: row.id, smartstatus: 2, token: sessionStorage.getItem('token') }).then((result) => {
            console.log(result);
            this.$message({
              type: 'success',
              message: '更改成功!'
            });
          }).catch((err) => {

          });
        }

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消更改'
        });
      });

    },
    changefamily (row) {
      console.log(row.familystatus);
      this.$confirm('是否要更改此设备的状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (row.familystatus) {
          ChangeSmart({ id: row.id, familystatus: 1, token: sessionStorage.getItem('token') }).then((result) => {
            console.log(result);
            this.$message({
              type: 'success',
              message: '更改成功!'
            });
          }).catch((err) => {

          });
        } else {
          ChangeSmart({ id: row.id, familystatus: 2, token: sessionStorage.getItem('token') }).then((result) => {
            console.log(result);
            this.$message({
              type: 'success',
              message: '更改成功!'
            });
          }).catch((err) => {

          });
        }

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消更改'
        });
      });
    },
    select (e) {
      this.tabletype = e
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
.el-menu-item.is-active {
  padding-bottom: 0;
  background-color: #fff !important;
  color: #3370ff;
  span {
    color: #fff !important;
  }
}
</style>