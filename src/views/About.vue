<template>
  <div class="nazaj">
    <router-link class="router-link" to="/"
      ><h1>Pojdite Na Glavno Stran</h1></router-link
    >
    <br />
    <h1 v-if="!likedSlike.length">Nimate shranjenih slik</h1>
    <div v-else>
      <h1>Vaše slike</h1>
      <br />
      <div class="container">
        <div class="containerImg" v-for="slika in likedSlike" :key="slika.id">
          <img :src="slika.urls.small" :alt="slika.title" />
          <div class="btn">
            <button title="Shrani sliko" class="downloadButton">
              <a
                :href="slika.links.download"
                target="_blank"
                class="fas fa-arrow-down"
              ></a>
            </button>
            <button
              title="Odstrani iz priljubljenih slik"
              v-on:click="zbrisi(slika)"
              class="likeButton"
            >
              <a class="fas fa-times" :id="slika.id"></a>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "about",
  data() {
    return {
      likedSlike: [],
      t: true,
    };
  },
  mounted() {  //zažene ob render strani
    console.log("Inside unsplash!");
    if (localStorage.likedSlike) {
      this.likedSlike = JSON.parse(localStorage.likedSlike);
      console.log(this.likedSlike);
    }
  },
  methods: {
    zbrisi(to) { //Odstranitev slike
      this.likedSlike = this.likedSlike.filter((slika) => slika.id !== to.id);
    },
  },
  watch: {
    //tracks for changes
    likedSlike: {
      handler() {
        localStorage.likedSlike = JSON.stringify(this.likedSlike);
      },
      deep: true, //deep tracking vsepovsod
    },
  },
};
</script>

<style scoped>
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
  margin-top: 10px;
}
h1 {
  text-align: center;
  text-decoration: none;
}

.container {
  box-sizing: border-box;
  width: 95%;
  margin-left: 2.5%;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: 300px;
}
.container .containerImg {
  list-style: none;
  position: relative;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
img:hover {
  cursor: pointer;
  opacity: 0.7;
}

img:hover + .btn {
  opacity: 0.7;
}
.btn:hover {
  opacity: 1;
}
.btn {
  opacity: 0;
}
.sporocilo {
  text-align: center;
  font-size: 20px;
}
button a {
  color: black;
}
.likeButton,
.downloadButton {
  position: absolute;
  bottom: 20px;
  cursor: pointer;
  background-color: white;
  padding: 5px 7px;
  outline: none;
  border: none;
}
.likeButton {
  left: 30px;
}
.downloadButton {
  right: 30px;
}
.downloadButton:hover {
  opacity: 1;
}
.likeButton:hover {
  opacity: 1;
}
.liked {
  color: red;
}
.fa-heart:hover {
  color: red;
}
</style>