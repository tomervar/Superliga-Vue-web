<template>
  <div class="content_div">
    <p class="stageMatches_title">  Stage Matches </p>
    <div class="stageMarches_div">
        <div class="pastGames_div">
            <div class="title"><b> Past Games </b></div>
            <GameView class="singal_past_game_div"
            v-for="g in this.pastGames"
            :id="g.MatchDetails.Match_Id" 
            :date="g.MatchDetails.Date" 
            :hour="g.MatchDetails.Hour" 
            :hostTeam_id="g.MatchDetails.HomeTeamPrev.Team_Id" 
            :hostTeam_name="g.MatchDetails.HomeTeamPrev.Team_name" 
            :hostTeam_img="g.MatchDetails.HomeTeamPrev.Team_img" 
            :hostTeam_goal="g.HomeTeamGoals"
            :guestTeam_id="g.MatchDetails.AwayTeamPrev.Team_Id"
            :guestTeam_name="g.MatchDetails.AwayTeamPrev.Team_name"
            :guestTeam_img="g.MatchDetails.AwayTeamPrev.Team_img"
            :guestTeam_goal="g.AwayTeamGoals"
            :stadium="g.MatchDetails.Stadium"
            :referee="g.MatchDetails.Referee.Full_name"
            :eventCalender="g.EventCalender"
            :key="g.MatchDetails.Match_Id">
            ></GameView>
        </div>
        <div class="futureGames_div">
            <div class="title"><b class="title"> Future Games</b></div>
            <GamePreview
            v-for="g in this.futureGames"
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
        </div>
    </div>
  </div>
</template>

<script>
import GamePreview from "../components/GamePreview"
import GameView from "../components/GameView"
export default {
    name: "StageMatches",
    components: {
        GamePreview,
        GameView
    },
    data() {
        return{
            pastGames:[],
            futureGames:[]
        }
    },
    methods:{
        async updateGames(){
            console.log("in update game in stage matches")
            try {
                const response = await this.axios.get(
                "http://localhost:3000/league/getStageMatches",
                );
                this.pastGames=[];
                this.futureGames=[];
                const data_games = response.data;
                console.log(data_games);
                console.log(data_games.PreMatches);
                console.log(data_games.FutureMatches);
                this.pastGames.push(...data_games.PreMatches);
                this.futureGames.push(...data_games.FutureMatches);
            } catch (error) {
                console.log("error in update games")
                console.log(error);
      }
        }
    },
    created(){
        this.updateGames();
    }
    
}
</script>

<style>
.content_div{
    background-image: url("../assets/img/background4.jpeg");
    background-position: center;
    background-size:auto;
}
.stageMatches_title{
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  color:  rgb(245, 180, 3);
}
.stageMarches_div{
  display: inline-block;
  width: auto;
  height: auto;
  position: relative;
  margin: 10px 10px;
  /* border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:cadetblue; */
}
.pastGames_div{
    width: 50%;
    float: left;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.singal_past_game_div{
    margin-right: 20px;
}
.futureGames_div{
    width: 50%;
    float: left;
    justify-content: center;
    align-items: center;
    text-align: center;
    
}
.title{
    font-size: 40px;
    text-align: center;
    width: 100%;
    font-weight: bold;
    color:  rgb(245, 180, 3);
    margin-right: 20px;
}

</style>