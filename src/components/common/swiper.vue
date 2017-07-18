<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="str in getBanner" :style="{ backgroundImage: 'url(' + str + ')' }">
        <img :src="str" alt="">
      </div>
    </div>
    <div class="swiper-pagination swiper-pagination-white"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css';
import * as api from '../../server/api.js'
import { mapGetters } from 'vuex'
import {getGameType } from '@/handle/auth'

export default {
  name: 'swiper-list',
  data() {
    return {
      seeinfrontGameType:''
    }
  },
  mounted() {
    this.seeinfrontGameType=getGameType()||'1'
    let gameId=this.seeinfrontGameType=='1'?1:2
      this.$store.dispatch('getBanner', gameId);
    setTimeout(() => {
      this.startSwiper();
    }, 1000)
  },
  computed: {
    ...mapGetters(['getBanner']),
  },
  methods: {
    startSwiper() {
      var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop: true,
        speed: 600,
        autoplay: 2000,
        autoplayDisableOnInteraction: false
      })
    }
  }
}
</script>

<style scoped>
.swiper-container {
  width: 750px;
  height: 180px;
  /*px*/
  position: fixed;
  top: 90px;
  /*px*/
  z-index: 100;
  overflow: hidden;
}

.swiper-wrapper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
}

img {
  width: 100%;
  height: 100%;
}

.swiper-pagination-bullet {
  width: 62px;
  height: 62px;
  /*px*/
  display: inline-block;
  background: #7c5e53;
}
</style>
