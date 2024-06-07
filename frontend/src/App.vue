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

<style scoped>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
