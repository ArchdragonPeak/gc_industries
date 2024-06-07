<script>
    import GameListItem from './GameListItem.vue';
    
    export default {
        name: 'TestGameList',
        components: {
            GameListItem
        },
        data() {
            return {
                games: games,
                genre: "Action"
            }
        }
    }

    let games = [
            {
                "title":"Space Game","id":"1", "genre":"Space, Adventure","bewertung":"4.5", "gamelogo": "./img/rndicon1.webp"
            },
            {
                "title":"Immortal Kombat","id":"2", "genre":"Action, Fighting","bewertung":"2.5", "gamelogo": "./img/rndicon2.webp"
            },
            {
                "title":"Cyber Bugs 1984","id":"3", "genre":"Action, RPG","bewertung":"4.7", "gamelogo": "./img/rndicon3.webp"
            },
            {
                "title":"Indana Joseph","id":"4", "genre":"Point-and-Click-Adventure","bewertung":"3.8", "gamelogo": "./img/rndicon4.webp"
            },
            {
                "title":"Suka Striker","id":"5", "genre":"FPS, Multiplayer","bewertung":"2.9", "gamelogo": "./img/rndicon5.webp"
            },
            {
                "title":"Space Game 2","id":"6", "genre":"Action","bewertung":"4.1", "gamelogo": "./img/rndicon1.webp"
            },
            {
                "title":"Immortal Kombat 2","id":"7", "genre":"Action","bewertung":"4.5", "gamelogo": "./img/rndicon2.webp"
            },
            {
                "title":"Cyber Bugs 1985","id":"8", "genre":"Action","bewertung":"4.5", "gamelogo": "./img/rndicon3.webp"
            },
        ]


</script>

<template>
    <div>
        <p class="listtitle" >{{ genre }}</p>
            <GameListItem v-for="game in games" :key="game.id" :gamelogo = game.gamelogo :title = game.title :id = game.id :genres = game.genre :rating= game.bewertung> {{ game }} </GameListItem>
    </div>
</template>

<style scoped>

.listtitle {
    text-align: center;
    font-family: sans-serif;
    font-size: 60px;
    font-weight: bold;
    overflow-y: hidden;
}
div {
    background-color: whitesmoke;
    margin-left: 30%;
    margin-right: 30%;
    border-radius: 20px;
}

</style>