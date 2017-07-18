<template>
  <div class="mask" v-if="isShow" @click="hidedialog">
    <div class="mask-default-box">
      <p class="dialog-default-title1">{{title}}</p>
      <p class="dialog-default-title2" v-if="isshowDtitle()">{{dtitle}}</p>
      <div class="dialog-default-btn-warp"  v-if="isShowBtn"><span class="dialog-default-btn" @click="hidedialog">知道了</span></div>
    </div>
  </div>
</template>

<script>
  export default {
    name:'dialog-default',
    props:{
      isShow:{
        type:Boolean,
        default(){
          return false
        }
      },
      title:{
        type:String,
        default(){
          return '标题'
        }
      },
      dtitle:{
        type:String,
        default(){
          return ''
        }
      },
      isShowBtn:{
        type:Boolean,
        default(){
          return true
        }
      }
    },
    data(){
      return{

      }
    },
    methods:{
      hidedialog(){
        this.$emit('hidedialog',false);
      },
      isshowDtitle(){
        if(this.dtitle==''){
          return false
        }else{
          return true
        }
      }
    }
  }
</script>
<style src="../../css/commponent/dialog.css">
</style>
