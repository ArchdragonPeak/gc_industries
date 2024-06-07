<script>
  import TestGameList from './components/TestGameList.vue';

  export default {
        name: 'App',
        components: {
            TestGameList
        }
  }

</script>

<template>
  <div class="topnav">
    <span>
      <img id="navlogo" alt="Logo" src= "/img/gigachad_logo.png" height="64" width="64">
    </span>
    <p id="logotext">GCI</p>
    <span id="threebuttons">
      <router-link to="/about">Bibliothek</router-link>
      <router-link to="/discover">Entdecken</router-link>
      <router-link to="/Profil">Profil</router-link>
    </span>
    <span>
      <img id="profilepicture" alt="PB" src="/img/profilepicture.png" heigth="64" width="64">
    </span>
  </div>
  <RouterView/>
</template>

<style scoped>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#threebuttons {
  font-family: sans-serif;
  width: 100%;
  display: flex;
  justify-content : center;
}
#logotext {
  float: left;
  font-size: 25px;
  font-weight: bold;
  font-family: sans-serif;
  margin-left: 5px;
}
#profilepicture {
  margin-right: 10px;
}
/* Add a black background color to the top navigation */
.topnav {
  overflow: hidden;
  height: 80px;
  display: flex;
  align-items : center;
}

/* Style the links inside the navigation bar */
.topnav a{
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

/* Change the color of links on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.topnav a.active {
  background-color: #04AA6D;
  color: white;
}
</style>
