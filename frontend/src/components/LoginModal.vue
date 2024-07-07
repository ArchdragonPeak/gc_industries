<template>
<div class="bg" @click="$emit('bgClicked')"></div>
    <div class="login-wrapper">
        <input placeholder="Benutzername" type="email"></input>
        <input placeholder="Passwort" type="password"></input>
        <button> Anmelden</button>
        <button> Registrieren</button>
    </div>
</template>

<script>
export default {
    name: "LoginModal"
}
</script>

<style scoped>
.login-wrapper {
    font-size: 16px;
    height: 400px;
    width: 400px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -200px;
    margin-left: -200px;
    text-align: center;
    align-content: center;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    border-radius: 5%;
    padding: 10px 10px 10px 10px;
}
input {
    font-size: 26px;
}
button {
    font-size: 30px;
}
.bg{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(5px);
}
</style>