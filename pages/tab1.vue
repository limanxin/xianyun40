<template>
  <div>
      <div>
          <ul>
          <li v-for="(title,index) in list" :key="index" @click="toggle(index)" :class="{active:con==index}" >{{title}}</li>
      </ul>
      </div>
      <div>
          <div v-for="(database,index) in listdate" :key="index" v-show="con==index">{{database}}</div>
      </div>
  </div>
</template>

<script>
export default {
data () {
    return {
        
        list:['新闻','体育','娱乐'],
        listdate:['1','2','3'],
        con:0
    }
},
methods: {
    toggle(index){
        this.con=index
    }
}
}
</script>

<style lang='less' scoped>
    .active{
        color: red;
    }
</style>