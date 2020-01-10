<template>
  <div>
      <div>
        <ul>
        <li v-for="(title,index) in list" :key="index" @click="toggle(index)" :class="{active:num==index}">{{title}}</li>
        </ul>
      </div>
        <div >
            <div v-for='(m,index) in listdata' :key="index" v-show="num==index">{{m}}</div>
        </div>
  </div>
</template>

<script>
export default {
data () {
    return {
        list:['新闻','体育','娱乐'],
        listdata:['1','2','3'],
        num:0
    }
},
methods: {
    toggle(index){
      this.num=index
    }
}
}
</script>

<style lang='less' scoped>
.active{
  color: red;
}
li{
list-style: none;
}
</style>