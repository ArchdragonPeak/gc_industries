<template>
    <div class="gamelistitem">
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
            gamelogo: URL,
            title: String,
            genres: String,
            rating: Number
        },

        data: function() {
            return {
                publicPath: process.env.BASE_URL
            }
        }
    }

</script>

<style scoped>
    .gameinfo{
        display: inline-block;
        vertical-align: top;
    }
    .gameicon{
        display: inline-block;
    }
    .gamelistitem{
        display: flex;
        justify-content: center;
        transition: 1s;
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
    a{
        text-decoration: dotted;
        color: black;
    }

    @keyframes test {
        from{
            background-color: white;
            
        }
        to{
            background-color: gainsboro;
        }
    }
</style>