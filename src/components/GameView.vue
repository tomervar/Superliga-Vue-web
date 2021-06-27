<template>
  <div class="game-view">
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
      <div class="score_div" v-if="this.haveScore">
          <p>
              <b>{{hostTeam_goal}}   -   {{guestTeam_goal}}</b>
          </p>
      </div>
      <div class="no_score_div" v-else>
          <p> the score was not update yet </p>
      </div>
      <p class="event_title">Events:<p>
      <div class="EvetCalender_div" v-if="this.has_events">
                <EventPreview  
                v-for="e in this.events"
                :id="e.id"
                :date="e.event_date"
                :time="e.event_time"
                :minute="e.minute"
                :game_event="e.game_event"
                :key="e.id"></EventPreview>
        </div>
        <div class="no_events_div" v-else>
            <p> There isn't any event that record </p>
      </div>
    </div>
  </div>
</template>

<script>
import TeamPreview from "./TeamPreview.vue";
import EventPreview from "./EventPreview.vue"
export default {
  name: "GameView",
  components: {
    TeamPreview,
    EventPreview
  },
  data(){
      return{
        events:[],
        haveScore: false,
        has_events: false
      }
  },
  props:{
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
      hostTeam_goal:{
        value: [Number,null],
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
      guestTeam_goal:{
        value: [Number,null],
        required: true          
      },
      stadium: {
        type: String,
        required: true
      },
      referee: {
        type: String,
        required: true        
      },
      eventCalender: {
        type: Array,
        require: true
      }

  },
  created(){
      console.log("in created in teamView")
      this.updateGameView();
  },
  methods: {
      async updateGameView(){
          this.haveScore = false;
          this.has_events = false;
          this.events = [];
          if(this.hostTeam_goal != null && this.guestTeam_goal != null){
              this.haveScore = true;
          }
          if(this.eventCalender.length > 0){
              this.events = this.eventCalender;
              this.has_events = true;
          }
      }
  } 
}
</script>

<style>
.game-view {
  display: inline-block;
  width: auto;
  height: auto;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:cadetblue;
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
  justify-content: space-between;
}
.home_team{
  display: block;
  float: left;
}
.home_team_title{
  margin-right: 20px;
  text-align: center;
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
}
.score_div{
  text-align: center;
  width: 100%;
  font-size: 30px;
}
.no_score_div{
  text-align: center;
  width: 100%;
  font-size: 22px;
  font-weight: bold;
  color:  rgb(255, 17, 0);
}
.EvetCalender_div{
   display: flex;
   flex-direction: column-reverse;
}
.EventPreview{
   display: flex;
   width: 100%;
}
.no_events_div{
    text-align: center;
    margin-right: 20px; 
    width: 100%;
    font-size: 22px;
    font-weight: bold;
    color:  rgb(255, 17, 0);
}
.event_title{
    font-size: 24px;
    font-weight: bold;
    color:  rgb(80, 40, 117);
}
</style>