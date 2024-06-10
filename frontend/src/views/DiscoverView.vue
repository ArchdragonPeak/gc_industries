<template>
    <h1 class="title">Entdecken</h1>
    <TestGameList :games='games'></TestGameList>
</template>

<script>
import TestGameList from '../components/TestGameList.vue'

export default{
    name: 'DiscoverView',
    components: {
        TestGameList
    },
    data() {
        return {
            games: [
                {
                    name: "Space Game",
                    gameID: 1,
                    tags: "Space, Adventure",
                    bewertung: "4.5",
                    gamelogo: "./img/rndicon1.webp"
                },
                {
                    name: "Space Game",
                    gameID: 2,
                    tags: "Space, Adventure",
                    bewertung: "4.5",
                    gamelogo: "./img/rndicon1.webp"
                }
            ]
        }
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