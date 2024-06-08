<template>
    <h1 class="title">Profil</h1>
    <div class="wrapper">
        <div class="left">Left</div>

        <div class="main">
            <h1> Profile.name</h1>
        </div>

        <div class="right">Right</div>
    </div>

</template>

<script>

export default{
    name: 'ProfileView',
    components: {
    }
}
</script>

<style scoped>
body {
    overflow-y: scroll;
}
h1.title {
    font-family: sans-serif;
    font-size: 50px;
    text-align: center;
}
div.wrapper {
    width: 100%;
    height: 800px;
    text-align: center;
    font-size: 40px;
    font-family: sans-serif;
}
div.left {
    float: left;
    width: 15%;
    background-color: gainsboro;
    height: 100%

}
div.right {
    float: left;
    width: 15%;
    background-color: gainsboro;
    height: 100%
}
div.main {
    float: left;
    width: 70%;
    background-color: whitesmoke;
    height: 100%
}
</style>