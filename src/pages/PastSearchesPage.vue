<template>
  <div>
      <h1><b> Past Searches Page</b></h1>
      <br/>
        <h3><b> All Team Searches</b></h3>
          <br/>
        <div class="teamsearch_div" v-for="teamSearch in this.TeamsItems" :key="teamSearch.teamSearch_id">
            <h4 style="color: blue">Your search Query: <b style="color: red">{{ teamSearch.query }}</b></h4>
            <b-table striped hover :items="teamSearch.results" :fields="TeamsSearchResFields">
                <template v-slot:cell(TeamLogo)="{ item }">
                    <img :src="item.TeamLogo" height="50px" width="50px" @click="img_click_handle(item)">
                </template>
            </b-table>
            <br/>
      </div>
      <h3><b> All Players Searches</b></h3>
      <br/>
        <div class="playersearch_div" v-for="playerSearch in this.PlayersItems" :key="playerSearch.playerSearch_id">
            <h4 style="color: blue">Your search Query: <b style="color: red">{{ playerSearch.query }}</b></h4>
            <b-table striped hover :items="playerSearch.results" :fields="PlayersSearchResFields">
                <template v-slot:cell(Image)="{ item }">
                    <img :src="item.Image" height="50px" width="50px">
                </template>
            </b-table>
            <br/>
      </div>
  </div>
</template>

<script>
export default {
    name: "PastSearches",
    data() {
        return {
            TeamsSearchResFields: [
                { key: 'ID', sortable: true },
                { key: 'TeamName', sortable: true },
                { key: 'TeamLogo', sortable: false },
            ],
            TeamsItems: [],
            PlayersSearchResFields: [
                { key: 'FullName', sortable: true },
                { key: 'Image', sortable: false },
                { key: 'TeamName', sortable: true },
                { key: 'PositionNumber', sortable: true },
                { key: 'PositionName', sortable: true },
            ],
            PlayersItems: [],
            count: 0,
    };
  },
  methods:{
    img_click_handle(item){
        console.log(item);
        this.$router.push("/TeamPage/"+item.ID);
    }
  },
  created (){
    console.log("in created past searches page");
    for(const search of this.$root.store.userPastSearches){
        if(search.team == true){
            this.TeamsItems.push({
                teamSearch_id: this.count++,
                query: search.query,
                results: search.results
            });
        }
        else{
            this.PlayersItems.push({
                playerSearch_id: this.count++,
                query: search.query,
                results: search.results
            });
        }
    }
    console.log(this.TeamsItems);
    console.log(this.PlayersItems);
  }
}
</script>

<style>
.teamsearch_div{
    background-color: white;
}
.playersearch_div{
    background-color: white;
}
</style>