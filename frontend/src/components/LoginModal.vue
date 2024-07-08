<template>
    <div>
      <div class="bg" @click="$emit('bgClicked')"></div>
      <div class="login-wrapper">
        <div>
          <h1>Anmelden</h1>
        </div>
        <hr class="funny-bar">
        <div class="modal-row">
          <input v-model="email" placeholder="E-Mail" type="email" />
        </div>
        <div class="modal-row">
          <input v-model="password" placeholder="Passwort" type="password" />
        </div>
        <div class="modal-row">
          <button @click="login">Anmelden</button>
        </div>
        <div>
          <p>Noch nicht Registriert? <b @click="$emit('switchToRegister')">Hier klicken!</b></p>
        </div>
        <div v-if="loginStatus === 'error'" class="error-message">
          {{ error }}
        </div>
        <div v-if="loginStatus === 'success'" class="success-message">
          Erfolgreich angemeldet!
        </div>
      </div>
    </div>
  </template>
  
  <script>
export default {
  name: "LoginModal",
  data() {
    return {
      email: '',
      password: '',
      loginStatus: '',
      error: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch(`http://localhost:3000/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: this.email, password: this.password })
        });
        if (!response.ok) {
          throw new Error('Netzwerkantwort war nicht ok');
        }
        const data = await response.json(); // Objekt: { token: {}, user: {} }
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        localStorage.setItem('userID', data.user.userID); // Speichere die userID für einfachen Zugriff
        this.$emit('loggedIn', data.user);
        this.loginStatus = 'success';
        this.error = '';
        console.log("LoginModal: Erfolgreich eingeloggt", data);
      } catch (error) {
        this.loginStatus = 'error';
        this.error = 'Passwort und/oder E-Mail sind falsch';
        console.error("Error:", error);
      }
    }
  }
};
  </script>  

<style scoped>
.modal-row input{
  background-color: gainsboro;
  height: 50px;
  width: 80%;
  border: 0;
  border-radius: 12px;
  font-size: 32px;
  padding-left: 2%;
  padding-right: 2%;
}
.modal-row {
    margin-top: 4%;
}

.modal-row button{
    padding: 3px 5px 3px 5px;
    margin-bottom: 10px;
    margin-left: 10px;
    outline: none;
    border: 1px double;
    border-radius: 5px;
    font-size: 24px;
    font-family: sans-serif;
}
.login-wrapper h1{
    color: white;
    text-shadow: 1px 1px 2px black;
}
.login-wrapper p{
    color: white;
    text-shadow: 1px 1px 2px black;
    font-size: 18px;
}
.login-wrapper {
    font-size: 16px;
    height: 400px;
    width: 400px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -200px;
    margin-left: -200px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    border-radius: 5%;
    padding: 10px 10px 10px 10px;
}
input {
    font-size: 26px;
}
button {
    font-size: 30px;
}
.bg{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(5px);
}
</style>