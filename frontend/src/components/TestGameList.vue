<template>
    <div>
        <p class="listtitle" >{{ listTitle }}</p>
            <GameListItem v-for="game in games"
                :key="game.gameID"
                :gamelogo = "game.gamelogo"
                :name = "game.name"
                :gameID = "game.gameID"
                :tags = "game.tags"
                :rating= game.rating>
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
                listTitle: "Angesagt"
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