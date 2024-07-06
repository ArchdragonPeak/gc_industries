<template>
    <div class="commentitem">
        <div class="head">
            <div class="profile">
                <div class="profile-item">
                    <img :src="comment.userID?.profilepicture || '../img/gigachad_logo.png'" alt="Profilbild" height="32" width="32">
                </div>
                <div class="profile-item">
                    <p><b>{{ comment.userID?.username || 'Unbekannt' }}</b></p>
                </div>
                <div class="profile-item" id="date">
                    <p> {{ prettierDate }} </p>
                </div>
                <div class="deleteButton-wrapper" v-if="true">
                    <button class="deleteButton" @click="deleteComment()">löschen</button>
                </div>
            </div>
        </div>

        <div class="body">
            <div class="text-wrapper">
                <p class="text"> {{ comment.text }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CommentItem',
    props: {
        comment: Object,
        isAdmin: Boolean
    },
    data() {
        return {
            dateOptions: { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }
        }
    },
    methods: {
        async deleteComment() {
            try {
                const response = await fetch(`http://localhost:3000/games/${this.$parent.gameID}/comments/${this.comment.commentID}`, {
                    method: 'DELETE'
                });
                if (!response.ok) {
                    throw new Error('Netzwerkantwort war nicht ok');
                }
                this.$emit('delete-comment'); // Emit an event to refresh comments in the parent component
            } catch (error) {
                console.error('Es gab ein Problem mit der Fetch-Operation:', error);
            }
        }
    },
    computed: {
        prettierDate() {
            if (!this.comment.date) {
                return 'Datum nicht verfügbar';
            }
            const date = new Date(this.comment.date);
            return date.toLocaleDateString("de-DE", this.dateOptions);
        }
    }
}
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
</style>