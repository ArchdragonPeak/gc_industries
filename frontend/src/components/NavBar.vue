<template>
  <div class="topnav">
    <div class="company" @click="this.$router.push({ path: '/about' })">
      <img id="navlogo" alt="Logo" src="/img/gigachad_logo.png" height="64" width="64">
      <p class="logotext">GCI</p>
    </div>
    <div id="threebuttons">
      <router-link to="/library">Bibliothek</router-link>
      <router-link to="/discover">Entdecken</router-link>
      <router-link to="/profile">Profil</router-link>
    </div>
    <div class="profile">
      <p @click="showLogin()">{{ user ? user.username : 'Anmelden' }}</p>
      <LoginModal v-if="loginVisible" @bgClicked="showLogin" @switchToRegister="switchModal" @loggedIn="handleLogin"></LoginModal>
      <RegisterModal v-if="registerVisible" @bgClicked="showRegister" @switchToRegister="switchModal"></RegisterModal>
      <img class="profilepicture" alt="PB" src="/img/profilepicture.png" height="64" width="64" @click="this.$router.push({ path: '/profile' })">
    </div>
  </div>
</template>

<script>
import LoginModal from "@/components/LoginModal.vue";
import RegisterModal from "@/components/RegisterModal.vue";

export default {
  name: 'NavBar',
  components: {
    LoginModal,
    RegisterModal
  },
  data() {
    return {
      loginVisible: false,
      registerVisible: false,
      user: JSON.parse(localStorage.getItem('user')) || null //holt den Benutzer aus dem localStorage als Objekt, andersfalls null
    }
  },
  methods: {
    showLogin() {
      this.loginVisible = !this.loginVisible; //Schalter für LoginModal, sollte bestenfalls alleine angezeigt werden
    },
    showRegister() {
      this.registerVisible = !this.registerVisible; //RegisterModal, genau wie LoginModal alleine. Niemals zusammen
    },
    switchModal() { //verrückte Logik um nur ein Modal anzuzeigen, bei Problem hier nachschauen
      if (this.loginVisible) {
        this.loginVisible = false;
        this.registerVisible = true;
      } else {
        this.loginVisible = true;
        this.registerVisible = false;
      }
    },
    handleLogin(user) {
      this.user = user;
      this.loginVisible = false;
    }
  }
}
</script>

<style scoped>
.company {
  cursor: pointer;
  display: flex;
  align-items: center;
}
body {
  overflow-y: scroll;
}
#threebuttons {
  font-family: sans-serif;
  width: 100%;
  display: flex;
  justify-content : center;
}
p.logotext {
  font-size: 25px;
  font-weight: bold;
  font-family: sans-serif;
  margin-left: 5px;
}
div.profile {
  display: flex;
  text-decoration: none;
}
div.profile p {
  font-family: sans-serif;
}
img.profilepicture {
  margin-right: 10px;
  cursor: pointer;
}

.topnav {
  overflow: hidden;
  height: 80px;
  display: flex;
  align-items : center;
  box-shadow: 0px 50px 200px gainsboro;
  border-radius: 20px;
}

.topnav a {
  color: black;
  padding: 20px 25px;
  text-decoration: none;
  font-size: 25px;
  line-height: 75px;
}
.topnav img {
  border-radius: 20%;
  float: left;
  margin-left: 10px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04AA6D;
  color: white;
}
</style>