<template>
    <h1 class="title">Entdecken</h1>
    <TestGameList></TestGameList>
    <TestGameList></TestGameList>
</template>

<script>
import TestGameList from '../components/TestGameList.vue'

export default{
    name: 'DiscoverView',
    components: {
        TestGameList
    }
}
</script>

<style scoped>
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