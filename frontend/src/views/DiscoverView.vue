<template>
  <h1 class="title">Entdecken</h1>
  
  <input class="search" type="text" v-model="input" placeholder="Spiel suchen..." />
  <div v-if="input && !filteredGames.length">
    <p id="no-game-found">Es wurde leider kein Spiel gefunden!</p>
  </div>
  <TestGameList :games="filteredGames" listTitle="Suche" v-if="input && filteredGames.length"></TestGameList>
  <TestGameList :games="games" listTitle="Angesagt" v-if="!input || !filteredGames.length"></TestGameList>
</template>

<script>
import Fuse from 'fuse.js';
import TestGameList from '../components/TestGameList.vue';

export default {
  name: 'DiscoverView',
  components: {
    TestGameList
  },
  data() {
    return {
      games: [],
      input: ''
    };
  },
  computed: {
    filteredGames() {
      const fuse = new Fuse(this.games, {
        distance: 50, // Standard 100
        threshold: 0.5, // Standard 0.6
        keys: ['name'] // vielleicht Beschreibung hinzufügen
      });
      const results = fuse.search(this.input);
      return results.map(result => result.item);
    }
  },
  methods: {
    async fetchGames() {
      try {
        const response = await fetch('http://localhost:3000/games');
        if (!response.ok) {
          throw new Error('Netzwerkantwort war nicht ok');
        }
        const data = await response.json();
        this.games = data;
      } catch (error) {
        console.error('Es gab ein Problem mit der Fetch-Operation:', error);
      }
    }
  },
  mounted() {
    this.fetchGames();
  }
};
</script>

<style scoped>
.search {
  background-color: gainsboro;
  height: 50px;
  width: 40%;
  border: 0;
  border-radius: 12px;
  font-size: 35px;
  padding-left: 2%;
  padding-right: 2%;
  text-align: center;
}
#no-game-found {
  font-size: 25px;
}
body {
    overflow-y: scroll;
}
h1.title {
    font-family: sans-serif;
    font-size: 50px;
    text-align: center;
}

/* possibly unnecessary */
div.wrapper {
    width: 100%;
    height: 800px;
    text-align: center;
    font-size: 40px;
    font-family: sans-serif;
}
div.left {
    float: left;
    width: 15%;
    background-color: gainsboro;
    height: 100%

}
div.right {
    float: left;
    width: 15%;
    background-color: gainsboro;
    height: 100%
}
div.main {
    float: left;
    width: 70%;
    background-color: whitesmoke;
    height: 100%
}
</style>