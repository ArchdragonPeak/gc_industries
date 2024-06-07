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
                "title":"Space Game", "genre":"Space, Adventure","bewertung":"4.5", "gamelogo": "./img/rndicon1.webp"
            },
            {
                "title":"Immortal Kombat", "genre":"Action, Fighting","bewertung":"2.5", "gamelogo": "./img/rndicon2.webp"
            },
            {
                "title":"Cyber Bugs 1984", "genre":"Action, RPG","bewertung":"4.7", "gamelogo": "./img/rndicon3.webp"
            },
            {
                "title":"Indana Joseph", "genre":"Point-and-Click-Adventure","bewertung":"3.8", "gamelogo": "./img/rndicon4.webp"
            },
            {
                "title":"Suka Striker", "genre":"FPS, Multiplayer","bewertung":"2.9", "gamelogo": "./img/rndicon5.webp"
            },
            {
                "title":"Space Game 2", "genre":"Action","bewertung":"4.1", "gamelogo": "./img/rndicon1.webp"
            },
            {
                "title":"Immortal Kombat 2", "genre":"Action","bewertung":"4.5", "gamelogo": "./img/rndicon2.webp"
            },
            {
                "title":"Cyber Bugs 1985", "genre":"Action","bewertung":"4.5", "gamelogo": "./img/rndicon3.webp"
            },
        ]


</script>

<template>
    <div>
        <p class="listtitle" >{{ genre }}</p>
            <GameListItem v-for="game in games" :key="game" :gamelogo = game.gamelogo :title = game.title :genres = game.genre :rating= game.bewertung> {{ game }} </GameListItem>
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