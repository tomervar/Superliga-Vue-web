<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand :to="{ name: 'main' }"><b-icon icon="house-door-fill"></b-icon>Superliga Vue</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>

        <b-nav-item :to="{ name: 'search' }">Search <b-icon icon="search"></b-icon></b-nav-item>
        <b-nav-item :to="{ name: 'StageMatches' }">Stage Matches  <b-icon icon="trophy"></b-icon></b-nav-item>
        <b-nav-item :to="{ name: 'AssociationMember' }" v-if="$root.store.isAssociationMember">Association Member <b-icon icon="bar-chart-fill"></b-icon></b-nav-item>
        <b-nav-item :to="{ name: 'About' }">About  <b-icon icon="info-circle"></b-icon></b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-if="!$root.store.username">
          <b-navbar-brand>Hello Guest <b-icon icon="person-circle"></b-icon></b-navbar-brand>
          <b-nav-item :to="{ name: 'login' }">Login <b-icon icon="person-check"></b-icon></b-nav-item>
          <b-nav-item :to="{ name: 'register' }">Register <b-icon icon="person-plus"></b-icon></b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
        <b-nav-item-dropdown right>
          <template #button-content>
            <b-icon icon="person-circle"></b-icon>
            {{ getUserName }}
          </template>
          <b-dropdown-item :to="{ name: 'FavoritesMatches', params: getUserName}">My Matches <b-icon icon="controller"></b-icon></b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item href="#" v-on:click="Logout">Log Out <b-icon icon="person-dash"></b-icon></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  },
  computed: {
    getUserName(){
      return this.$root.store.username
    },
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
