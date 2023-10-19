<template>

  <el-container>

    <el-header><el-menu :default-active="activeIndex2"
               class="el-menu-demo blue"
               mode="horizontal"
               @select="handleSelect"
               background-color="#389af9"
               text-color="#fff"
               router>
        <el-menu-item><span class="nav-tittle">小区物业管理系统</span></el-menu-item>
        <el-menu-item index="/index"><template slot="title">首页</template></el-menu-item>
        <el-submenu v-for="item in navdata"
                    :key="item.id"
                    :index="item._key">
          <template slot="title">{{ item.title }}</template>
          <div class="submenu-items">
            <el-menu-item v-show="item.children"
                          :disabled="item.id==1"
                          v-for="item2 in item.children"
                          :key="item2.id"
                          background-color="#fff"
                          class="white"
                          :index="item2._key">{{item2.title}}</el-menu-item>
          </div>
        </el-submenu>
      </el-menu></el-header>
    <el-main><router-view></router-view></el-main>
  </el-container>

</template>

<script>
import navdata from '../JSON/nav.json'
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      navdata: []
    };
  },
  methods: {
    handleSelect (key, keyPath) {

    }
  },
  mounted () {
    let res = navdata
    console.log(res);
    this.navdata = res
  }
}
</script>

<style lang="less" >
.nav-tittle {
  margin-left: 25px;
  line-height: 56px;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
  text-align: center;
  font-size: 24px;
}
.submenu-items {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #fff !important;
}
.white {
  padding: 0;
  background-color: #fff !important;
  color: black !important;
}
.el-menu--popup {
  padding: 5px 0 !important;
  background-color: #fff !important;
}
// .blue,
// .blue:hover {
//   background-color: #389af9;
// }
</style>