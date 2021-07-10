<template>
  <div>
      <h1><b> Team Page</b></h1>
      <br/>
        <TeamPreview
            :id="this.id"
            :name="this.name"
            :img="this.img"
        ></TeamPreview>
        <br/>
        <h2><b style="color:red"> Players </b></h2>
        <div class="TABLE_div">
        <b-table striped hover :items="this.teamPlayers" :fields="PlayersFields">
            <template v-slot:cell(Image)="{ item }">
                <img :src="item.Image" height="50px" width="50px">
            </template>
        </b-table>
        </div>
        <br/>
        <h2><b style="color:red"> Past Matches </b></h2>
        <div class="TABLE_div">
        <b-table striped hover :items="Matches.pastMatches" :fields="PastMatchFields">
        </b-table>
        </div>
        <br/>
        <h2><b style="color:red"> Future Matches </b></h2>
        <div class="TABLE_div">
        <b-table striped hover :items="Matches.futureMatches" :fields="FutureMatchFields">
        </b-table>
        </div>
  </div>
</template>

<script>
import TeamPreview from "../components/TeamPreview.vue"
export default {
    name: "TeamPage",
    components: {
    TeamPreview
    },
    data() {
        return{
            id: parseInt(this.$route.params.id),
            name:"",
            img:"",
            teamPlayers:[],
            Matches: {
                pastMatches:[],
                futureMatches:[],
            },
            PlayersFields: [
                { key: 'FullName', sortable: true },
                { key: 'Image', sortable: false },
                { key: 'TeamName', sortable: true },
                { key: 'Position', sortable: true },
            ],
            PastMatchFields: [
                { key: 'ID', sortable: true },
                { key: 'Date', sortable: true },
                { key: 'Hour', sortable: true },
                { key: 'Stadium', sortable: true },
                { key: 'HostTeam', sortable: true },
                { key: 'GuestTeam', sortable: true },
                { key: 'Score', sortable: true },
                { key: 'Referee', sortable: true },
            ],
            FutureMatchFields: [
                { key: 'ID', sortable: true },
                { key: 'Date', sortable: true },
                { key: 'Hour', sortable: true },
                { key: 'Stadium', sortable: true },
                { key: 'HostTeam', sortable: true },
                { key: 'GuestTeam', sortable: true },
                { key: 'Referee', sortable: true },
            ],

        }
    },
    created(){
        this.onCreated();
    },
    methods: {
        async onCreated(){
            try {
                const response = await this.axios.get(
                "http://localhost:3000/teams/teamFullDetails/" + this.id.toString(),
                );
                console.log(response);
                this.name = response.data.TeamPrev.Team_name;
                this.img = response.data.TeamPrev.Team_img;
                for(const player of response.data.Team_players){
                    this.teamPlayers.push({
                        FullName: player.name,
                        Image: player.image,
                        TeamName: player.team_name,
                        Position: player.position,

                    });
                }
                for(const pastMatch of response.data.Team_matches.past_matches){
                    let score_string;
                    if(pastMatch.HomeTeamGoals == null || pastMatch.AwayTeamGoals == null){
                        score_string = " - "
                    }else{
                        score_string = pastMatch.HomeTeamGoals.toString() + " - " + pastMatch.AwayTeamGoals.toString();
                    }
                    this.Matches.pastMatches.push({
                        ID: pastMatch.MatchDetails.Match_Id,
                        Date: pastMatch.MatchDetails.Date,
                        Hour: pastMatch.MatchDetails.Hour,
                        Stadium: pastMatch.MatchDetails.Stadium,
                        HostTeam: pastMatch.MatchDetails.HomeTeamPrev.Team_name,
                        GuestTeam: pastMatch.MatchDetails.AwayTeamPrev.Team_name,
                        Score: score_string,
                        Referee: pastMatch.MatchDetails.Referee.Full_name,

                    });
                }
                for(const FutureMatch of response.data.Team_matches.next_matches){
                    this.Matches.futureMatches.push({
                        ID: FutureMatch.Match_Id,
                        Date: FutureMatch.Date,
                        Hour: FutureMatch.Hour,
                        Stadium: FutureMatch.Stadium,
                        HostTeam: FutureMatch.HomeTeamPrev.Team_name,
                        GuestTeam: FutureMatch.AwayTeamPrev.Team_name,
                        Referee: FutureMatch.Referee.Full_name,

                    });
                }

            } catch (err) {
                console.log(err.response);
                this.form.submitError = err.response.data;
            }           
        }
    }
}

</script>

<style>
.TABLE_div{
    background-color: white;
}
</style>