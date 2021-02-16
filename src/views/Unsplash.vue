<template>
  <div class="nazaj">
    <router-link class="router-link" to="/"
      ><h1>Pojdite Na Glavno Stran</h1></router-link
    >
    <div class="vsebina">
      <h1>VueJS Image Searcher za iskanje slik Uporablja Unisplash APi</h1>
      <br />
      <p>
        Unisplash je spletna stran namenjena k deljenju in objavljanju \"stock
        photography\" "
      </p>
      <p>
        Spletna stran ima okoli 207,000 rednih uporabnikov z bazo velikosti
        okoli 2 milijona slik
      </p>
      <p>Unisplash licence omogoča prosto uporabo in širjenje teh fotografij</p>
      <br />
      <p>
        Unisplash razvijalcem omogoča uporabo njihovega api, nad katerem je bila
        zgrajena ta stran.
      </p>
      <p>
        Število poizvedb je omejeno na 30 naenkrat,zato nemorete naložiti več
        kot 30 slik
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Unsplash",
};
</script>

<style scoped>
h1 {
  font-size: 24px;
}
.vsebina {
  margin-top: 30px;
  font-size: 25px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
.nazaj {
  width: 70%;
  margin-left: 15%;
  margin-top: 5%;
}
h1 {
  text-align: center;
  text-decoration: none;
}
</style>