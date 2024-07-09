<template>
    <div class="gamelistitem" @click="this.$router.push({path:'/game/' + gameID})">
        <div class="gameicon">
            <img alt="Hallo" :src= gamelogo height="96" width="96">
        </div>
        <div class="gameinfo">
            <p id="title">{{ name }}</p>
            <p id="tags">{{ stringifytags() }}</p>
        </div>
        <div class="rating">
            <p id="rating"></p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'GameListItem',
        props: {
            gameID: Number,
            name: String,
            gamelogo: String,
            rating: Array,
            tags: { //warum auch immer es required braucht
                type: Array,
                required: true
            },
        },
        methods: {
            stringifytags() {
                return this.tags.join(', ');
            }
        }
    }
</script>

<style scoped>
    .gameinfo{
        display: inline-block;
        vertical-align: top;
        width: 50%;
        text-align: left;
    }
    .gameicon{
        display: inline-block;
    }
    .gamelistitem{
        cursor: pointer;
        display: flex;
        justify-content: center;
        transition: 1s;
        margin: 0 0 15px;
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
    #tags{
        font-family: Arial, Helvetica, sans-serif;
        font-size: 18px; 
    }
    #rating{
        font-family: Arial, Helvetica, sans-serif;
        font-size: 18px;
        color: slateblue;
        margin: 10px 10px;
        align-self: center;
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
        border-radius: 10px;
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