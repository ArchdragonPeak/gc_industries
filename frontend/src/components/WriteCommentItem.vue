<template>
    <div class="commentitem">
        <div class="head">
            <div class="profile">
                <div class="profile-item">
                    <img :src="profilepic || '../img/gigachad_logo.png'" alt="Profilbild" height="32" width="32">
                </div>
                <div class="profile-item">
                    <p><b>{{ username }}</b></p>
                </div>
                <div class="profile-item" id="date">
                    <p>{{ datum }}</p>
                </div>
                <div class="profile-item">
                    <p id="rating"><b>Bewertung:</b></p> 
                </div>
                <div class="profile-item">
                    <input class="rating-input" type="range" value="1" min="1" max="5" v-model="rating">
                    <output id="rating">{{ rating }}</output>
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
        userID: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            input: '',
            rating: 1, // initialisierte Bewertung
            dateOptions: { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" },
            username: JSON.parse(localStorage.getItem('user'))['username'] // WARNING: USER DESCRETION IS ADVICED lol
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
                const userID = localStorage.getItem('userID'); // Holen der userID aus dem localStorage, schlimm
                if (!userID) {
                    console.error('UserID ist nicht verfügbar');
                    return;
                }
                const token = localStorage.getItem('token');
                try {
                    const response = await fetch(`http://localhost:3000/comments`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            gameID: this.$parent.gameID,
                            userID: userID,
                            date: new Date(),
                            text: this.input,
                            rating: this.rating
                        })
                    });
                    if (!response.ok) {
                        throw new Error('Netzwerkantwort war nicht ok');
                    }
                    console.log("WriteCommentItem: Nachricht erfolgreich versandt:", this.input)
                    this.$emit('add-comment'); // Emit an event to refresh comments in the parent component
                    this.input = ''; // Macht das Eingabefeld leer
                    this.rating = 1; // Setze die Bewertung zurück
                } catch (error) {
                    console.error('Es gab ein Problem mit der Fetch-Operation:', error);
                }
            }
        },
        cancelMessage() {
            this.input = '';
            this.rating = 1; // Setze die Bewertung zurück
        }
    }
};
</script>

<style scoped>
.rating-input {
    margin-left: 10px;
    border-radius: 100%;
    width: 50px;
    height: 20px;
}
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
    vertical-align: middle;
}
#rating {
    color: gray;
    padding-left: 10px;
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