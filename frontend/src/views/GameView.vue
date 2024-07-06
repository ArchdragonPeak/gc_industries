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
        <p>{{ game.description }}</p>
      </div>
    </div>
    <hr style="width: 80%">
    <div class="comments">
      <div class="comments-text">
        <h2 style="text-align: center">Kommentare</h2>
        <WriteCommentItem @add-comment="fetchComments"></WriteCommentItem>
        <CommentItem v-for="comment in comments"
          :key="comment.commentID"
          :comment="comment"
          @delete-comment="fetchComments"
          >
        </CommentItem>
      </div>
    </div>
  </div>

</template>

<script>
import CommentItem from '@/components/CommentItem.vue';
import WriteCommentItem from '@/components/WriteCommentItem.vue';

export default {
  name: 'GameView',
  components: {
    CommentItem,
    WriteCommentItem
  },
  data() {
    return {
      game: {
        type: Object,
        required: true,
      },
      comments: []
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
        this.game = data.game;
        console.log(this.game);
      } catch (error) {
        console.error('Spiel konnte nicht abgerufen werden. Fetch-Operation:', error);
      }
    },
    async fetchComments() {
      try {
        const response = await fetch(`http://localhost:3000/comments/${this.gameID}`);
        if (!response.ok) {
          throw new Error('Netzwerkantwort war nicht ok');
        }
        const data = await response.json();
        this.comments = data;
        console.log(this.comments);
      } catch (error) {
        console.error('Kommentare konnten nicht abgerufen werden. Fetch-Operation:', error);
      }
    },
    async addComment(userID, message) {
      try {
        const response = await fetch(`http://localhost:3000/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            gameID: this.gameID,
            userID: userID,
            date: new Date(),
            text: message
          })
        });
        if (!response.ok) {
          throw new Error('Netzwerkantwort war nicht ok');
        }
        this.fetchComments(); // Refresh comments after adding a new one
      } catch (error) {
        console.error('Es gab ein Problem mit der Fetch-Operation:', error);
      }
    }
  },
  mounted() {
    this.fetchGame();
    this.fetchComments();
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