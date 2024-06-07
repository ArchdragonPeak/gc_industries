<template>
    <div class="gamelistitem" @click="this.$router.push({path:'/game/1'})">
        <div class="gameicon">
            <img alt="Hallo" :src= gamelogo height="96" width="96">
        </div>
        <div class="gameinfo">
            <p id="title">{{ title }}</p>
            <p id="genres">{{ genres }}</p>
        </div>
        <div class="rating">
            <p id="rating"> Rating: {{ rating }} </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'GameListItem',
        props: {
            gamelogo: String,
            id: String,
            title: String,
            genres: String,
            rating: String
        }
    }
</script>

<style scoped>
    .gameinfo{
        display: inline-block;
        vertical-align: top;
        width: 50%;
    }
    .gameicon{
        display: inline-block;
    }
    .gamelistitem{
        display: flex;
        justify-content: center;
        transition: 1s;
        margin: 0% 0% 15px;
    }
    .rating{
        display: flex;
        vertical-align: bottom;
    }
    p{
        margin-top: 0px;
        margin-bottom: 0px;
    }
    #title{
        display: inline-block;
        font-family: 'Times New Roman', Times, serif;
        font-weight: bold;
        font-size: 35px;
    }
    #genres{
        font-family: Arial, Helvetica, sans-serif;
        font-size: 18px; 
    }
    #rating{
        font-family: Arial, Helvetica, sans-serif;
        font-size: 18px;
        color: slateblue;
        margin-top: 50%;
        margin-left: 10px;
    }
    img{
        display: inline-block;
        margin-right: 5px;
        border-radius: 20px;
    }
    div:hover.gamelistitem{
        background-color: gainsboro;
        animation: test 0.5s;
    }
    a:visited{
        text-decoration: dotted;
        color: black;
    }
    div {
        background-color: rgba(220, 220, 220, 0.3);
        border-radius: 5px;
    }
    a{
        text-decoration: dotted;
        color: black;
    }

    @keyframes test {
        from{
            background-color: whitesmoke;
            
        }
        to{
            background-color: gainsboro;
        }
    }
</style>