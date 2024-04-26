<template>
    <p>Test Paragraph</p>
    <GameListItem icon = '../assets/logo.png' title = 'Space Game'
        genres = 'Action, Space'> </GameListItem>

</template>

<script>
    import GameListItem from './components/GameListItem.vue'
    export default {
        name: 'TestGameList',
        components: {
            GameListItem
        }
    }
    

</script>