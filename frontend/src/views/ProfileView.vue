<template>
    <h1 class="title">Mein Profil</h1>
    <div class="wrapper">
      <div class="left">
        Left
      </div>
  
      <div class="main">
        <h1>Einstellungen</h1>
  
        <div class="grid-container">
          <div class="grid-item">Benutzername</div>
          <div class="grid-item">{{ user.username }}</div>
          <div class="grid-item"><button id="username-button">Ändern</button></div>
  
          <div class="grid-item">E-Mail</div>
          <div class="grid-item">{{ user.email }}</div>
          <div class="grid-item"><button id="email-button">Ändern</button></div>
  
          <div class="grid-item">Passwort</div>
          <div class="grid-item"><button id="pass-button">Passwort ändern</button></div>
          <div class="grid-item"></div>
        </div>
      </div>
  
      <div class="right">
        Right
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProfileView',
    data() {
      return {
        user: {
          username: '',
          email: ''
        }
      };
    },
    mounted() {
      this.loadUserProfile();
    },
    methods: {
      async loadUserProfile() { //größte Sicherheitspanne aller Zeiten. Es können wahllos Passwörter abgefragt werden
        const userID = localStorage.getItem('userID');
        const token = localStorage.getItem('token');
        if (!userID || !token) {
          console.error('UserID oder Token kaputt. userID|token: ', userID, '|', token);
          return;
        }
  
        try {
          const response = await fetch(`http://localhost:3000/users/${userID}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok');
          }
          const data = await response.json();
          this.user = data;
          console.log("ProfileView: Profil wurde geladen:", this.user);
        } catch (error) {
          console.error('Es gab ein Problem mit der Fetch-Operation:', error);
        }
      }
    }
  };
  </script>

<style scoped>
button {
    height: 50px;
    width: 140px;
    text-align: center;
    background-color: gainsboro;
    border-width: 1px;
    border-radius: 8px;
    font-size: 20px;
}
button:active {
    height: 50px;
    width: 140px;
    text-align: center;
    background-color: whitesmoke;
    border-width: 1px;
    border-color: white;
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