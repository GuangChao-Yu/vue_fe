<template>
  <div v-if="isShow">
    <!--第一个页面-->
    <div class="shouye" v-if="num==0" v-show="zhanshi">
      <div class="shouye1" v-if="shouye1">
        <div class="shouye1-img">
          <img src="../../assets/newguide/首页.png" />
        </div>
        <div class="shouye1-btn" @click="shouye1btn">
          <img src="../../assets/newguide/我知道了.png" />
        </div>
      </div>
      <div class="shouye3" v-else>
        <div class="shouye1-img">
          <img src="../../assets/newguide/首页2.png" />
        </div>
        <div class="shouye2-btn" @click="shouye2btn">
          <img src="../../assets/newguide/我知道了.png" />
        </div>
      </div>
    </div>
    <!--第二个页面-->

    <div class="shouye" v-if="num==1" v-show="zhanshi">
      <div id="" v-show="fenye">
        <div class="shouye1" v-if="shouye1">
          <div class="shouye1-img">
            <img src="../../assets/newguide/界面说明2.png" />
          </div>
          <div class="shouye3-btn" @click="shouye1btn">
            <img src="../../assets/newguide/我知道了.png" />
          </div>
        </div>
        <div class="shouye2" v-else>
          <div class="shouye1-img-one">
            <img src="../../assets/newguide/界面说明.png" />
          </div>
          <div class="shouye4-btn" @click="shouye4btn">
            <img src="../../assets/newguide/我知道了.png" />
          </div>
        </div>
      </div>

      <div id="" v-show="fenye1">
        <div class="shouye1">
          <div class="shouye1-img">
            <img src="../../assets/newguide/花费提交确认.png" />
          </div>
          <div class="shouye5-btn" @click="shouye2btn">
            <img src="../../assets/newguide/我知道了.png" />
          </div>
        </div>
      </div>

    </div>

    <!--第四个页面-->

    <div class="shouye" v-if="num==3" v-show="zhanshi">
      <div id="" v-show="fenye">
        <div class="shouye4" v-if="shouye1">
          <div class="shouye1-img">
            <img src="../../assets/newguide/我的分数2-开始.png" />
          </div>
          <div class="shouye6-btn" @click="shouye1btn">
            <img src="../../assets/newguide/我知道了.png" />
          </div>
        </div>
        <div class="shouye2" v-else>
          <div class="shouye1-img">
            <img src="../../assets/newguide/我的分数2-结束.png" />
          </div>
          <div class="shouye7-btn" @click="shouye7btn">
            <img src="../../assets/newguide/我知道了.png" />
          </div>
        </div>
      </div>

      <div id="" v-show="fenye1">
        <div class="shouye4" v-if="shouye1">
          <div class="shouye1-img">
            <img src="../../assets/newguide/我的分数3-开始.png" />
          </div>
          <div class="shouye8-btn" @click="shouye1btn">
            <img src="../../assets/newguide/我知道了.png" />
          </div>
        </div>
        <div class="shouye2" v-else>
          <div class="shouye1-img">
            <img src="../../assets/newguide/我的分数3-结束.png" />
          </div>
          <div class="shouye8-btn" @click="shouye2btn">
            <img src="../../assets/newguide/我知道了.png" />
          </div>
        </div>
      </div>

    </div>

    <!--第五个页面-->

    <div class="newguide" v-if="num==4">
      <div class="">
        <img src="" />
        <img src="" />
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: "new-guide",
  props: {
    num: {
      type: Number,
      default() {
        return 0
      }
    },
    isShow: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  data() {
    return {
      data: [],
      shouye1: true,
      zhanshi: true,
      fenye: true,
      fenye1: false,

    }
  },
  methods: {
    shouye1btn() {
      this.shouye1 = !this.shouye1;
    },
    shouye2btn() {
      this.zhanshi = false
    },
    shouye7btn() {
      this.fenye = false,
        this.fenye1 = true,
        this.shouye1 = true
    },
    shouye4btn() {
      this.fenye = false,
        this.fenye1 = true
    }
  }
}
</script>
<style>
.shouye {
  position: absolute;
  top: 0;
  left: 0;
  width: 750px;
  z-index: 1000;
}

.shouye1 {
  width: 750px;
  position: fixed;
}

.shouye3 {
  width: 750px;
  position: fixed;
}

.shouye1-img {
  width: 750px;
  position: absolute;
}

.shouye1-img-one {
  width: 750px;

  position: absolute;
}
.shouye1-img-one img{
  width: 100%;
  background-size: 100% 100%;

}
.shouye4 {
  width: 750px;
}

.shouye1-img img {
  width: 100%;
  background-size: cover;
}

@media (device-height:736px) and (-webkit-min-device-pixel-ratio:2) {
  /* 兼容iphone6 Plus */
  .shouye1-img {
    width: 100%;
    position: relative;
  }
  .shouye1-img img {
    position: absolute;
  }
}

.shouye1-btn {
  position: absolute;
  top: 139px;
  left: 106px;
  /*px*/
  width: 204px;
  height: 74px;
  /*px*/
}

.shouye1-btn img {
  width: 100%;
  background-size: cover;
}

.shouye2-btn {
  position: absolute;
  top: 760px;
  /*px*/
  left: 528px;
  width: 204px;
  height: 74px;
  /*px*/
}

.shouye2-btn img {
  width: 100%;
  background-size: cover;
}

.shouye3-btn {
  position: absolute;
  top: 244px;
  left: 125px;
  width: 204px;
  height: 74px;
  /*px*/
}

.shouye3-btn img {
  width: 100%;
  background-size: cover;
}

.shouye4-btn {
  position: absolute;
  top: 950px;
  left: 318px;
  width: 204px;
  height: 74px;
  /*px*/
}

.shouye4-btn img {
  width: 100%;
  background-size: cover;
}

.shouye5-btn {
  position: absolute;
  top: 890px;
  left: 528px;
  width: 204px;
  height: 74px;
  /*px*/
}

.shouye5-btn img {
  width: 100%;
  background-size: cover;
}

.shouye6-btn,
.shouye7-btn {
  position: absolute;
  top: 1035px;
  left: 535px;
  width: 204px;
  height: 74px;
  /*px*/
}

.shouye6-btn img,
.shouye7-btn img {
  width: 100%;
  background-size: cover;
}

.shouye8-btn {
  position: absolute;
  top: 1170px;
  left: 530px;
  width: 204px;
  height: 74px;
  /*px*/
}

.shouye8-btn img {
  width: 100%;
  background-size: cover;
}
</style>
