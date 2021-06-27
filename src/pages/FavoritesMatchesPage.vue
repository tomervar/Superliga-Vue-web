<template>
  <div>
    <FavoriteGames :showOnly3=false ></FavoriteGames>
  </div>
</template>

<script>
import FavoriteGames from "../components/FavoriteGames";
export default {
  name: "FavoritesMatchesPage",
  components: {
    FavoriteGames
  },
};
</script>

<style>

</style>