<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <div class="main_content">
      <div class="float-child">
        <LeagueInfo :key="this.$root.store.username"></LeagueInfo>
      </div>
      <div class="float-child">
        <LoginPage v-if="!$root.store.username"></LoginPage>
        <FavoriteGames v-else :showOnly3=true></FavoriteGames>
      </div>
    </div>
  </div>
</template>

<script>
import LeagueInfo from "../components/LeagueInfo";
import FavoriteGames from "../components/FavoriteGames";
import LoginPage from "../pages/LoginPage";
export default {
  components: {
    LeagueInfo, 
    LoginPage, 
    FavoriteGames
  },
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
.title{
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  color:  rgb(0, 113, 117);
}
.float-child{
  width: 50%;
  float: left;
  padding: 20px;
}
</style>
