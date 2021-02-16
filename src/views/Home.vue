<template>
  <div id="app">
    <div class="header">
      <input
        type="text"
        v-model="userInput"
        name=""
        id=""
        placeholder="Išči slike"
      />
      <input
        type="button"
        v-on:click="poisci"
        value="Išči"
        placeholder="Najdi"
      />
    </div>
    <br />
    <br />
    <p class="sporocilo" v-if="jeNapaka">Napaka pri dobivanju slik</p>
    <p class="sporocilo" v-if="noResults">Vaša poizvedba ni našla rezultatov</p>
    <p class="sporocilo" v-if="loaded">Loading...</p>

    <div class="container" v-else>
      <div class="containerImg" v-for="slika in vseSlike" :key="slika.id">
        <img :src="slika.urls.small" :alt="slika.title" />
        <div class="btn">
          <button title="Odprite sliko" class="downloadButton">
            <a
              :href="slika.links.download"
              target="_blank"
              class="fas fa-arrow-down"
            ></a>
          </button>
          <button
            id="btnAddPriljubljenim"
            title="Dodaj k priljubljenim slikam"
            v-on:click="likeSliko(slika)"
            class="likeButton"
          >
            <a class="fas fa-plus" :id="slika.id"></a>
          </button>
        </div>
      </div>
    </div>
    <br />
    <p class="sporocilo" v-if="stSlik > 29">
      <router-link to="/unsplash">Zakaj ne gre naložiti več slik?</router-link>
    </p>
    <br />
  </div>
</template>

<script>
import Config from "../../public/config";
import axios from "axios";
import $ from "jquery";

export default {
  name: "app",
  data() {
    return {
      api_key: Config.api_key,
      loaded: false,
      imgLink: "",
      vseSlike: [],
      likedSlike: [],
      param: "",
      stSlik: 0,
      jeNapaka: false,
      noResults: false,
      userInput: "",
    };
  },
  methods: {
    poisci() {
      this.stSlik = 0;
      this.jeNapaka = false;
      this.noResults = false;
      this.vseSlike = [];
      this.poisciSlike(this.userInput);
    },

    likeSliko(to) {
      console.log("lajkal si " + to.id);

      ///če vsebuje sliko te jo odstranimo
      if (this.likedSlike.some((slika) => slika.id === to.id)) { //preveri če obstaja slika
        document.getElementById("btnAddPriljubljenim").title =  //spremenimo title
          "Dodaj k priljubljenim slikam";
        console.log("slika obstaja");
        this.likedSlike = this.likedSlike.filter((slika) => slika.id !== to.id);
        $("#" + to.id).removeClass("liked"); //element a ima id -> slika.id
        console.log("zbrisemo sliko");
      } else {
        //ne vsebuje slike, jo dodamo
        document.getElementById("btnAddPriljubljenim").title =
          "Odstrani od priljubljenih slik";
        this.likedSlike.push(to);
        $("#" + to.id).addClass("liked"); //Dodaj liked class
        console.log("dodamo sliko");
      }
      console.log("Vse slike so " + this.likedSlike);
    },

    isEmptyResponse(rez) { //preveri če poizvedba ni našla rezultatov
      if (rez == 0) {
        this.noResults = true;
      }
    },

    poisciSlike(arg) {  //iskanje slik preko unsplash
      this.loaded = true;
      if (this.stSlik > 30) {
        //d
      } else {
        this.stSlik += 10;
        this.param = arg;
        console.log("sem v app.vue in iscem uporabnika " + arg);
        axios
          .get(
            `https://api.unsplash.com/search/photos?page=1&query=${arg}&per_page=${this.stSlik}&client_id=ezDBIQPc_gVvi1dON83lVJNsb_vmd1Nu1tLRIFSzOZQ`
          )
          .then(
            (res) => (
              (this.vseSlike = res.data.results), //nov je objekt novih slik
              this.isEmptyResponse(res.data.total),
              console.log(
                `https://api.unsplash.com/search/photos?page=1&query=${arg}&per_page=${this.stSlik}&client_id=ezDBIQPc_gVvi1dON83lVJNsb_vmd1Nu1tLRIFSzOZQ`
              )
            )
          )
          .catch(() => ((this.jeNapaka = true), console.log(this.jeNapaka)));
      }
      this.loaded = false;
    },

    scroll: function () { //unlimited scroll
      if (this.vseSlike !== []) {
        //      console.log(($(window).height() + $(window).scrollTop()+1)+ " height pa je" + $(document).height() )
        if (
          $(document).height() <=
          $(window).height() + $(window).scrollTop() + 1
        ) {
          //Bottom Reached
          this.poisciSlike(this.param);
          //   console.log(this.vseSlike);
        }
      } else {
        console.log("ni se slik");
      }
    },
  },
  mounted() { // koda ki se zažene ko se cela instanca rendera
    console.log("dddd");
    window.addEventListener("scroll", this.scroll);

    if (localStorage.likedSlike) {
      this.likedSlike = JSON.parse(localStorage.likedSlike);
    }
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
* {
  margin: 0;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
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
input[type="button"],
input[type="text"] {
  border-radius: 20px;
  border: 2px solid black;
  padding: 8px;
  outline: none;
  box-shadow: none;
}
input[type="button"] {
  margin-left: 25px;
  width: 10vw;
  background-color: black;
  color: white;
}
input[type="button"]:hover {
  background-color: rgb(51, 51, 51);
  cursor: pointer;
}
input[type="text"] {
  width: 30vw;
}
@import url("https://fonts.googleapis.com/css2?family=Lexend+Mega&display=swap");
.header {
  padding-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
