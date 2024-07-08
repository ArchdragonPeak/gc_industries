<template>
  <h1 class="title">{{ game.name || 'Spieltitel nicht gefunden ;(' }}</h1>
  <div class="rating">
    <p>Bewertung: {{ game.rating || '?' }}</p>
  </div>

  <div class="game-wrapper" @click="enableScrolling">
    <div class="left"></div>
    <div class="main" @click.stop="disableScrolling">
      <button v-if="!iframeLoaded" @click.stop="loadIframe">Spiel laden</button>
      <iframe
        v-if="iframeLoaded"
        ref="gameIframe"
        id="game-iframe"
        :src="game.source"
        width="1200"
        height="700"
        frameborder="0"
        @click.stop="disableScrolling"
      ></iframe>
    </div>
    <div class="right">
      <h3>Spielanleitung</h3>
      <p class="instruction">{{ game.instruction || 'Es wurde keine Spielanleitung hinterlegt. Dies könnte ein Serverfehler sein.' }}</p>
    </div>
  </div>

  <div class="info-wrapper" @click.stop="enableScrolling">
    <hr style="width: 80%">
    <div class="description">
      <div class="description-text">
        <div class="description-header">
          <p><b>Beschreibung:</b></p>
          <button id="fav-button"></button>
        </div>
        
        <p>{{ game.description || 'Es wurde keine Beschreibung hinterlegt. Dies könnte ein Serverfehler sein.' }}</p>
       
      </div>
    </div>
    <hr style="width: 80%">
    <div class="comments">
      <div class="comments-text">
        <h2 style="text-align: center">Kommentare</h2>
        <WriteCommentItem v-if="userID" @add-comment="fetchComments" :userID="userID"></WriteCommentItem>
        <CommentItem v-for="comment in comments"
          :key="comment.commentID"
          :comment="comment"
          @delete-comment="fetchComments"
        ></CommentItem>
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
      game: {},
      comments: [],
      userID: this.getUserID(),
      iframeLoaded: false
    };
  },
  computed: {
    gameID() {
      return this.$route.params.id; // holt die gameID ausm URL-Pfad raus
    },
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
        console.log('GameView hat Spiel geholt:', this.game);
      } catch (error) {
        console.error('Spiel konnte nicht abgerufen werden. Fetch-Operation:', error);
      }
    },
    async fetchComments() {
      try {
        const response = await fetch(`http://localhost:3000/comments/${this.gameID}`);
        if (!response.ok && response.status != 404) {
          throw new Error('Netzwerkantwort war nicht ok');
        }
        const data = await response.json();
        this.comments = data;
        console.log('GameView hat Kommentare geholt:', this.comments);
      } catch (error) {
        console.error('Kommentare konnten nicht abgerufen werden. Fetch-Operation:', error);
      }
    },
    getUserID() {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user)['userID'] : null;
    },
    loadIframe() {
      this.iframeLoaded = true;
      document.body.style.overflow = 'hidden';
    },
    disableScrolling() {
      document.body.style.overflow = 'hidden';
    },
    enableScrolling() {
      document.body.style.overflow = 'scroll';
    }
  },
  mounted() {
    this.fetchGame();
    this.fetchComments();
  },
  unmounted() {
    document.body.style.overflow = 'scroll';
  }
}
</script>

<style scoped>
.description-header {
  display: inline-block;
  display: inline-block;
  vertical-align: middle;
}
#fav-button {
  text-align: right;
  display: inline-block;
}
.rating {
  margin-top: 0px;
  margin-bottom: 5px;
  font-size: 14px;
}
.rating p{
  margin-top: 0px;
  margin-bottom: 0px;
  
}
.instruction {
  white-space: pre-line;
  font-size: 22px;
  text-align: left;
  margin-left: 5%;
  margin-right: 1%;
}
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