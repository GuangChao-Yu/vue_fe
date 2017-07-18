<template>
  <div class="consultaiton-item">
    <div class="consultaiton-time">{{data.game_date}}</div>
    <ul class="consultaiton-game-ul" v-for="(item,index) in data.games" :key="index">
      <li class="consultaiton-game-list">
        <span class="team-a-img">
          <img :src="item.left_team.team_img_url">
        </span>
        <span class="team-name">{{item.left_team.team_name}}</span>
        <span class="vs-icon">
          <img src="../../assets/consultation/vs@2x.png">
        </span>
        <span class="vs-bottom-line"></span>
        <span class="vs-time">{{item.game_time}}</span>
        <span class="team-b-img">
          <img :src="item.right_team.team_img_url">
        </span>
        <span class="team-name-b">{{item.right_team.team_name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'consu-item',
  props: {
    data: {
      data: Object,
      default: {}
    }
  },
  mounted(){
  },
  computed: {
    getDate() {
      let dateTime = new Date();
      let year = dateTime.getFullYear();
      let month = dateTime.getMonth() + 1;
      let day = dateTime.getDate();
      return year + '/' + month + '/' + day;
    }
  }
}
</script>

<style>
.consultaiton-time {
  width: 750px;
  height: auto;
  font-size: 36px;
  /*px*/
  color: #46c9d5;
  text-align: center;
  margin-bottom: 20px;
  /*px*/
}

.consultaiton-game-ul {
  width: 750px;
  height: auto;
}

.consultaiton-game-list {
  width: 750px;
  height: 180px;
  position: relative;
}

.team-a-img {
  display: block;
  width: 106px;
  height: 106px;
  /*px*/
  position: absolute;
  left: 68px;
  top: 20px;
  /*px*/
  overflow: hidden;
}

.team-b-img {
  display: block;
  width: 106px;
  height: 106px;
  /*px*/
  position: absolute;
  right: 68px;
  top: 20px;
  /*px*/
  overflow: hidden;
}

.team-a-img img,
.team-b-img img {
  width: 100%;
  height: 100%;
}

.team-name {
  display: block;
  width: 106px;
  height: auto;
  font-size: 24px;
  /*px*/
  color: #a7b7c0;
  text-align: center;
  position: absolute;
  top: 136px;
  /*px*/
  left: 68px;
}

.team-name-b {
  display: block;
  width: 106px;
  height: auto;
  font-size: 24px;
  /*px*/
  color: #a7b7c0;
  text-align: center;
  position: absolute;
  top: 136px;
  /*px*/
  right: 68px;
}

.vs-icon {
  width: 260px;
  height: 50px;
  /*px*/
  position: absolute;
  top: 30px;
  /*px*/
  left: 50%;
  margin-left: -130px;
}

.vs-icon img {
  width: 100%;
  height: 100%;
}

.vs-bottom-line {
  display: block;
  width: 260px;
  height: 2px;
  /*px*/
  background: #464a4d;
  position: absolute;
  top: 90px;
  /*px*/
  left: 50%;
  margin-left: -130px;
}

.vs-time {
  font-size: 36px;
  color: #a7b7c0;
  display: block;
  width: 260px;
  text-align: center;
  position: absolute;
  left: 50%;
  margin-left: -130px;
  top: 110px;
  /*px*/
}
</style>
