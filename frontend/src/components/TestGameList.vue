<template>
    <div>
        <p class="listtitle" >{{ genre }}</p>
            <GameListItem v-for="game in games"
                :key="game.gameID"
                :gamelogo = "game.gamelogo"
                :name = "game.name"
                :gameID = "game.gameID"
                :tags = "game.tags"
                :rating= game.bewertung>
            </GameListItem>
    </div>
</template>

<script>
    import GameListItem from './GameListItem.vue';
    
    export default {
        name: 'TestGameList',
        components: {
            GameListItem
        },
        props: {
            games: Array
        },
        data() {
            return {
                genre: "Action"
            }
        }
    }
</script>

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