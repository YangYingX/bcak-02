<template>
  <div>
    <div class="topmsg">
      <span>最新公告</span>
      <div class="scloop"> <el-carousel height="60px"
                     direction="vertical"
                     :autoplay="true">
          <el-carousel-item v-for="item in posterdata"
                            :key="item.p_id">
            <span>·{{ item.communityname }}</span>
            <span>·{{ item.content }}</span>
            <span>·{{ dayjs(item.createtime)}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b class="more"> 更多</b></span>

          </el-carousel-item>
        </el-carousel></div>
    </div>
    <div class="cardlist">
      <div class="cardlist1">
        <el-card class="box-card">
          <div class="card1content">
            <i class="el-icon-user"
               style="color: #389af9;"></i>
            <div>
              <p>
                {{ usernum }}
              </p>
              <p>系统用户数</p>
            </div>
          </div>
        </el-card>
        <el-card class="box-card">
          <div class="card1content">
            <i class="el-icon-s-order"
               style="color: #aee86a;"></i>
            <div>
              <p>
                {{paynum}}
              </p>
              <p>计费订单数量</p>
            </div>
          </div>
        </el-card>
        <el-card class="box-card">
          <div class="card1content">
            <i class="el-icon-truck"
               style="color: #f2b90e;"></i>
            <div>
              <p>
                {{ parks }}
              </p>
              <p>车位总量</p>
            </div>
          </div>
        </el-card>
        <el-card class="box-card">
          <div class="card1content">
            <i class="el-icon-edit"
               style="color: #b28b7c;"></i>
            <div>
              <p>
                {{feedback}}
              </p>
              <p>用户反馈数量</p>
            </div>
          </div>
        </el-card>
      </div>
      <div class="cardlist2">
        <el-card class="box-card">
          <div class="pic1"
               ref="pic1"></div>
        </el-card>
        <el-card class="box-card">
          <div class="pic2"
               ref="pic2"></div>
        </el-card>
        <el-card class="box-card">
          <div class="pic3"
               ref="pic3"></div>
        </el-card>

      </div>
      <div class="cardlist3">
        <el-card class="box-card">
          <div class="pic4"
               ref="pic4"></div>
        </el-card>
        <el-card class="box-card">
          <div class="repairtext">
            <el-table ref="filterTable"
                      :data="tableData"
                      style="width: 100% font-size=14px "
                      class="repairtext"
                      :cell-style="{padding: '0'}"
                      :row-style="{height: '45px'}">
              <el-table-column prop="repaircontent"
                               label="维修内容"
                               class="repairtext"
                               show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="createtime"
                               label="保修时间"
                               class="repairtext"
                               show-overflow-tooltip>
                <template slot-scope="scope">
                  {{dayjs(scope.row.createtime)}}
                </template>
              </el-table-column>
              <el-table-column prop="resultstatus"
                               label="状态"
                               class="repairtext"
                               show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-tag :type="scope.row.resultstatus == '1' ? 'success' : 'warning'"
                          disable-transitions>{{tabletype[scope.row.resultstatus]}}</el-tag>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination-container">
              <el-pagination small
                             layout="prev, pager, next"
                             @current-change="changepaper"
                             :page-size="tableparams.pageNum"
                             :total="tabletotal">
              </el-pagination>
            </div>
          </div>
        </el-card>

      </div>
    </div>
  </div>
</template>

<script>
import { Getposter, GetUsersdata, GetParkOrder, GetPayMessage, GetFeedBack, GetParkData, GetCostData, GetLoginMonth, GetRepairData } from '../api/index'
var dayjs = require('dayjs')
export default {
  data () {
    return {
      posterdata: [],
      card1: {
        currPage: 0, pageNum: 4
      }, paynum: 0,
      usernum: 0,
      parks: 0,
      feedback: 0,

      // 饼状图数据
      optionpie: {
        title: {
          text: '小区分布统计',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        toolbox: {
          feature: {
            saveAsImage: {}, // 下载图片
            dataView: {}, // 数据视图
            restore: {}, // 刷新
          }
        },
        series: [
          {
            name: '小区分布',
            type: 'pie',
            radius: '50%',
            data: [
            ],
            label: {
              formatter: '{b}: 25%',
              fontSize: 12
            }
          }
        ]
      },
      optionbar: {
        title: {
          text: '车位数/已分配量/已缴费'
        },
        legend: {
          left: 'right'
        },
        tooltip: {},
        dataset: {
          source: [
            ['product', '2015', '2016', '2017'],
            ['A区车位',],
            ['B区车位',],
            ['C区车位',],
            ['D区车位',]
          ]
        },
        xAxis: { type: 'category' },
        yAxis: {},

        series: [{
          type: 'bar',
          label: {
            show: true,
            position: 'top'
          },
          barWidth: 20
        }, {
          type: 'bar', label: {
            show: true,
            position: 'top'
          },
        }, {
          type: 'bar', label: {
            show: true,
            position: 'top'
          },
        }]
      },
      // 雷达图数据
      radaroption: {
        title: {
          text: '缴费项目订单',
          left: 'right'
        },
        legend: {
          data: ['计费项目']
          , left: 'left'
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '电费单', max: 12 },
            { name: '水费固定月单', max: 12 },
            { name: '水费按量单', max: 12 },
            { name: '天然气单', max: 12 },
            { name: '物业费单', max: 12 },
            { name: '宽带费单', max: 12 }
          ]
        },
        series: [
          {
            name: '计费项目',
            type: 'radar',
            data: [
              {
                value: [],
                areaStyle: {
                  color: 'blue' // 设置数据区域的颜色
                }
              }

            ]
          }
        ]
      },
      // 折线图数据
      lineoption: {
        title: {
          text: '当月用户访问量',
          left: 'left'
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        legend: {
          data: ['访问人数']
          , left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line'
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {},
            restore: {},
            dataView: {}, magicType: {
              type: ['line', 'bar']
            },
          }, right: '50px',
          top: '10px'
        },
        series: [
          {
            name: '访问人数',
            data: [],
            type: 'line',
            smooth: true
          }
        ]
      },
      //表格数据
      tableData: [],
      //表格分页器
      tabletotal: 0,
      tableparams: {
        currPage: 0,
        pageNum: 4
      },
      tabletype: ['', '已修复', '待处理']
    }

  },
  created () {

  },
  mounted () {

    Getposter({ currPage: 0, pageNum: 100 }).then((result) => {
      this.posterdata = result.data
    })
    Promise.all([
      GetFeedBack(this.card1),
      GetParkOrder(this.card1),
      GetPayMessage(this.card1),
      GetUsersdata(this.card1)
    ]).then((results) => {
      this.feedback = results[0].total;
      this.parks = results[1].total;
      this.paynum = results[2].total;
      this.usernum = results[3].total;
    });

    Promise.all([
      GetParkOrder({ parkname: 'A', orderstatus: 1, currPage: 0, pageNum: 4 }),
      GetParkOrder({ parkname: 'B', orderstatus: 1, currPage: 0, pageNum: 4 }),
      GetParkOrder({ parkname: 'C', orderstatus: 1, currPage: 0, pageNum: 4 }),
      GetParkOrder({ parkname: 'D', orderstatus: 1, currPage: 0, pageNum: 4 })
    ]).then((results) => {
      results.forEach((result, index) => {
        this.optionpie.series[0].data.push({ value: result.total, name: `${String.fromCharCode(65 + index)}栋` });
      });
      var myChart1 = this.$echarts.init(this.$refs.pic1);
      myChart1.setOption(this.optionpie);
    });

    Promise.all([
      GetParkData({ parkname: 'A', currPage: 0, pageNum: 4 }),
      GetParkData({ parkname: 'B', currPage: 0, pageNum: 4 }),
      GetParkData({ parkname: 'C', currPage: 0, pageNum: 4 }),
      GetParkData({ parkname: 'D', currPage: 0, pageNum: 4 })
    ]).then((results) => {

      results.forEach((result, index) => {
        this.optionbar.dataset.source[index + 1].push(result.total)
      })
      Promise.all([
        GetParkData({ parkname: 'A', parkstatus: 1, currPage: 0, pageNum: 4 }),
        GetParkData({ parkname: 'B', parkstatus: 1, currPage: 0, pageNum: 4 }),
        GetParkData({ parkname: 'C', parkstatus: 1, currPage: 0, pageNum: 4 }),
        GetParkData({ parkname: 'D', parkstatus: 1, currPage: 0, pageNum: 4 })
      ]).then((results) => {

        results.forEach((result, index) => {
          this.optionbar.dataset.source[index + 1].push(result.total)
          this.optionbar.dataset.source[index + 1].push(0)
          var myChart2 = this.$echarts.init(this.$refs.pic2);
          myChart2.setOption(this.optionbar);
        })

      })
    })
    Promise.all([
      GetCostData({ c_id: 7, currPage: 0, pageNum: 4 }),
      GetCostData({ c_id: 8, currPage: 0, pageNum: 4 }),
      GetCostData({ c_id: 9, currPage: 0, pageNum: 4 }),
      GetCostData({ c_id: 10, currPage: 0, pageNum: 4 }),
      GetCostData({ c_id: 11, currPage: 0, pageNum: 4 }),
      GetCostData({ c_id: 12, currPage: 0, pageNum: 4 }),
    ]).then(results => {


      results.forEach((result, index) => {
        this.radaroption.series[0].data[0].value.push(result.total)
        var myChart3 = this.$echarts.init(this.$refs.pic3);
        myChart3.setOption(this.radaroption);
      })
    })
    GetLoginMonth().then((result) => {

      let num = []
      let days = []
      let now = dayjs().format('YYYY-MM-')
      for (let i = 0; i < 32; i++) {
        let day = i < 10 ? '0' + i : i
        days.push(day)
        day = now + day
        let count = result.filter(item => item.createtime.includes(day)).length
        num.push(count)

      }
      this.lineoption.xAxis.data = days
      this.lineoption.series[0].data = num
      var myChart4 = this.$echarts.init(this.$refs.pic4);
      myChart4.setOption(this.lineoption);
    }).catch((err) => {

    });

    GetRepairData({
      currPage: 0,
      pageNum: 4
    }).then((result) => {
      this.tableData = result.data
      this.tabletotal = result.total
    }).catch((err) => {

    });
  },
  methods: {
    dayjs (e) {
      return dayjs(e).format('YYYY-MM-DD HH mm:ss')
    },
    changepaper (e1) {
      this.tableparams.currPage = e1 - 1
      this.getrepairdata()
    },
    async getrepairdata () {
      let res = await GetRepairData(this.tableparams)
   
      this.tableData = res.data
    }
  }
}
</script>

<style lang="less" scoped>
.topmsg {
  display: flex;
  align-items: center;
  span {
    width: 6vw;
    text-align: center;
    float: left;
    font-weight: 700;
    color: #4995f7;
    padding: 18px;
    font-size: 14px;
  }
  .scloop {
    width: 94vw;
    span {
      width: 15vw;
    }
    span:last-child {
      color: black;
      width: 50vw;
    }
    .more {
      color: #4995f7;
      font-size: 14px;
    }
  }
}
.cardlist {
  padding: 20px;
}
.cardlist1 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
  height: 110px;

  i {
    font-size: 60px;
    margin-right: 40px;
  }
  .card1content {
    display: flex;
    align-items: center;
    justify-content: center;
    p:nth-child(1) {
      font-size: 32px;
      font-weight: 700;
    }
  }
}
.cardlist2 {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  height: 290px;
  .pic1,
  .pic2,
  .pic3 {
    width: 450px;
    height: 260px;
  }
}

.cardlist3 {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 20px;
  height: 270px;
  .pic4 {
    width: 1400px;
    height: 300px;
  }
}
.repairtext {
  font-size: 12px;
  line-height: 10px;
}
.pagination-container {
  display: flex;
  justify-content: center;
}
</style>