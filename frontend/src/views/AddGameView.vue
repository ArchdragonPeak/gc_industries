<template>
    <h1 class="title">Neues Spiel hinzufügen</h1>
    <div class="wrapper">
        <div class="left"></div>

        <div class="main">
            <div>
                <form v-if="showForm" @submit.prevent="postGame" class="form-grid">

                    <div class="grid-item"> <label for="name">Name:</label> </div>
                    <div class="grid-item"> <input class="game-input" type="text" id="name" v-model="name" required> </div>
                    
                    <input class="game-input" type="number" id="gameID" v-model="gameID" style="display: none">
                    <div class="grid-item"> <label for="tags">Tags:</label> </div>
                    <div class="grid-item"> <input class="game-input" type="text" id="tags" v-model="tags" required> </div>

                    <div class="grid-item"> <label for="name">Quelle:</label> </div>
                    <div class="grid-item"> <input class="game-input" type="text" id="source" v-model="source" required> </div>

                    <div class="grid-item"> <label for="name">Beschreibung:</label> </div>
                    <div class="grid-item"> <textarea class="game-input" type="text" id="area" v-model="description" required> </textarea> </div>

                    <div class="grid-item"> <label for="name">Kurzeinleitung:</label> </div>
                    <div class="grid-item"> <textarea class="game-input" type="text" id="area" v-model="instruction" required> </textarea> </div>

                    <button type="submit">Spiel speichern</button>
                    
                </form>
            </div>
        </div>

        <div class="right"></div>
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
        name: '',
        gameID: '',
        tags: '',
        gamelogo: '',
        source: '', // format: ../../games/canvas/pong.html
        description: '',
        instruction: '',
        showForm: true
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
      },
      async postGame() {
          try {
            const requestBody = {
              gameID: this.gameID,
              name: this.name,
              gamelogo: this.gamelogo,
              tags: this.tags,
              instruction: this.instruction,
              description: this.description,
              source: this.source,
              ishtml: true
          };
          console.log('Request Body:', requestBody);
            

          const token = localStorage.getItem('token');
          const response = await fetch('http://localhost:3000/games', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestBody)
          });
          if (!response.ok) {
            const errorData = await response.json();
            console.error('Server Error:', errorData);
            throw new Error('Netzwerkantwort war nicht ok');
          }
          const data = await response.json();
          console.log('Erfolgreich gesendet:', data);
          this.fetchGames();
          this.resetForm();
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
}
</script>

<style scoped>
#area {
  height: 120%;
  background-color: rgb(221, 221, 221);
  height: 72px;
  border: 20px;
  outline: none;
  resize: vertical;
  border: 1px dotted darkgray;
  border-radius: 12px;
  font-size: 16px;
  font-family: monospace;   
  margin-bottom: 12px;
}
.upload-input {
    border-radius: 10px;
    background-color: gainsboro;
    font-size: 35px;
}
.form-grid {
    text-align: left;
    padding-left: 10%;
    padding-top: 10%;
    display: grid;
    grid-template-columns: auto auto;
    font-size: 25px;
}
.game-input {
    border-radius: 10px;
    box-sizing: content-box;
    border: 0;
    background-color: gainsboro;
    height: 45px;
    width: 80%;
    font-size: 25px;
}
.grid-item {
  padding: 0px;
  text-align: left;
}
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 0% 10% 0% 10%;
}
.grid-item {
  padding: 20px;
  text-align: left;
}
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
    background-color: whitesmoke;
    height: 100%;
}
</style>