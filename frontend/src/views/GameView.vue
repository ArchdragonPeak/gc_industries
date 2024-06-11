<template>
    <h1 class="title">Spiel</h1>

    <div class="wrapper">
        <div class="left">Left</div>

        <div class="main">
            <p>Game</p>
        </div>

        <div class="right">Right</div>
    </div>
</template>

<script>

export default{
    name: 'ProfileView',
    components: {
    },
    data() {
      return {
        games: [],
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
          //console.log(this.games);
        } catch (error) {
          console.error('Es gab ein Problem mit der Fetch-Operation:', error);
        }
      }
    },
    mounted() {
      this.fetchGames();
    }
}
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
    background-color: red;
    height: 100%

}
div.right {
    float: left;
    width: 15%;
    background-color: green;
    height: 100%
}
div.main {
    float: left;
    width: 70%;
    background-color: blue;
    height: 100%
}
</style>