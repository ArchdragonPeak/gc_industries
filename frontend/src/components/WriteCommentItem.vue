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
                    <p>{{ datum }}</p>
                </div>
            </div>
        </div>

        <div class="body">
            <div class="text-wrapper">
                <textarea ref="message" class="search" v-model="input" placeholder="Kommentar schreiben"></textarea>
            </div>
        </div>

        <div class="comment-buttons">
            <button class="button" @click="cancelMessage">abbrechen</button>
            <button class="button" @click="sendMessage">absenden</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WriteCommentItem',
    props: {
        profilepic: String,
        username: String,
        userID: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            input: '',
            dateOptions: { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }
        };
    },
    computed: {
        datum() {
            return new Date().toLocaleDateString("de-DE", this.dateOptions);
        }
    },
    methods: {
        async sendMessage() {
            if (this.input.trim()) {
                try {
                    const response = await fetch(`http://localhost:3000/comments`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            gameID: this.$parent.gameID,
                            userID: this.userID,
                            date: new Date(), // Direktes Datum verwenden
                            text: this.input
                        })
                    });
                    if (!response.ok) {
                        throw new Error('Netzwerkantwort war nicht ok');
                    }
                    this.$emit('add-comment'); // Emit an event to refresh comments in the parent component
                    this.input = ''; // Clear the input after sending
                } catch (error) {
                    console.error('Es gab ein Problem mit der Fetch-Operation:', error);
                }
            }
        },
        cancelMessage() {
            this.input = '';
        }
    }
};
</script>

<style scoped>
.comment-buttons {
    text-align: right;
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right: 10px;
}
.button {
    padding: 3px 5px 3px 5px;
    margin-bottom: 10px;
    margin-left: 10px;
    font-size: 16px;
    outline: none;
    border: 1px double;
    border-radius: 5px;
    font-size: 16px;
    font-family: sans-serif;
}
.button:active {
    background-color: darkgray;
}
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
    margin: 0px 12px 0px 12px;
    font-size: 16px;
    font-family: monospace;
}
.text {
    padding-bottom: 12px;
    margin-top: 0px;
}
</style>