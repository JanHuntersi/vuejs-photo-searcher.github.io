<template>
  <div id="app">
    <Header />

    <div id="nav"></div>
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "app",
  components: {
    Header,
  },
};
</script>

<style>
* {
  margin: 0;
}
@import url("https://fonts.googleapis.com/css2?family=Lexend+Mega&display=swap");
.router-link {
  font-family: "Lexend Mega", sans-serif;
  font-weight: 100;
  font-size: 14px;
  color: black;
}
h1 {
  font-family: "Lexend Mega", sans-serif;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
