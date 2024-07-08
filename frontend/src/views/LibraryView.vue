<template>
    <h1 class="title">Bibliothek</h1>

    <h2>Lieblingsspiel</h2>
    
    <div class="fav-game" v-if="favoriteGame">
        <GameListItem
            :gamelogo="favoriteGame.gamelogo"
            :name="favoriteGame.name"
            :gameID="favoriteGame.gameID"
            :tags="favoriteGame.tags"
            :rating="favoriteGame.rating">
        </GameListItem>
    </div>
    <div v-else-if="isLoading">
        <p>Lade Lieblingsspiel...</p>
    </div>
    <div v-else>
        <p>Kein Lieblingsspiel ausgewählt oder nicht eingeloggt</p>
    </div>
</template>

<script>
import GameListItem from '@/components/GameListItem.vue';

export default {
    name: 'LibraryView',
    components: {
        GameListItem
    },
    data() {
        return {
            favoriteGame: null,
            isLoading: true
        }
    },
    methods: {
        async fetchFavoriteGame() {
            const token = localStorage.getItem('token');
            const userID = this.getUserID();
            
            if (!token || !userID) {
                console.error('Benutzer ist nicht eingeloggt');
                this.isLoading = false;
                return;
            }

            try {
                const userResponse = await fetch(`http://localhost:3000/users/${userID}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!userResponse.ok) {
                    throw new Error('Netzwerkantwort war nicht ok');
                }
                const userData = await userResponse.json();
                
                if (userData.favgame) {
                    const gameResponse = await fetch(`http://localhost:3000/games/${userData.favgame}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (!gameResponse.ok) {
                        throw new Error('Netzwerkantwort war nicht ok');
                    }
                    this.favoriteGame = await gameResponse.json();
                }
            } catch (error) {
                console.error('Fehler beim Abrufen des Lieblingsspiels:', error);
            } finally {
                this.isLoading = false;
            }
        },
        getUserID() {
            const user = localStorage.getItem('user');
            return user ? JSON.parse(user)['userID'] : null;
        }
    },
    mounted() {
        this.fetchFavoriteGame();
    }
}
</script>

<style scoped>
body {
    overflow-y: scroll;
}
h1.title {
    font-family: sans-serif;
    font-size: 50px;
    text-align: center;
}
.fav-game {
    margin-right: 35%;
    margin-left: 35%;
}
</style>