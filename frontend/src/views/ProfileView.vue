<template>
    <h1 class="title">Mein Profil</h1>
    <div class="wrapper">
        <div class="left">
            Left
        </div>

        <div class="main">
            <h1> Einstellungen</h1>

            <div class="grid-container">
                <div class="grid-item">Benutzername</div>
                <div class="grid-item">user.name</div>
                <div class="grid-item"><button id="username-button">Ändern</button> </div>
                <div class="grid-item">E-Mail</div>
                <div class="grid-item">user.email</div>
                <div class="grid-item"><button id="email-button">Ändern</button> </div>
                <div class="grid-item">Passwort</div>
                <div class="grid-item"><button id="pass-button">Passwort ändern</button> </div>
                <div class="grid-item"> </div>
            </div>
        </div>

        <div class="right">
            Right
        </div>
    </div>
</template>

<script>
</script>

<style scoped>
button {
    height: 50px;
    width: 140px;
    text-align: center;
    background-color: gainsboro;
    border-width: 1px;
    border-radius: 8px;
    font-size: 20px;
}
button:active {
    height: 50px;
    width: 140px;
    text-align: center;
    background-color: whitesmoke;
    border-width: 1px;
    border-color: white;
}
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 0% 10% 0% 10%;
}

.grid-item {
  padding: 20px;
  text-align: left;
}
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