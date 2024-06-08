<template>
    <div class="topnav">
      
      <div class="company" @click="this.$router.push({path:'/about'})">
          <img id="navlogo" alt="Logo" src= "/img/gigachad_logo.png" height="64" width="64">
          <p id="logotext">GCI</p>
      </div>
     
      <div id="threebuttons">
        <router-link to="/library">Bibliothek</router-link>
        <router-link to="/discover">Entdecken</router-link>
        <router-link to="/profile">Profil</router-link>
      </div>
      <div>
        <img id="profilepicture" alt="PB" src="/img/profilepicture.png" heigth="64" width="64">
      </div>
    </div>
</template>

<script>
export default {
    name: 'NavBar',
}
</script>

<style>
.company {
  cursor: pointer;
  justify-content: center;
  display: flex;
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
#logotext {
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
  box-shadow: 0px 50px 200px gainsboro;
  border-radius: 20px;
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