<template>
    <div class="commentitem">
        <div class="head">
            <div class="profile">
                <div class="profile-item">
                    <img :src="comment.user?.profilepicture || '../img/gigachad_logo.png'" alt="HILFE" height="32" width="32">
                </div>
                <div class="profile-item">
                    <p><b>{{ comment.user?.username || 'Unbekannt' }}</b></p>
                </div>
                <div class="profile-item" id="date">
                    <p>{{ prettierDate }}</p>
                </div>
                <div class="profile-item" id="rating">
                    <p>{{ comment.rating ? displayStars(comment.rating) : 'Keine Bewertung' }}</p>                </div>
                <div class="deleteButton-wrapper" v-if="getUserID">
                    <button class="deleteButton" @click="deleteComment">löschen</button>
                </div>
            </div>
        </div>

        <div class="body">
            <div class="text-wrapper">
                <p class="text">{{ comment.text }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CommentItem',
    props: {
        comment: Object, // sollte vom GameView ein funktionierendes Kommentar-Objekt bekommen
        isAdmin: true // bisschen witzig ist es schon...
    },
    data() {
        return {
            dateOptions: { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" } // macht Datum-Objekt zu: 'dd.mm.yyyy, hh:mm:ss' weils stabil aussieht
        };
    },
    methods: {
        async deleteComment() {
            try {
                const token = localStorage.getItem('token'); // Retrieve the token from local storage
                const response = await fetch(`http://localhost:3000/comments/${this.comment.commentID}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Netzwerkantwort war nicht ok');
                }
                console.log("CommentItem: Dieser Kommentar wurde gelöscht:", this.comment)
                this.$emit('delete-comment'); // Emit an event to refresh comments in the parent component
            } catch (error) {
                console.error('Es gab ein Problem mit der Fetch-Operation:', error);
            }
        },
        displayStars(rating) {
        console.log('Rating:', rating);
        let stars = '';
        for (let i = 0; i < rating; i++) {
            stars += '★';
        }
        for (let i = rating; i < 5; i++) {
            stars += '☆';
        }
        return stars;
    }

    },
    computed: {
        prettierDate() {
            if (!this.comment.date) {
                return 'Datum nicht verfügbar';
            }
            const date = new Date(this.comment.date);
            return date.toLocaleDateString("de-DE", this.dateOptions); // hier werden Datum-Objekte gekocht. Für Optionen oben schauen
        },
        getUserID() {
            const user = localStorage.getItem('user');
            return user ? JSON.parse(user)['userID'] : false;
        }
    }
};
</script>

<style scoped>

.deleteButton-wrapper {
    float: right;
    font-size: 12px;
    font-family: sans-serif;
}
.deleteButton {
    font-size: 16px;
    border-radius: 5px;
    border-width: 1px;
    margin: 5px 5px 5px 5px;
}
.deleteButton:active {
    background-color: darkgray;
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
#rating {
    color: gold;
    text-shadow: 1px 1px 0 #000, 1px 1px 0 #000, 1px 1px 0 #000, 1px 1px 0 #000;
    padding-left: 1%;
}
</style>