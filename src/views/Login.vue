<template id="temp">
  <div class="login">
    <div class="login-item">
      <h1>欢迎登录小区物业系统</h1>
      <el-form ref="loginref"
               :rules="rules"
               :model="form"
               label-width="80px">
        <el-form-item label-width="0"
                      prop="username">
          <el-input prefix-icon="el-icon-user-solid"
                    v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label-width="0"
                      prop="password">
          <el-input show-password
                    prefix-icon="el-icon-lock"
                    v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label-width="0">
          <el-button class="login-button"
                     type="primary"
                     @click="postuser()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Postuser } from '../api/login'

export default {
  data () {
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },

        ]
      }
    }
  },
  methods: {
    postuser () {
      Postuser(this.form).then((result) => {
        console.log(result, 1);
        sessionStorage.setItem('token', result.jwt_token)
        this.$router.push('/')
      }).catch(() => {
        this.$message.error('用户名或密码错误');
      });

    }
  }
}
</script>

<style scoped lang="less">
.login {
  background-color: #4086e2;
  height: 100vh;
  .login-item {
    min-width: 30%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    h1 {
      text-align: center;
      color: white;
      margin-bottom: 30px;
    }
    .login-button {
      width: 100%;
      margin: 0 auto;
    }
  }
}
</style>
