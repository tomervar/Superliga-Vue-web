<template>
    <div class="league-preview">
      <b-card
      img-alt="Image"
      tag="article"
      style="max-width: 600rem;"
      class="mb-2"
    >
      <b-card-title class="league_name_title">{{leagueName}}</b-card-title>
      <b-card-text class="b_card_text">
        Season: {{ season }}
        <br/>
        Stage: {{ stage }}
      </b-card-text>
      <p class="title_next_game">
        Next Game:
      </p> 
      <GamePreview
      v-for="g in this.nextGame"
      :id="g.Match_Id" 
      :date="g.Date" 
      :hour="g.Hour" 
      :hostTeam_id="g.HomeTeamPrev.Team_Id" 
      :hostTeam_name="g.HomeTeamPrev.Team_name" 
      :hostTeam_img="g.HomeTeamPrev.Team_img" 
      :guestTeam_id="g.AwayTeamPrev.Team_Id"
      :guestTeam_name="g.AwayTeamPrev.Team_name"
      :guestTeam_img="g.AwayTeamPrev.Team_img"
      :stadium="g.Stadium"
      :referee="g.Referee.Full_name"
      :key="g.Match_Id">
      </GamePreview>
    </b-card>
  </div>
</template>

<script>

import GamePreview from "./GamePreview.vue";
export default {
  name: "leagueInfo",
  components: {
    GamePreview
  }, 
 data() {
    return {
      leagueName: "", 
      season: "", 
      stage: "",
      nextGame: []
    };
  },
  methods: {
    async updateInfo(){
      try {
        const leagueInfoDetails = await this.axios.get(
          "http://localhost:3000/league/getDetails",
          {
          }
        );
        console.log(leagueInfoDetails);
        this.leagueName = leagueInfoDetails.data.league_name;
        this.season = leagueInfoDetails.data.current_season_name;
        if(leagueInfoDetails.data.current_stage_name != null){
          this.stage = leagueInfoDetails.data.current_stage_name;
        }
        if(leagueInfoDetails.data.nextGameDeatails != null){
          console.log(leagueInfoDetails.data.nextGameDeatails);
          this.nextGame = [];
          this.nextGame.push(leagueInfoDetails.data.nextGameDeatails);
        }
        console.log(this.nextGame)
        
      } catch (err) {
        console.log(err);
      }
    }
  },
  created() {
    console.log("got to create of leagueInfo");
    this.updateInfo();
  }
}
</script>

<style>
.league-preview {
  display: inline-block;
  width: auto;
  height: auto;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:rgb(44, 89, 116);
}
.league_name_title{
   text-align: center;
   font-size: 40px;
   font-weight: bold;
   color:  rgb(245, 180, 3);
}

.b_card_text{
  font-size: 20px;
  font-weight: bold;
  color:  rgb(80, 40, 117);
}
.title_next_game{
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color:  rgb(80, 40, 117);
}

.league-preview .league-content {
  width: 100%;
  overflow: hidden;
}

</style>