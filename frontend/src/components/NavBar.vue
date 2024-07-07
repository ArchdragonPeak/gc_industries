<template>
    <div class="topnav">
      
      <div class="company" @click="this.$router.push({path:'/about'})">
          <img id="navlogo" alt="Logo" src= "/img/gigachad_logo.png" height="64" width="64">
          <p class="logotext">GCI</p>
      </div>
     
      <div id="threebuttons">
        <router-link to="/library">Bibliothek</router-link>
        <router-link to="/discover">Entdecken</router-link>
        <router-link to="/profile">Profil</router-link>
      </div>
      <div class="profile">
        <p @click="showLogin()">Profile.name</p>
        <LoginModal v-if="loginVisible" @bgClicked="showLogin"></LoginModal>
        <img class="profilepicture" alt="PB" src="/img/profilepicture.png" heigth="64" width="64" @click="this.$router.push({path:'/profile'})">
      </div>
    </div>
</template>

<script>
    import LoginModal from "@/components/LoginModal.vue";
    export default {
        name: 'NavBar',
        components: {
            LoginModal
        },
        data(){
          return {
            loginVisible: false
          }
        },
        methods: {
          showLogin(){
            this.loginVisible = !this.loginVisible;
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