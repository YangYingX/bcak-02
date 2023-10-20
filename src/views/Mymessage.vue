<template>
  <div class="main">

    <el-form :model="mydata"
             status-icon
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <p class="tittle">房号信息</p>
      <div class="topsix">

        <el-form-item label="用户账号"
                      prop="username">
          <el-input v-model="mydata.username"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名称"
                      prop="nickname">
          <el-input v-model="mydata.nickname"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别"
                      prop="sex">
          <el-input v-model="mydata.sex"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型"
                      prop="type">
          <el-input v-model="mydata.type"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话"
                      prop="phone">
          <el-input v-model="mydata.phone"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      prop="email">
          <el-input v-model="mydata.email"
                    autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="生效时间"
                      prop="createtime">
          <el-date-picker v-model="mydata.createtime"
                          type="date"
                          placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="详细住址"
                      prop="homeaddress">
          <el-input v-model="mydata.homeaddress"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="我的车位"
                      prop="parkname">
          <el-input v-model="mydata.parkname"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="计费状态"
                      prop="parkstatus">
          <el-input v-model="mydata.parkstatus"
                    autocomplete="off"></el-input>
        </el-form-item>

      </div>
      <el-form-item label="我的描述"
                    prop="note">
        <el-input v-model="mydata.note"
                  autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-upload class="avatar-uploader"
                 :action="address"
                 :headers="token"
                 :data="token"
                 :show-file-list="false"
                 with-credentials="true"
                 :on-success="handleAvatarSuccess"
                 :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl"
             :src="imageUrl"
             class="avatar">
        <i v-else
           class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
  </div>
</template>

<script>
import { GetUserByToken, GetUserById } from '../api/personal'
export default {
  data () {
    return {
      selectedOption: 'option1',
      dialogVisible: false,
      ruleForm: {
        pass: '',
        checkPass: '',
        age: ''
      },
      imageUrl: '',
      token:
      {

        "Authorization": sessionStorage.getItem("token")

      },
      mydata: {},
      address: `http://community.byesame.com/users/updateIcon`,
      Userlist: {
        username: '',
        currPage: 0,
        pageNum: 7
      },
      UsersData: []


      , userstotal: 0,
      selectedData: []
    }
  },
  mounted () {
    GetUserByToken({ token: sessionStorage.getItem('token') }).then((result) => {
      GetUserById({ id: 135, token: sessionStorage.getItem('token') }).then((result) => {
        this.mydata = result
      }).catch((err) => {

      });

    }).catch((err) => {

    });

  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }

  }

}

</script>

<style>
.main {
  margin: 20px;
  padding: 20px;
}
.topsix {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.twoarea {
  display: grid;
  grid-template-columns: 1fr;
}
.tittle {
  margin: 0;
  padding: 0;
  font-size: 20px;
  font-weight: 700;
  border-left: 5px solid rgb(32, 160, 255);
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  margin-bottom: 30px;
}
.el-input {
  width: 40vw;
}
.mypopover {
  border: 1px solid black;
  font-size: 10px; /* 更改内容文字的大小 */
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>