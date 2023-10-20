<template>
  <div class="doc">
    <div>
      <el-form :inline="true"
               :model="selectform"
               class="demo-form-inline">
        <el-form-item>
          <el-input v-model="selectform.homename"
                    placeholder="维修房主"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="selectform.resultstatus"
                     placeholder="建成状态">
            <el-option label="已维修"
                       value="1"></el-option>
            <el-option label="待维修"
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

        <el-form-item>
          <el-button type="primary"
                     @click="submit"><i class="el-icon-search"></i></el-button>
        </el-form-item>

        <el-button type="primary"
                   @click="reset"><i class="el-icon-refresh-right"></i>重置</el-button>

      </el-form>
    </div>
    <div> <el-table :data="tableData"
                stripe
                style="width: 100%">

        <el-table-column type="index"
                         label="序号"
                         width="180">
        </el-table-column>
        <el-table-column prop="homename"
                         label="发布人员"
                         width="180">
        </el-table-column>
        <el-table-column prop="housename"
                         label="房屋信息"
                         width="180">
        </el-table-column>
        <el-table-column prop="repaircontent"
                         label="维修内容">
        </el-table-column>
        <el-table-column prop="createtime"
                         label="发布时间">
          <template scope="scope">
            {{ dayjs(scope.row.createtime) }}
          </template>
        </el-table-column>
        <el-table-column prop="resultcontent"
                         label="处理结果">
        </el-table-column>
        <el-table-column prop="resultstatus"
                         label="处理状态">
          <template scope="scope">
            {{ scope.row.resultstatus==1?'已处理':'未处理' }}
          </template>
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
                     :page-size="this.selectform.pageNum"
                     layout="total, sizes, prev, pager, next"
                     :total="pagetotal">
      </el-pagination></div>
    <div>
      <div>
        <el-dialog title="提示"
                   :visible.sync="checkVisible"
                   width="30%">

          <el-form :inline="true"
                   :model="readdata"
                   class="demo-form-inline">
            <el-form-item label="发布人员">
              <el-input v-model="readdata.homename"
                        placeholder="发布人员"></el-input>
            </el-form-item>

            <el-form-item label="房屋信息">
              <el-input v-model="readdata.housename"
                        placeholder="房屋信息">
              </el-input>
            </el-form-item>

            <el-form-item label="维修内容">
              <el-input v-model="readdata.repaircontent"
                        placeholder="维修内容"></el-input>
            </el-form-item>
            <el-form-item label="处理结果">
              <el-input v-model="readdata.resultcontent"
                        placeholder="处理结果"></el-input>
            </el-form-item>

            <el-form-item label="处理状态">
              <el-switch :value="readdata.resultstatus==1"
                         @change="changeStatus"
                         active-text="已修复"
                         inactive-text="待处理">
              </el-switch>
            </el-form-item>

          </el-form>

          <span slot="footer"
                class="dialog-footer">
            <el-button type="primary"
                       @click="checkVisible = false">关闭</el-button>
            <el-button type="primary"
                       @click="submitrepair">提交</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { GetSmartData, DelRepairData, EditRepairData } from '@/api/post'
var dayjs = require('dayjs')
export default {
  data () {
    return {
      tableData: [],
      dataarea: [],
      pagemsg: {
        pageNum: 10,
        currPage: 0
      },
      checkVisible: false,
      readdata: {
        r_id: null,
        homename: null,
        housename: null,
        repaircontent: null,
        resultcontent: null,
        resultstatus: null,
        token: sessionStorage.getItem('token')
      },
      pagetotal: 0,
      selectform: {
        repairtype: 2,
        homename: '',
        resultstatus: '',
        startDate: '',
        endDate: '',
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
    GetSmartData(this.selectform).then((result) => {

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
      let res = await GetSmartData(this.selectform)

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
        repairtype: 2,
        homename: '',
        resultstatus: '',
        startDate: '',
        endDate: '',
        currPage: 0,
        pageNum: 10,
        token: sessionStorage.getItem('token')
      }
    },
    Delete (row) {
      if (row.resultstatus == 1) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await DelRepairData({ id: row.id, token: sessionStorage.getItem('token') })

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

      } else {
        this.$message({
          message: '该项维修尚未处理',
          type: 'warning'
        });
      }

    },
    show (row) {
      this.readdata.r_id = row.r_id
      this.readdata.homename = row.homename
      this.readdata.housename = row.housename
      this.readdata.repaircontent = row.repaircontent
      this.readdata.resultcontent = row.resultcontent
      this.readdata.resultstatus = row.resultstatus



      this.checkVisible = true
    },
    changeData () {
      console.log(this.dataarea);
      this.selectform.startDate = this.dataarea[0]
      this.selectform.endDate = this.dataarea[1]
    }, changeStatus (e) {
      e ? this.readdata.resultstatus = 1 : this.readdata.resultstatus = 0
    },
    submitrepair () {
      EditRepairData(this.readdata).then((result) => {
        console.log(result);
        this.$message({
          type: 'success',
          message: '提交成功!'

        });
        this.checkVisible = false
      }).catch((err) => {

      });
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