<template>
  <div class="main">
    <div>
      <el-form :inline="true"
               :model="selectform"
               class="demo-form-inline">
        <div class="inputs"><el-form-item label="小区名称"
                        label-width="100px">
            <el-input v-model="selectform.communityname"
                      placeholder="小区名称"
                      minlength="500px"></el-input>
          </el-form-item>
          <el-form-item label="单元名称"
                        label-width="100px">
            <el-input v-model="selectform.unitname"
                      placeholder="单元名称"
                      minlength="500px"></el-input>
          </el-form-item>
          <el-form-item label="  栋数 "
                        label-width="100px">
            <el-input v-model="selectform.unitnum"
                      placeholder="栋数"
                      minlength="500px"></el-input>
          </el-form-item>

          <el-form-item label="建成状态"
                        label-width="100px">
            <el-select v-model="selectform.unitstatus"
                       placeholder="建成状态"
                       minlength="500px">
              <el-option label="已建成"
                         value="1"></el-option>
              <el-option label="未建成"
                         value="2"></el-option>
            </el-select>
          </el-form-item>
        </div>

      </el-form>
      <div class="rightsitck">
        <el-button type="success"
                   @click="Submit"><i class="el-icon-plus"></i>录入</el-button>
        <el-button type="primary"
                   @click="back">返回</el-button>
      </div>
    </div>
    <div>
      <Editor id="tinymce"
              v-model="selectform.unitcontext"
              :init="init"></Editor>
    </div>
  </div>
</template>

<script>
import tinymce from "tinymce";
import Editor from "@tinymce/tinymce-vue"; import 'tinymce/themes/silver/theme';
import { PostHouseUtil, ShowHouseUtil, EditHouseUtil } from '../api/home'
export default {
  components: { Editor },
  data () {
    return {
      value: '',
      contenyt: {},
      init: {
        language_url: "/zh_CN.js", // 语言包位置，因为放在public下所以可以省略public
        selector: "#tinymce", //tinymce的id
        language: "zh_CN", //语言类型
        skin_url: "/skins/ui/oxide",
        height: 500, //编辑器高度
        browser_spellcheck: true, // 拼写检查
        // elementpath: false, //禁用编辑器底部的状态栏
        // statusbar: false, // 隐藏编辑器底部的状态栏
        paste_data_images: true, // 允许粘贴图像
        // menubar: false, //最顶部文字信息
        plugins: "image link code table lists wordcount",
        branding: false, //是否禁用“Powered by TinyMCE”
        toolbar: "fontselect fontsizeselect link lineheight forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | image quicklink h2 h3 blockquote table numlist bullist preview fullscreen", //工具栏
        fontsize_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
        font_formats: "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;",
      },
      formInline: {
        user: '',
        region: ''
      },
      u_id: 0,
      selectform: {
        communityname: "",
        unitname: "",
        unitnum: "",
        unitstatus: '',
        unitcontext: "",
        token: sessionStorage.getItem('token')
      },
    };

  }, mounted () {
    tinymce.init({});
    if (this.$route.params.id) {
      ShowHouseUtil({ id: this.$route.params.id, token: sessionStorage.getItem('token') }).then((result) => {

        let { communityname, unitname, unitnum, unitstatus, unitcontext } = result[0]
        this.selectform.communityname = communityname
        this.selectform.unitname = unitname
        this.selectform.unitnum = unitnum
        this.selectform.unitstatus = unitstatus
        this.selectform.unitcontext = unitcontext
      }).catch((err) => {

      });
    }
  },
  methods: {
    Submit () {
      this.$confirm('是否要提交信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {

        if (this.$route.params.id) {
          let res = await EditHouseUtil({ u_id: this.$route.params.id, ...this.selectform })

          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          this.$router.push('/house/unit')
        } else {
          let res = await PostHouseUtil(this.selectform)

          this.$message({
            message: '提交成功',
            type: 'success'
          });
          this.$router.push('/house/unit')
        }


      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    back () {
      this.$router.push('/house/unit')
    }
  }
}
</script>

<style>
.inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.main {
  margin: 20px;
  padding: 20px;
}
.rightsitck {
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 100;
  right: 0;
  top: 45%;
}
</style>