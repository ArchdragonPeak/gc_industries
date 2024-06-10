<template>
    <h1 class="title">Entdecken</h1>
    <button @click="toggleForm">Neues Spiel hinzufügen</button>
    <form v-if="showForm" @submit.prevent="postGame">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required>
      </div>
      <div>
        <label for="gameID">Game ID:</label>
        <input type="number" id="gameID" v-model="gameID" required>
      </div>
      <div>
        <label for="tags">Tags:</label>
        <input type="text" id="tags" v-model="tags" required>
      </div>
      <div>
        <label for="gamelogo">Game Logo URL:</label>
        <input type="text" id="gamelogo" v-model="gamelogo" required>
      </div>
      <button type="submit">Spiel speichern</button>
    </form>
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
        games: [],
        name: '',
        gameID: '',
        tags: '',
        gamelogo: '',
        showForm: false
      };
    },
    methods: {
      toggleForm() {
        this.showForm = !this.showForm;
      },
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
      },
      async postGame() {
        try {
          const response = await fetch('http://localhost:3000/games', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: this.name,
              gameID: this.gameID,
              tags: this.tags,
              gamelogo: this.gamelogo
            })
          });
          if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok');
          }
          const data = await response.json();
          console.log('Erfolgreich gesendet:', data);
          this.fetchGames();
          this.resetForm();
          this.toggleForm();
        } catch (error) {
          console.error('Fehler bei der Anfrage:', error);
        }
      },
      resetForm() {
        this.name = '';
        this.gameID = '';
        this.tags = '';
        this.gamelogo = '';
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