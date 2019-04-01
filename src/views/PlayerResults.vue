<template>
<div class="player-results-page">
    <v-card class="player-results-card" hover v-for="(player, key) in players" :key="key">
        <!-- <div class="player-results-card-header orange"> -->
        <v-subheader class="orange">
            <v-card-title primary-title class="player-results-card-title">
                <h2>{{player.firstName + ' ' + player.lastName}}</h2>
            </v-card-title>
        </v-subheader>
        <!-- </div> -->
        <div class="card-data">
            <v-card-title>
                <h3>Age</h3>
            </v-card-title>
            <v-card-text>{{player.age}}</v-card-text>
        </div>
        <div class="card-data">
            <v-card-title>
                <h3>Playing Experience</h3>
            </v-card-title>
            <v-card-text>{{player.playingExperience}}</v-card-text>
        </div>
        <div class="card-data">
            <v-card-title>
                <h3>County</h3>
            </v-card-title>
            <v-card-text>{{player.county}}</v-card-text>
        </div>
        <div class="card-data">
            <v-card-title>
                <h3>Positions</h3>
            </v-card-title>
            <div v-for="(value,position) in player.positions" :key="position">
                <v-card-text>{{position.replace('-', ' ')}}</v-card-text>
            </div>
        </div>
        <div class="card-data">
            <v-card-title>
                <h3>Traits</h3>
            </v-card-title>
            <div v-for="(value,trait) in player.traits" :key="trait">
                <v-card-text>{{trait.replace('-', ' ')}}</v-card-text>
            </div>
        </div>
        <div class="card-data">
            <v-card-title>
                <h3>Preferred Foot</h3>
            </v-card-title>
            <v-card-text>{{player.preferredFoot}}</v-card-text>
        </div>
        <v-btn depressed class="orange white--text">Add To Watch List</v-btn>
    </v-card>
</div>
</template>
<script>
import firebase from 'firebase'
import {database} from '../main'
// import {players} from '../main'

export default {
    name: 'PlayerResults',
    created()
    {
        this.getPlayers()
    },
    data() {
        return{
            players:{

            },
            positions: {

            }
        }
    },
    methods: {
        async getPlayers(){
           var players = database.ref('/Players').on('value', this.logPlayers) 
           
        },
        
        async logPlayers(snapshot){
            var playerSnap = snapshot.val();
            this.players = playerSnap;
        }
    }
}
</script>

<style scoped>

.player-results-card {
    cursor:default;
    margin:5%;
}

.v-subheader {
    height: auto;
}

.player-results-card-title {
    color: white;
    padding-left: 0;
}

.v-btn__content {
    color: white;
}
</style>
