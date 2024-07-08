<template>
    <div class="bg" @click="$emit('bgClicked')"></div>
        <div class="register-wrapper">
            <div>
                <h1>Registrieren</h1>
            </div>
            <hr class="funny-bar">
            <div class="modal-row">
                <input placeholder="Benutzername" type="text" v-model="username"></input>
            </div>
            <div class="modal-row">
                <input placeholder="E-Mail" type="email" v-model="email"></input>
            </div>
            <div class="modal-row">
                <input placeholder="Passwort" type="password" v-model="password"></input>
            </div>
            <div class="modal-row">
                <button @click="register"> Registrieren</button>
            </div>
            <div class="register-text">
                <p>Schon Registriert? <b @click="$emit('switchToRegister')"> Hier klicken!</b></p>
            </div>
        </div>
</template>
    
<script>
    export default {
        name: "RegisterModal",
        data() {
            return {
                username: '',
                email: '',
                password: ''
            };
        },
        methods: {
            async register() {
                try {
                    const response = await fetch('http://localhost:3000/auth/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ username: this.username, email: this.email, password: this.password })
                    });
                    if (!response.ok) {
                        throw new Error('Registration failed');
                    }
                    this.$emit('register-success');
                    console.log("RegisterModal: Erfolgreich registriert", username, email, password)
                } catch (error) {
                    console.error('Error during registration:', error);
                }
            }
        }
    }
</script>

<style scoped>
.register-text p{
    margin-top: 1%;
}
.modal-row input{
  background-color: gainsboro;
  height: 50px;
  width: 80%;
  border: 0;
  border-radius: 12px;
  font-size: 32px;
  padding-left: 2%;
  padding-right: 2%;
}
.modal-row {
    margin-top: 4%;
}

.modal-row button{
    padding: 3px 5px 3px 5px;
    margin-bottom: 10px;
    margin-left: 10px;
    outline: none;
    border: 1px double;
    border-radius: 5px;
    font-size: 24px;
    font-family: sans-serif;
}
.register-wrapper h1{
    color: white;
    text-shadow: 1px 1px 2px black;
}
.register-wrapper p{
    color: white;
    text-shadow: 1px 1px 2px black;
    font-size: 18px;
}
.register-wrapper {
    font-size: 16px;
    height: 400px;
    width: 400px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -200px;
    margin-left: -200px;
    text-align: center;
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