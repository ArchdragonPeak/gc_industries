<template>
    <p>Test Paragraph</p>
    <GameListItem icon = '"../../public/img/rndicon1.webp"' title = 'Starfleet Delta'
        genres = 'Action, Space' rating='4.4'> </GameListItem>
    <GameListItem icon = '../../public/img/rndicon2.webp' title = 'Dragons Wrath'
        genres = 'Action, Space' rating='3.9'> </GameListItem>
    <GameListItem icon = '' title = 'Lost Civilisation'
        genres = 'Action, Space' rating='2.1'> </GameListItem>
    <GameListItem icon = '' title = 'Magical Unicorn'
        genres = 'Action, Space' rating='3.3'> </GameListItem>
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