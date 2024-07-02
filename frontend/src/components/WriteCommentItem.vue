<template>
    <div class="commentitem">
        <div class="head">
            <div class="profile">
                <div class="profile-item">
                    <img :src="profilepic" alt="Profilbild" height="32" width="32">
                </div>
                <div class="profile-item">
                    <p><b>{{ username }}</b></p>
                </div>
                <div class="profile-item" id="date">
                    <p> {{ datum }} </p>
                </div>
            </div>
        </div>

        <div class="body">
            <div class="text-wrapper">
                <textarea ref="message" class="search" v-model="input" placeholder="Kommentar schreiben"></textarea>
                <button @click="cancelMessage">abbrechen</button>
                <button @click="sendMessage">Senden</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
export default {
    setup() {
        const message = ref("");
        return { message };
    },
    name: 'WriteCommentItem',
    props: {
        profilepic: String,
        username: String,
        date: Date,
    },
    data() {
        return {
            input: '',
            dateOptions: { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" },
        }
    },
    computed: {
        datum() {
            return new Date().toLocaleDateString("de-DE", this.dateOptions);
        }
    },
    methods: {
        sendMessage() {
            if (this.input.trim()) {
                // API Call to send the message
                this.$parent.addComment(this.userID, "TestBenutzer", this.input); //userID, username, message
                console.log("Nachricht gesendet: ", this.input);
                this.input = ''; // Clear the input after sending
            }
        },
        cancelMessage() {
            this.input = '';
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