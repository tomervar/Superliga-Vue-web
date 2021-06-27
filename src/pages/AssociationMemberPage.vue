<template>
  <div>
    <h1><b> Association Member Page</b></h1>
    <b-button block pill variant="warning" to="AssociationMemberAddMatch"> <b>Add New Match</b> </b-button>
    <br/>
        <b-table striped hover :items="items" :fields="fields">
            <template v-slot:cell(UpdateScore)="{ item }">
                <b-button pill variant="primary" @click="updateScore(item)" v-if="item.PastGame">
                    Update Score
                </b-button>
            </template>
            <template v-slot:cell(AddEvent)="{ item }">
                <b-button pill variant="success" @click="addEvent(item)" v-if="item.PastGame">
                    Add Event
                </b-button>
            </template>
        </b-table>
  </div>
</template>

<script>
  export default {
    name: "AssociationMember",
    data() {
      return {
        fields: [
          { key: 'ID', sortable: true },
          { key: 'Date', sortable: true },
          { key: 'Hour', sortable: true },
          { key: 'Stadium', sortable: false },
          { key: 'Host_Team', sortable: true },
          { key: 'Guest_Team', sortable: true },
          { key: 'Score', sortable: false },
          { key: 'Referee', sortable: false },
          { key: 'UpdateScore', label: 'Update Score'},
          { key: 'AddEvent', label: 'Add Event'}
        ],
        items: []
      }
    },
    methods: {
        async updateScore(row) {
            console.log("in update score");
            console.log(row);
            this.$router.push({name: 'AssociationMemberUpdateScore', params: { id: row.ID}});
        },
        async addEvent(row){
            console.log("in add event");
            console.log(row);
            this.$router.push({name: 'AssociationMemberAddEvent', params: { id: row.ID, date: row.Date, hour: row.Hour}});
        },
        async updateGames(){
            try{
                const response = await this.axios.get(
                "http://localhost:3000/league/getStageMatches",
                );
                console.log(response);
                for(const pastGame of response.data.PreMatches){
                    let score_string;
                    if(pastGame.HomeTeamGoals == null || pastGame.AwayTeamGoals == null){
                        score_string = " - "
                    }else{
                        score_string = pastGame.HomeTeamGoals.toString() + " - " + pastGame.AwayTeamGoals.toString();
                    }
                    this.items.push({
                        ID: pastGame.MatchDetails.Match_Id,
                        Date: pastGame.MatchDetails.Date,
                        Hour: pastGame.MatchDetails.Hour,
                        Stadium: pastGame.MatchDetails.Stadium,
                        Host_Team: pastGame.MatchDetails.HomeTeamPrev.Team_name,
                        Guest_Team: pastGame.MatchDetails.AwayTeamPrev.Team_name,
                        Score: score_string,
                        Referee: pastGame.MatchDetails.Referee.Full_name,
                        PastGame: true
                    });
                }
                for(const futureGame of response.data.FutureMatches){
                    this.items.push({
                        ID: pastGame.Match_Id,
                        Date: pastGame.Date,
                        Hour: pastGame.Hour,
                        Stadium: pastGame.Stadium,
                        Host_Team: pastGame.HomeTeamPrev.Team_name,
                        Guest_Team: pastGame.AwayTeamPrev.Team_name,
                        Score: " - ",
                        Referee: pastGame.MatchDetails.Referee.Full_name,
                        PastGame: false
                    });
                }    

            } catch(error){
                console.log("error in update games")
                console.log(error);
            }
            
        }
  },
  created (){
      console.log("in created association member page")
      this.updateGames();
  }

}

</script>

<style>

</style>