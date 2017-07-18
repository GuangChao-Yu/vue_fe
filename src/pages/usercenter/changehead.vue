<template>
<div>
  <div v-title>无限电竞</div>
  <div class="weChat-title">
    <span class="weChat-title-icon" @click="goback">
    <img src="../../assets/lineUp/back@2x.png" />
    </span>选择头像
    <span class="weChat-save-btn" @click="saveUserInfo">保存</span>
  </div>
  <div class="changeheade-head">
    <div class="changeheade-img"><img :src="userfo.img" /></div>
    <div class="changeheade-name">{{userfo.name}}</div>
  </div>
  <div class="changehead-con">
    <ul class="changehead-ul">
      <li class="changehead-li" v-for="(item,key) in listdata" :class="{
        'changehead-li-active':item.img_select==1
      }" @click="choseImg(item.img_id,key)"><img :src="item.img_url"/><i class="changehead-select-icon"></i></li>
    </ul>
  </div>
  <dialog-tips :tips="tips" :showTips="showTips"></dialog-tips>
</div>
</template>

<script>
import {
  saveAuth,
  getAuth,
  delAuth
} from '@/handle/auth'
import router from '../../router/index.js'
import * as api from '../../server/api.js'
import _ from 'lodash';
import { mapGetters } from 'vuex'
import dialogTips from '../../components/common/dialogtips'

export default {
  name:'changehead',
  data(){
    return{
      listdata:[],
      userfo:{img:'',name:''},
      uid:0,
      token:'',
      selectid:1,
      title:'保存成功',
      dtitle:'',
      isShowDialogFeault:false,
      isShowBtn:false,
      //dialogtips props
      tips: '',
      showTips: false,
    }
  },
  created:function(){
    let auth =getAuth();
    this.userfo.img=this.getUserInfo.head_img_url;
    this.userfo.name=this.getUserInfo.user_name;
    if(auth){
      this.uid=auth.uid;
      this.token=auth.token;
      api.getUserHeadImg({
        uid:this.uid,
        token:this.token
      }).then((res)=>{
        this.listdata=res.data.result.HeadImgList;
      })
    }else{
      console.log('没有登录');
    }
  },
  computed:{
    ...mapGetters(['getUserInfo']),
  },
  components:{
    [dialogTips.name]:dialogTips,
  },
  methods:{
    goback(){
      //window.history.go(-1);
      router.push({name:'edit'})
    },
    saveUserInfo(){
      api.updateHeadImg({
        uid:this.uid,
        img_id:this.selectid,
        token:this.token
      }).then((res)=>{
        if(res.data.status==0){
          //更新vuex中数据
          let query={
            uid:this.uid,
            token:this.token
          }
          this.tips="更换头像成功!"
          this.showTips=true;
          this.$store.dispatch('setUserInfo',query);
          setTimeout(()=>{
            this.showTips=false;
            router.push({name:'edit'});
          },1500)
        }else{
          this.tips="更换头像失败"
          this.showTips=true;
          setTimeout(()=>{
            this.showTips=false
          },1500)
        }
      })
    },
    choseImg(id,key){
      this.listdata.map((item,key)=>{
        item.img_select=0;
      })
      this.listdata[key].img_select=1;
      this.userfo.img=this.listdata[key].img_url;
      this.selectid=id;
    }
  }
}
</script>

<style src="../../css/pages/usercenter/changehead.css"></style>