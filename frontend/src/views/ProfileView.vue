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
          <div class="grid-item"><button @click="changeUsername" id="username-button">Ändern</button></div>  

          <div class="grid-item">E-Mail</div>
          <div class="grid-item">{{ user.email }}</div>
          <div class="grid-item"><button @click="changeEmail" id="email-button">Ändern</button></div>  

          <div class="grid-item">Passwort</div>
          <div class="grid-item"><button @click="changePassword" id="pass-button">Passwort ändern</button></div>
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
      async loadUserProfile() {
      const userID = localStorage.getItem('userID');
      const token = localStorage.getItem('token');
      if (!userID || !token) {
        console.error('UserID oder Token nicht vorhanden.');
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
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        this.user = data;
        console.log("Profil geladen:", this.user);
      } catch (error) {
        console.error('Es gab ein Problem mit der Fetch-Operation:', error);
      }
    },
      async changeUsername() {
      const newUsername = prompt("Enter new username:");
      if (newUsername) {
        await this.updateProfile({ username: newUsername });
      }
    },

    async changeEmail() {
      const newEmail = prompt("Enter new email:");
      if (newEmail) {
        await this.updateProfile({ email: newEmail });
      }
    },

    async updateProfile(updateData) {
    const userID = localStorage.getItem('userID');
    const token = localStorage.getItem('token');
    console.log(token);

    try {
      const response = await fetch(`http://localhost:3000/users/${userID}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      this.user = { ...this.user, ...data }; // Aktualisiere das lokale Benutzerobjekt mit den neuen Daten
      console.log('Server response:', data); // Logge die Antwort des Servers
      alert("Profil erfolgreich aktualisiert!");
    } catch (error) {
      console.error('There was a problem updating the profile:', error);
      alert("Profil konnte nicht aktualisiert werden. Bitte versuche es erneut.");
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