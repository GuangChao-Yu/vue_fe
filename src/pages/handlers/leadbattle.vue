<template>
  <div>
    <div class="leadbattle">
      <div class="weChat-title">
        <span class="weChat-title-icon" @click="goback">
          <img src="../../assets/lineUp/back@2x.png" />
        </span>
        导入阵容
      </div>
    </div>
    <ul class="leadbattle-body">
      <div class="leadbattle-body-no" v-if="data.length==0">
        <span>{{dataLength}}</span>
      </div>
      <li class="leadbattle-body-border" v-for="(item,index) in data" v-else>
        <battle-list class="leadbattle-list" :todos="item" :index="index" v-on:leadIndex="leadIndex" v-on:leadIndexTow="leadIndexTow"></battle-list>
      </li>
    </ul>
  </div>
</template>

<script>
import Battle from '../../components/common/battle'
import * as api from '../../server/api.js'
import { getAuth } from '@/handle/auth'
import { mapGetters } from 'vuex'

export default {
  name: 'leadbattle',
  data() {
    return {
      data: [],
      dataLength: "加载中请稍后...",
    }
  },
  components: {
    [Battle.name]: Battle
  },
  computed: {
    ...mapGetters(['getTop', 'getMid', 'getJug', 'getAdc', 'getSup', 'getBench', 'getTeam']),
  },
  created() {
    let vm = this
    let auth = getAuth();
    let contestId = this.$route.params.contestId;
    api.importTeams({
      token: auth.token,
      uid: auth.uid,
      contest_id: contestId,
    }).then((resp) => {
      this.data = resp.data.result.team_list
      if (this.data.length == 0) {
        vm.dataLength = '暂无可导入阵容'
      }
    })

  },
  methods: {
    goback() {
      this.$router.push({
        name: 'mapplayer',
        params: { contestId: this.$route.params.contestId }
      })
    },
    leadIndex(index) {
      let selectData = this.data[index];
      this.$store.dispatch('setTop', selectData.players[0]);
      this.$store.dispatch('setJug', selectData.players[1]);
      this.$store.dispatch('setMid', selectData.players[2]);
      this.$store.dispatch('setAdc', selectData.players[3]);
      this.$store.dispatch('setSup', selectData.players[4]);
      this.$store.dispatch('setBench', selectData.players[5]);
      this.$store.dispatch('setTeam', selectData.team);
      this.$router.push({ name: 'mapplayer', params: { contestId: this.$route.params.contestId, selectData: selectData } })
    },
    leadIndexTow(index){
      let selectData = this.data[index];
      this.$store.dispatch('setTop', selectData.players[0]);
      this.$store.dispatch('setJug', selectData.players[1]);
      this.$store.dispatch('setMid', selectData.players[2]);
      this.$store.dispatch('setAdc', selectData.players[3]);
      this.$store.dispatch('setSup', selectData.players[4]);
      this.$store.dispatch('setBench', selectData.players[5]);
      this.$store.dispatch('setTeam', selectData.team);
      this.$router.push({ name: 'leadDetails', params: { contestId: this.$route.params.contestId, selectData: selectData } })
    }
  }

}
</script>

<style src="../../css/pages/handlers/leadbattle.css">

</style>
