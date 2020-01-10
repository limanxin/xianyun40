<template>
  <section class="container">
    <!-- 左侧推荐城市
    <el-row type="flex" justify="space-between">
      <div v-for="(item,index) in menu" :key="index">

      </div>
       右边推荐攻略 
      <div>1231</div>
    </el-row> -->
    <el-row :gutter="20">
  <el-col :span="7"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="17"><div class="grid-content bg-purple"></div></el-col>
</el-row>
  </section>
</template>

<script>
export default {
  data () {
    return {
      //城市菜单
      menu:[]  
    }
  },
  mounted () {
    this.$axios({
      url:'/posts/cities'
    }).then(res=>{
      console.log(res);
      this.menu = res.data.data
      console.log(this.menu);
      
    })
  }
};
</script>

<style lang= 'less' scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>