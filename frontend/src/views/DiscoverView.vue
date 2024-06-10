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
                "name":"Space Game","gameID":"1", "tags":"Space, Adventure","bewertung":"4.5", "gamelogo": "./img/rndicon1.webp"
            },
            {
                "name":"Immortal Kombat","gameID":"2", "tags":"Action, Fighting","bewertung":"2.5", "gamelogo": "./img/rndicon2.webp"
            },
            {
                "name":"Cyber Bugs 1984","gameID":"3", "tags":"Action, RPG","bewertung":"4.7", "gamelogo": "./img/rndicon3.webp"
            },
            {
                "name":"Indana Joseph","gameID":"4", "tags":"Point-and-Click-Adventure","bewertung":"3.8", "gamelogo": "./img/rndicon4.webp"
            },
            {
                "name":"Suka Striker","gameID":"5", "tags":"FPS, Multiplayer","bewertung":"2.9", "gamelogo": "./img/rndicon5.webp"
            },
            {
                "name":"Space Game 2","gameID":"6", "tags":"Action","bewertung":"4.1", "gamelogo": "./img/rndicon1.webp"
            },
            {
                "name":"Immortal Kombat 2","gameID":"7", "tags":"Action","bewertung":"4.5", "gamelogo": "./img/rndicon2.webp"
            },
            {
                "name":"Cyber Bugs 1985","gameID":"8", "tags":"Action","bewertung":"4.5", "gamelogo": "./img/rndicon3.webp"
            },
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