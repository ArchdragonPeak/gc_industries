<template>
    <h1 class="title">{{ game.name }}</h1>

    <div class="wrapper">
        <div class="left">Left</div>

        <div class="main">
            <p>Game</p>
        </div>

        <div class="right">Spielanleitung</div>
    </div>
</template>

<script>

export default{
    name: 'GameView',
    components: {
    },
    data() {
      return {
        game: {
          type: {},
          required: true
        }
      };
    },
    computed: {
      gameID() {
        return this.$route.params.id;
      }
    },
    methods: {
      async fetchGame() {
        try {
          const response = await fetch(`http://localhost:3000/games/${this.gameID}`);
          if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok');
          }
          const data = await response.json();
          this.game = data;
          console.log(this.game);
        } catch (error) {
          console.error('Es gab ein Problem mit der Fetch-Operation:', error);
          }
        }
    },
    mounted() {
      this.fetchGame();
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
    width: 25%;
    background-color: whitesmoke;
    height: 100%

}
div.right {
    float: left;
    width: 25%;
    background-color: whitesmoke;
    height: 100%
}
div.main {
    float: left;
    width: 50%;
    background-color: gainsboro;
    height: 100%;
}
</style>