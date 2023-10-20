<template>

  <div><el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <div>单元详情</div>
      </div>
      <el-form :model="untlmsg">
        <div class="formarea">
          <el-form-item label="缴费产品"
                        label-width="100px">
            <el-input v-model="untlmsg.payname"
                      readonly></el-input>
          </el-form-item>
          <el-form-item label="缴费人员"
                        label-width="100px">
            <el-input v-model="untlmsg.username"
                      readonly></el-input>
          </el-form-item>
          <el-form-item label="缴费金额"
                        label-width="100px">
            <el-input v-model="untlmsg.paymoney"
                      readonly></el-input>
          </el-form-item>
          <el-form-item label="缴费优先级"
                        label-width="100px">
            <el-input v-model="untlmsg.paylevel"
                      readonly></el-input>
          </el-form-item>
          <el-form-item label="支付时间"
                        label-width="100px">
            <el-input :value="dayjs(untlmsg.paytime)"
                      readonly></el-input>
          </el-form-item>
          <el-form-item label="支付状态"
                        label-width="100px">
            <el-input :value="untlmsg.paystatu==1?'已支付':'未支付'"
                      readonly></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="支付类型">

            <el-radio-group v-model="untlmsg.costtype">
              <el-radio :label="3"
                        disabled><img src="../../public/imgs/zfb1.4e5cf19b.png"
                     alt=""></el-radio>
              <el-radio :label="6"><img src="../../public/imgs/wx1.f21631b0.png"
                     alt=""
                     disabled></el-radio>
              <el-radio :label="9"><img src="../../public/imgs/ysf.a4d32ab5.png"
                     alt=""
                     disabled></el-radio>
            </el-radio-group>

          </el-form-item>
        </div>
        <el-form-item label="回复内容"
                      label-width="100px">
          <p style="height: 200px;"
             v-html="untlmsg.costconnect"></p>
        </el-form-item>
      </el-form>
    </el-card>
    <div>
      <el-button type="primary"
                 @click="back">返回</el-button>
    </div>
  </div>
</template>

<script>
import { GetCostMsg } from '../api/pay'
import dayjs from 'dayjs';
export default {
  data () {
    return {
      untlmsg: {}
    }
  },
  mounted () {
    GetCostMsg({ id: this.$route.params.id, token: sessionStorage.getItem('token') }).then((result) => {

      this.untlmsg = result[0]
    }).catch((err) => {

    });
  }, methods: {

    dayjs (e) {
      if (e) { return dayjs(e).format('YYYY-MM-DD') }
      else { return '暂无' }

    },
    back () {
      this.$router.push('/pay/payMessage')
    }
  }
}
</script>

<style>
.formarea {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
}
img {
  width: 100px;
  height: 100px;
}
.el-radio-group {
  display: flex;
}
.el-radio {
  display: flex;
}
.el-radio__input {
  line-height: 100px;
}
</style>