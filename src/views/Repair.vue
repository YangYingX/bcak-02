<template>
  <div style="display: flex; ">
    <div @click="smart"><el-card class="box-card"
               style="background-color: rgb(32, 160, 255); width: 190px;
						 height: 160px; text-align: center; padding-top: 20px; box-sizing: border-box;">
        <i class="el-icon-headset"
           style="font-size: 50px; color: white;"></i>
        <p style="font-size: 20px; color: white;"
           @click="smart">智能设备维修</p>

      </el-card></div>
    <div @click="house">
      <el-card class="box-card"
               style="background-color: rgb(19, 206, 102); width: 190px;
						 height: 160px; text-align: center; padding-top: 20px; box-sizing: border-box;">
        <i class="el-icon-price-tag"
           style="font-size: 50px; color: white;"></i>
        <p style="font-size: 20px; color: white;">家居设备维修</p>

      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    smart () {
      this.$router.push('/service/smartrepair')
    }, house () {
      this.$router.push('/service/houserepair')
    }
  }
}
</script>

<style>
</style>