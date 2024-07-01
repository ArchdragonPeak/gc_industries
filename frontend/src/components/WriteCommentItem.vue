<template>
    <div class="commentitem">
        <div class="head">
            <div class="profile">
                <div class="profile-item">
                    <img alt="Pic" src="../../public/img/gigachad_logo.png"  height="32" width="32">
                </div>
                <div class="profile-item">
                    <p><b>Profilname</b></p>
                </div>
                <div class="profile-item" id="date">
                    <p> {{ this.datum }} </p>
                </div>
            </div>
            
        </div>

        <div class="body">
            <div class="text-wrapper">
                <textarea ref="message" class="search" type="text" v-model="input" placeholder="Kommentar schreiben" />
                <button @click="message.value = ''">abbrechen</button>
                <button @click='sendMessage(); message.value = ""'>Senden</button>
                
            </div>
        </div>
    </div>
</template>

<script>
    import { ref } from "vue";
    export default {
        setup() {
            const message = ref(null)
            return {
                message
            }
        },
        name:'WriteCommentItem',
        props: {
                profilepic: String,
                username: String,
                date: Date,
        },
        data() {
            return {
                datum: new Date().toLocaleDateString("de-DE", {year:"numeric", month:"2-digit", day:"2-digit",hour:"2-digit", minute:"2-digit",second:"2-digit"}) }
        },
        methods: {
            sendMessage(){
                alert("Nachricht gesendet!")
            }
        }
    }
</script>

<style scoped>
.search {
  background-color: rgb(221, 221, 221);
  height: 72px;
  width: 100%;
  border: 20px;
  outline: none;
  resize: vertical;
  border: 1px dotted darkgray;
  border-radius: 12px;
  font-size: 16px;
  font-family: monospace;   
  margin-bottom: 12px;
}
#date {
    color: gray;
    padding-left: 1%;
}
img {
    border-radius: 50%;
}
.profile {
    padding: 0;
    margin-left: 12px;
}
.commentitem {
    background-color: lightgray;
    border-radius: 12px;
}
.head {
    align-content: center;
    height: 20%;
}
.body {
    height: 80%;
}
.profile-item {
    display: inline-block;
    vertical-align: middle;
    margin: 2px 2px 0px 2px;
}
.text-wrapper {
    margin: 0px 12px 12px 12px;
    font-size: 16px;
    font-family: monospace;
}
.text {
    padding-bottom: 12px;
    margin-top: 0px;
}
</style>