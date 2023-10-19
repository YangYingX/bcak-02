<template>

  <div><el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <div>计费项目查看</div>
      </div>
      <el-form>
        <el-form-item label="项目计费名称"
                      label-width="150px">
          <p>{{ untlmsg.payname }}</p>
        </el-form-item>

        <el-form-item label="项目优先级"
                      label-width="150px">
          <p>{{ untlmsg.paylevel }}</p>
        </el-form-item>

        <el-form-item label="项目用量/时长"
                      label-width="150px">
          <p>{{ untlmsg.paytime }}</p>
        </el-form-item>
        <el-form-item label="项目价格"
                      label-width="150px">
          <p>{{ untlmsg.paymoney }}</p>
        </el-form-item>

        <el-form-item label="通知状态"
                      label-width="150px">
          <p>{{ untlmsg.paystatus==1?'已缴费':'未缴费' }}</p>
        </el-form-item>

        <el-form-item label="通知人"
                      label-width="150px">
          <p>{{ untlmsg.username }}</p>
        </el-form-item>
        <el-form-item label="通知内容"
                      label-width="150px">
          <p v-html="untlmsg.paycontent"></p>
        </el-form-item>
      </el-form>
    </el-card>
    <div>
      <el-button type="primary"
                 @click="edithouse">编辑</el-button>
      <el-button type="primary"
                 @click="back">返回</el-button>
    </div>
  </div>
</template>

<script>
import { GetCostById } from '../api/pay'
export default {
  data () {
    return {
      untlmsg: {}
    }
  },
  mounted () {
    GetCostById({ id: this.$route.params.id, token: sessionStorage.getItem('token') }).then((result) => {
      console.log(result);
      this.untlmsg = result[0]
    }).catch((err) => {

    });
  }, methods: {
    edithouse () {
      this.$router.push(`/house/unit/add/${this.$route.params.id}`)
    }, back () {
      this.$router.push('/house/unit')
    }
  }
}
</script>

<style>
</style>