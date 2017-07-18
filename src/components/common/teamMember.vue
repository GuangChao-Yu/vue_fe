<template>
  <div class="battle-box">
    <div class="battle-body-list-footer">
      <div class="battle-body-list-footer-img1">
        <img :src="todos.team.teams_img_url">
      </div>
      <div class="battle-body-list-footer-img2">
        <img :src="todos.players[0].players_header_url">
      </div>
      <div class="battle-body-list-footer-img3">
        <img :src="todos.players[1].players_header_url">
      </div>
      <div class="battle-body-list-footer-img4">
        <img :src="todos.players[2].players_header_url">
      </div>
      <div class="battle-body-list-footer-img5">
        <img :src="todos.players[3].players_header_url">
      </div>
      <div class="battle-body-list-footer-img6">
        <img :src="todos.players[4].players_header_url">
      </div>
      <div class="battle-body-list-footer-img7">
        <img :src="todos.players[5].players_header_url">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'team-member',
  props: {
    todos: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  data() {
    return {

    }
  },

}
</script>
<style src="../../css/commponent/teamMember.css">

</style>
