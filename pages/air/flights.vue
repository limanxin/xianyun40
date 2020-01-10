<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="cacheFlightsData" 
        @setDataList="setDataList" />

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item" />
        <!-- 分页 -->
        <el-row type="flex" justify="center" style="margin-top:10px;">
          <!-- size-change：切换条数时候触发 -->
          <!-- current-change：选择页数时候触发 -->
          <!-- current-page: 当前页数 -->
          <!-- page-size：当前条数 -->
          <!-- total：总条数 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </el-row>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsFilters from "@/components/air/flightsFilters.vue";
export default {
  data() {
    return {
      //总数据
      flightsData: {
        flights: [],
        info: {},
        options: {}
      },
      cacheFlightsData: {
        // 缓存一份数据，只会修改一次
        flights: [],
        info: {},
        options: {}
      },
      // dataList: [],
      pageIndex: 1, //当前页数
      pageSize: 5, //显示条数
      total: 0
    };
  },
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters
  },
  mounted() {
    this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      console.log(res);
      this.flightsData = res.data;
      this.total = this.flightsData.total;
      // 这个是缓存的变量，一旦赋值之后不能被改
      this.cacheFlightsData = { ...res.data };
      // this.dataList = this.flightsData.flights.slice(0,5)
      // this.dataList = this.flightsData.flights;
    });
  },
  computed: {
    dataList() {
      if (!this.flightsData.flights) return [];
      return this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
    }
  },
  methods: {
    // //获取航班总数据
    // getData() {
    //   this.$axios({
    //     url: "/airs",
    //     params: this.$route.query
    //   }).then(res => {
    //     this.flightsData = res.data;
    //     this.dataList = this.flightsData.flights;
    //   });
    // },
    handleSizeChange(value) {
      this.pageSize = value;
    },
    handleCurrentChange(value) {
      this.pageIndex = value;
    },
    setDataList(arr){
      this.flightsData.flights = arr
      //修改总条数
      this.total = arr.length
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>