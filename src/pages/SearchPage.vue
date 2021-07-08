<template>
  <div>
    <h1 class="title">Search Page</h1>
    <label class="form-check-label" for="checkbox_div">
    Please Choose a Search Topic
    </label>
    <div class="checkbox_div">
      <b-form-checkbox v-model="checked" button button-variant="danger" v-if="checked">
        <b> {{ getQueryButtonText }}</b>
      </b-form-checkbox>
      <b-form-checkbox v-model="checked" button button-variant="primary" v-else>
        <b> {{ getQueryButtonText }}</b>
      </b-form-checkbox>
      <br/>
      <br/>
    </div>
    <b-input-group prepend="Search Query:" id="search-input">
      <b-form-input v-model="searchQuery"></b-form-input>
      <b-input-group-append>
        <b-button @click="searchHandle" variant="success">Search</b-button>
      </b-input-group-append>
      <b-input-group-append>
        <b-button @click="pastSearchs" variant="primary" v-if="$root.store.username">Go to Past Searches</b-button>
      </b-input-group-append>
    </b-input-group>
      <br/>
      Your search Query: {{ searchQuery }}
  <div class="res_div">
    <br/>
    <b-table striped hover :items="TeamsItems" :fields="TeamsSearchResFields" v-if="this.checked">
      <template v-slot:cell(TeamLogo)="{ item }">
        <img :src="item.TeamLogo" height="50px" width="50px" @click="img_click_handle(item)">
      </template>
    </b-table>
    <b-table striped hover :items="PlayersItems" :fields="PlayersSearchResFields" v-else>
      <template v-slot:cell(Image)="{ item }">
        <img :src="item.Image" height="50px" width="50px">
      </template>
    </b-table>
  </div>
  </div>
</template>

<script>
export default {
 name: "SearchPage",
 data() {
    return {
      searchQuery:"",
      checked: true,
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
        PlayersItems: []
    };
  },
  computed: {
    getQueryButtonText(){
      if(this.checked){
        return "Search For Teams"
      }
      return "Search For Players"
    }
  },
  methods:{
    searchHandle(){
      console.log("in searchHandle");
      let searchTeamBool = this.checked;
      if(searchTeamBool){
        this.searchTeams();
      }
      else{
        this.searchPlayers();
      }
    },
    
    async searchTeams(){
      try{
        this.TeamsItems = [];
        console.log(this.searchQuery)
        const response = await this.axios.get(
        "http://localhost:3000/search/team/"+this.searchQuery,
        );
        console.log(response);
        if(response.status == 204){
          
        }
        else{
          for(const Team of response.data){
            this.TeamsItems.push({
              ID: Team.Team_Id,
              TeamName: Team.Team_name,
              TeamLogo: Team.Team_img
            });
          }
          if(this.$root.store.username){
            this.$root.store.userPastSearches.push({
              team: true,
              query: this.searchQuery,
              results: this.TeamsItems
            });
          }    
        }
      } catch(error){
          console.log("error in searchTeams")
          console.log(error);
      }
    },


    async searchPlayers(){
      try{
        this.PlayersItems = [];
        console.log(this.searchQuery)
        const response = await this.axios.get(
        "http://localhost:3000/search/player/"+ this.searchQuery,
        );
        console.log(response);
        if(response.status == 204){
          
        }
        else{
          for(const Player of response.data){
            this.PlayersItems.push({
              FullName: Player.name,
              TeamName: Player.team_name,
              PositionNumber : Player.PositionNumber,
              PositionName : Player.PositionName,
              Image: Player.image_url,

            });
          }
          if(this.$root.store.username){
            this.$root.store.userPastSearches.push({
              team: false,
              query: this.searchQuery,
              results: this.PlayersItems
            });
          } 
              
        }
      } catch(error){
          console.log("error in searchPlayers")
          console.log(error);
      }
    },
    pastSearchs(){
      console.log("in pastSearchs");
      this.$router.push({name: 'PastSearches'});
    },
    img_click_handle(item){
      console.log(item);
      this.$router.push("/TeamPage/"+item.ID);
    }
  }
}
</script>

<style scoped>

#search-input {
  margin-left: 20px; 
  width: 500px; 
}
</style>