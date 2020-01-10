<template>
  <div class="tab">
      <div>
          <ul>
              <li v-for="(t,index) in list" :key="index" @click="to(index)" :class="{active:num===index}">{{t}}</li>
          </ul>
      </div>
      <div>
          <div v-for="(m,index) in listdate" :key="index" v-show="num===index">{{m}}</div>
      </div>
  </div>
</template>

<script>
export default {
data () {
    return {
        list:['1','2','3'],
        listdate:['11','22','33'],
        num:0
    }
},
methods: {
    to(index){
        this.num=index
    }
}
}
</script>

<style>
.active{
    color: red
}
</style>