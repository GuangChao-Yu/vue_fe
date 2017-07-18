<template>
  <div>
    <div class="battle-body" @click="goLeadDetails(index)">
      <div class="battle-body-list"> 
        <div class="battle-body-list-header">
          <div class="battle-body-list-header-left">
            <span class="battle-body-list-header-left-time">创建时间</span>
            <span class="battle-body-list-header-left-time">@{{creatTime(todos.created_time)}}</span>
          </div>
          <div class="battle-body-list-header-right">
            <div class="battle-body-list-header-right-img" @click="goMapplayer(index)">导入阵容</div>
          </div>
        </div>
        <team-member :todos="todos"></team-member>
      </div>
    </div>
  </div>
</template>
<script>
import teamMember from '../../components/common/teamMember'


export default {
  name: 'battle-list',
  components: {
    [teamMember.name]: teamMember
  },
  props: {
    todos: {
      type: Object,
      default() {
        return {}
      }
    },
    index:{
      type:Number,
      default(){
        return 0
      }
    }
  },
  data() {
    return {

    }

  },
  methods: {
    creatTime(time) {
      let date = new Date(time * 1000);
      let Y = date.getFullYear() + '/';
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
      let D = date.getDate() + ' ';
      let h = date.getHours() + '时';
      return Y + M + D + h;
    },
    goMapplayer(index) {
      this.$emit('leadIndex',index);
    },
    goLeadDetails(index){
      this.$emit('leadIndexTow',index);
    }
  }
}
</script>
<style src="../../css/commponent/battle.css">

</style>
