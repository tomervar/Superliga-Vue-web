<template>
  <div class="game-preview">
    <div :title="id" class="game-title">
      <b>Game ID:</b> {{ id }}
    </div>
    <div class="game-content">
      <div class="game_text">
        <div> Date: {{ date }}</div>
        <div> Time: {{ hour }}</div>
        <div> Stadium: {{ stadium }}</div>
        <div> Referee: {{ referee }}</div>
      </div>
      <div class="teams_div">
        <div class="home_team">
          <div class="home_team_title">
            <b>Host Team:</b>   
          </div>
          <TeamPreview
            :id="hostTeam_id"
            :name="hostTeam_name"
            :img="hostTeam_img"
          ></TeamPreview>
        </div>
        <div class="vs_div">
            <b class="vs_text">    VS    </b>
        </div>
        <div class="away_team">
          <div class="away_team_title">
            <b>Guest Team:</b>   
          </div>
            <TeamPreview
            :id="guestTeam_id"
            :name="guestTeam_name"
            :img="guestTeam_img"
            ></TeamPreview>
        </div>
      </div>
      <div class="button_div" v-if="this.$root.store.username && !this.inFavorite">
        <b-button v-on:click="addMatchToFavorite" href="#" variant="primary">Add Match to Favorite</b-button>
      </div>

    </div>
  </div>
</template>

<script>
import TeamPreview from "./TeamPreview.vue";
export default {
  name: "GamePreview",
  components: {
    TeamPreview
  },
  data() {
    return {
      inFavorite: false
    }
  },
  props: {
      id: {
        type: Number,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      hour: {
        type: String,
        required: true
      },
      hostTeam_id: {
        type: Number,
        required: true
      },
      hostTeam_name: {
        type: String,
        required: true
      },
      hostTeam_img: {
        type: String,
        required: true
      },
      guestTeam_id: {
        type: Number,
        required: true
      },
      guestTeam_name: {
        type: String,
        required: true
      },
      guestTeam_img: {
        type: String,
        required: true
      },
      stadium: {
        type: String,
        required: true
      },
      referee: {
        type: String,
        required: true        
      }

  }, 
  mounted(){
    console.log("game preview mounted")
    if(this.$root.store.username){
      this.checkIfGameIsInFavorite();
    }
  },
  methods: {
    async addMatchToFavorite(){
      console.log("in add match to favorite");
      try{
        const response = await this.axios.post(
          "http://localhost:3000/users/favorite/matches",
          {
            match_id: this.id
          }
        );
        console.log(response);
        this.inFavorite = true;
      }catch(error){
        console.log("error in update games")
        console.log(error);
      }
    },
    async checkIfGameIsInFavorite(){
      console.log("in check if match in favorite");
      try{
        const response = await this.axios.get(
          `http://localhost:3000/users/favorite/matcheInFav/${this.id}`,

        );
        this.inFavorite = response.data.ans;
      }catch(error){
        console.log("error in update games")
        console.log(error);
      }
    }
  }
  
};
</script>

<style>
.game-preview {
  display: inline-block;
  width: auto;
  height: auto;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:cadetblue;
  background-color: white;
}
.game-title{
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color:  rgb(32, 216, 25);
}
.game_text{
  text-align: center;
  font-weight: bold;
  color:  rgb(221, 29, 29);
}

.game-content {
  display: block;
}

.teams_div{
  display: inline-block;
  margin: auto;
}
.home_team{
  display: block;
  float: left;
}
.home_team_title{
  margin-right: 20px;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.vs_div{
  display: flex;
  float: left; 
  margin: auto;
  font-size: 30px;
  vertical-align: middle;
  line-height: 700%;
  text-align: center;

}
.vs_text{
  display: flex;
  float: left; 

}
.away_team{
  display: block;
  float: left;
}
.away_team_title{
  margin-right: 20px;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.button_div{
  display: flex;
  justify-content: center;
  align-items: center;
}


/* .game-preview .game-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.game-preview .game-content {
  width: 100%;
  overflow: hidden;
} */



</style>
