<script>
  import TestGameList from './components/TestGameList.vue';
  import NavBar from './components/NavBar.vue'
  export default {
        name: 'App',
        components: {
            TestGameList,
            NavBar
        } 
  }

</script>

<template>
  <NavBar></NavBar>
  <RouterView/>
</template>

<style>
body {
    overflow-y: scroll;
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
