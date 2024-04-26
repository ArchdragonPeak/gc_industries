<template>
    <a href="http://www.google.de" >
    <div class="gamelistitem">
        <img id="logo" alt="Hallo" src= "../../public/img/rndicon.webp" height="96" width="96">
        <p id="title"> Titel: {{ title }}</p>
        <p id="genres"> Genres: {{ genres }}</p>
    </div>
    </a>
</template>

<script>
    export default {
        name: 'GameListItem',
        props: {
            gamelogo: String,
            title: String,
            genres: String
        },

        data: function() {
            return {
                publicPath: process.env.BASE_URL
            }
        }
    }

</script>

<style scoped>
    div{
        border-style: dashed;
        border-width: 2px;
        border-color: lightblue;
        display: flow-root;
    }
    p{
        margin-top: 0px;
        margin-bottom: 0px;
    }
    #title{
        font-family: 'Times New Roman', Times, serif;
        font-weight: bold;
        font-size: 35px;
    }
    #genres{
        font-family: Arial, Helvetica, sans-serif;
        font-size: 18px; 
    }
    img{
        float: inline-start;
        margin-right: 5px;
    }
    div:hover{
        background-color: gainsboro;
    }
    a:visited{
        text-decoration: dotted;
        color: black;
    }
    a{
        text-decoration: dotted;
        color: black;
    }
</style>