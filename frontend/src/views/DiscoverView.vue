<template>
    <h1 class="title">Entdecken</h1>
    <TestGameList :games="games"></TestGameList>
  </template>
  
  <script>
  import TestGameList from '../components/TestGameList.vue';
  
  export default {
    name: 'DiscoverView',
    components: {
      TestGameList
    },
    data() {
      return {
        games: []
      };
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
          console.log(this.games);
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