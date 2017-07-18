<template>
<div>
    <div class="scroll-top-border"></div>
    <ul class="match-scroll">
    <li v-for="(item,index) in data" 
    :key="index" 
    class="match-scroll-item" 
    @click="handleClick(index,item.league_id)"
    :class="{'match-scroll-active':activeIndex==index}">{{item.league_name}}</li>
  </ul>
</div>

</template>

<script>
export default {
  name: 'match-scroll',
  data(){
    return{
      activeIndex:0
    }
  },
  props: {
    data: {
      type: Array,
      default: [],
      leagueId:0,

    }
  },
  watch:{
    data:function(val,old){
      this.leagueId=val[0].league_id;
      this.$emit('sendleagueId',this.leagueId)
    }
  },
  methods: {
    handleClick(index,id){
      this.activeIndex=index;
      let info={
        index:index,
        id:id
      }
      this.$emit('srcollIndex',info)
    }
  }

}
</script>

<style>
.scroll-top-border{
  width: 100%;
  height: 0;
  border-bottom: 1px solid #20222d;/*px*/
}
.match-scroll {
  width: 100%;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  background-color: #344650;
  border-top:1px solid #445a67;/*px*/
}

.match-scroll-item {
  display: inline-block;
  width: 230px;
  height: 90px;
  text-align: center;
  line-height: 90px;
  /*px*/
  font-size: 30px;
  color: #607d8b;
}

.match-scroll-active{
  color: #49d4e1;
}
</style>
