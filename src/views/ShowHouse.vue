<template>

  <div><el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <div>单元详情</div>
      </div>
      <el-form>
        <el-form-item label="小区名称"
                      label-width="100px">
          <p>{{ untlmsg.communityname }}</p>
        </el-form-item>

        <el-form-item label="单元名称"
                      label-width="100px">
          <p>{{ untlmsg.unitname }}</p>
        </el-form-item>

        <el-form-item label="栋数"
                      label-width="100px">
          <p>{{ untlmsg.unitnum }}</p>
        </el-form-item>

        <el-form-item label="状态"
                      label-width="100px">
          <p>{{ untlmsg.unitstatus==1?'已建成':'未建成' }}</p>
        </el-form-item>

        <el-form-item label="咨询问候"
                      label-width="100px">
          <p>{{ untlmsg.unitcontext }}</p>
        </el-form-item>
      </el-form>
    </el-card></div>
</template>

<script>
import { ShowHouseUtil } from '../api/home'
export default {
  data () {
    return {
      untlmsg: {}
    }
  },
  mounted () {
    ShowHouseUtil({ id: this.$route.params.id, token: sessionStorage.getItem('token') }).then((result) => {
      console.log(result);
      this.untlmsg = result.data
    }).catch((err) => {

    });
  }
}
</script>

<style>
</style>