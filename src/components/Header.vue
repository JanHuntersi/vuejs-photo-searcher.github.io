<template>
  <div class="header-container">
    <h1>VUEJS IMAGE SEARCHER</h1>
    <div class="menu">
      <router-link class="menu-component" to="/">Domov</router-link>
      <router-link class="menu-component" to="/about"
        >Priljubljene Slike</router-link
      >
      <router-link class="menu-component" to="/unsplash"
        >O Tej Strani</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "header",
};
</script>

<style scoped>
h1 {
  padding: 15px;
  color: white;
}
@import url("https://fonts.googleapis.com/css2?family=Lexend+Mega&display=swap");
.header-container {
  font-family: "Lexend Mega", sans-serif;
  font-size: 20px;
  text-align: center;
  min-height: 85px;
  width: 100%;
  background-color: rgb(0, 0, 0);
  text-decoration: none;
}
.menu {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: rgb(114, 126, 126);
}
.menu > * {
  padding: 0 10px;
}
.menu-component {
  text-decoration: none;
  color: white;
}
.menu > *:hover {
  text-decoration: underline;
}
</style>