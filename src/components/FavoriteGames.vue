<template>
  <div class="mainFavorite_div">
    <div class="title_fav">
      <b>List of Favorite Games</b>
    </div>
    <div class="favorite_div" v-if="this.haveGames">
      <GamePreview
        v-for="g in this.games"
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
        :key="g.Match_Id"></GamePreview>
    </div>
    <div class="no_games_title" v-else>
      <br/>
      <br/>
      <b>You Have No Games in Your Favorite</b>
    </div>
  </div>
</template>

<script>
import GamePreview from "./GamePreview.vue";
export default {
  name: "FavoriteGames",
  components: {
    GamePreview
  }, 
  data() {
    return {
      games: [],
      haveGames: false
    };
  },
  props: {
      showOnly3: {
        type: Boolean,
        required: true
      },
  },
  methods: {
    async updateGames(){
      console.log("response");
      try {
        const response = await this.axios.get(
          "http://localhost:3000/users/favorite/matches",
        );
        console.log(response);
        if(response.status != 204){
          const data_games = response.data;
          console.log(response.data);
          this.games = [];
          if(this.showOnly3 && data_games.length > 3){
            let indx_array = [0,1,2];
            this.games = indx_array.map(i => data_games[i]);
          }
          else{
            this.games.push(...data_games);
          }
          console.log(response);
          console.log(this.games);
          this.haveGames = true;
        }
        else{
          this.haveGames = false;
        }
      } catch (error) {
        console.log("error in update games")
        this.haveGames = false;
        console.log(error);
      }
    },
  }, 
  mounted(){
    console.log("favorite games mounted");
    this.updateGames(); 
  },
};
</script>

<style>

.mainFavorite_div{
  display: block;
  width: auto;
  height: auto;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:rgb(44, 89, 116);
}
.title_fav{
  text-align: center;
   font-size: 40px;
   font-weight: bold;
   color:  rgb(245, 180, 3);
}
.no_games_title{
    text-align: center;
   font-size: 30px;
   font-weight: bold;
   color:  rgb(56, 233, 56);
}
.favorite_div{
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.GamePreview{
  margin-right: 20px;
}
</style>
