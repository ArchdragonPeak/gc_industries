<template>
    <h1 class="title">{{ game.name }}</h1>

    <div class="game-wrapper">
        <div class="left"></div>
        
        <div class="main">
            <img src="../../public/img/test_game.jpg" height="700" width="1200">
        </div>
        
        <div class="right">Spielanleitung</div>
        
    </div>

    <div class="info-wrapper">
      <hr style="width: 80%">
      <div class="description">
        <div class="description-text">
          <p><b>Beschreibung:</b></p>
          <p>Dies ist eine Testbeschreibung. Hier wird zum Beispiel eine kleine Einführunggeschichte
            erzählt. Der Name des Spiels gennant und solche lustigen Sachen.  
          </p>
        </div>
      </div>
      <hr style="width: 80%">
      <div class="comments">
        <div class="comments-text">
          <h2 style="text-align: center">Kommentare</h2>
          <WriteCommentItem></WriteCommentItem>
          <CommentItem v-for="comment in comments.slice().reverse()"
            :key="comment.commentID"
            :userID="comment.userID"
            :username="comment.username"
            :date="comment.date"
            :message="comment.message"
            >
          </CommentItem>
        </div>
      </div>
    </div>
  
</template>

<script>
import CommentItem from '@/components/CommentItem.vue';
import WriteCommentItem from '@/components/WriteCommentItem.vue';

export default{
    name: 'GameView',
    components: {
      CommentItem,
      WriteCommentItem
    },
    props: {
    },
    data() {
      return {
        game: {
          type: {},
          required: true,
        },
        comments: [
        {
          commentID: 1,
          userID: "2",
          username: "Linux",
          date: new Date(Date.parse("2024-02-05:11:44")).toLocaleString("de-DE"),
          message: "Wow das ist ein tolles Spiel ich bin süchtig"
        },
        {
          commentID: 2,
          userID: "2",
          username: "Kevin",
          date: new Date(Date.parse("2024-02-06:18:12")).toLocaleString("de-DE"),
          message: "Ich sterbe die ganze Zeit menno"
        },
        {
          commentID: 3,
          userID: "5",
          username: "Luan",
          date: new Date(Date.parse("2024-02-06:22:51")).toLocaleString("de-DE"),
          message: "Wer das ließt ist krass"
        },
        ]
      };
    },
    computed: {
      gameID() {
        return this.$route.params.id;
      }
    },
    methods: {
      async fetchGame() {
        try {
          const response = await fetch(`http://localhost:3000/games/${this.gameID}`);
          if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok');
          }
          const data = await response.json();
          this.game = data;
          console.log(this.game);
        } catch (error) {
          console.error('Es gab ein Problem mit der Fetch-Operation:', error);
          }
        },
      addComment(userID, username, message) {
        this.comments.push(
            {
            commentID: (this.comments.length+1),
            userID: userID,
            username: username,
            date: new Date().toLocaleString("de-DE"),
            message: message
            }
        )
      }
    },
    mounted() {
      this.fetchGame();
    }
}
</script>

<style scoped>
.description {
  width: 100%;
  border-radius: 12px;
  background-color: gainsboro;
  text-align: left;
}
.comments {
  width: 100%;
  border-radius: 12px;
  background-color: gainsboro;
  text-align: left;
}
.comments-text {
  font-size: 18px;
  padding: 1% 3% 3% 3%;
}
.description-text {
  font-size: 18px;
  padding: 1% 3% 3% 3%;
}
body {
    overflow-y: scroll;
}
h1.title {
    font-family: sans-serif;
    font-size: 50px;
    text-align: center;
}
.game-wrapper {
    height: 800px;
    text-align: center;
    font-size: 40px;
    font-family: sans-serif;
}
div.info-wrapper {
    margin-left: 25%;
    margin-right: 25%;
    text-align: center;
    font-family: sans-serif;
}
div.left {
    float: left;
    width: 25%;
    background-color: whitesmoke;
    height: 100%

}
div.right {
    float: left;
    width: 25%;
    background-color: whitesmoke;
    height: 100%
}
div.main {
    float: left;
    width: 50%;
    background-color: gainsboro;
    height: 100%;
    align-content: center;
    border-radius: 12px;
}
</style>