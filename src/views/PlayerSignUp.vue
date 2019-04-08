<template>
    <div class="player-sign-up">
        <h3>Create Player Account</h3>

        <!-- <label>First Name</label> -->
        <v-text-field type="text" v-model="firstname"  label="First Name" placeholder="Please enter your first name"></v-text-field>

        <v-text-field type="text" v-model="lastname" label="Last Name" placeholder="Please enter your last name"></v-text-field>

        <label>Date of Birth</label>
        <input type="date" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" placeholder="DD/MM/YYYY" v-model="dob"><br>

        <v-text-field type="email" v-model="email" label="Email" placeholder="please enter your email address"></v-text-field>

        <v-text-field type="password" v-model="password" label="Password" placeholder="please enter a password"></v-text-field>

        <label>County</label>
        <Counties @selected="selectedCountyItem"></Counties><br>

        <v-text-field type="text" v-model="currentclub" label="Current Club" placeholder="please enter your current club"></v-text-field>

        <label>Preferred Foot</label>
        <PreferredFoot @selected="selectedFootItem"></PreferredFoot><br>

        <label>Playing Experience</label>
        <PlayingExperience @selected="selectedExperienceItem"></PlayingExperience><br>

        <div class="positions">
            <h3>Please select the positions you are able to play in.</h3>
            <PlayerPositions @checked="checkedPositionItems"></PlayerPositions>
        </div>
        <div class="traits">
            <h3>Please select your player traits.</h3>
            <PlayerTraits @checked="checkedTraitItems"></PlayerTraits>
        </div>
        <v-btn @click="playerSignUp">Create Account</v-btn>
    </div>
</template>

<script>
import firebase from 'firebase'
import {database} from '../main'
import PlayerPositions from '@/components/PlayerPositions.vue'
import PlayerTraits from '@/components/PlayerTraits.vue'
import Counties from '@/components/Counties.vue'
import PreferredFoot from '@/components/PreferredFoot.vue'
import PlayingExperience from '@/components/PlayingExperience.vue'

export default {
    name: 'playerSignUp',
    components: {
        PlayerPositions,
        PlayerTraits,
        Counties,
        PreferredFoot,
        PlayingExperience
    },
    data(){
        return{
            firstname: '',
            lastname: '',
            email: '',
            dob: '',
            selectedCounty: '',
            currentclub: '',
            password: '',
            role: 'player',
            selectedExperience: '',
            selectedFoot: '',
            checkedPositions: {},
            positionsObj: {},
            checkedTraits: {},
            traitsObj: {}
        };
    },
    methods: {
        selectedExperienceItem: function(value) {
            this.selectedExperience = value;
        },
        selectedCountyItem: function(value) {
            this.selectedCounty = value; 
        },
        selectedFootItem: function(value) {
            this.selectedFoot = value; 
        },
        checkedPositionItems: function(value) {
            this.checkedPositionsArray = value
            var positionArray = this.checkedPositionsArray
            var positionsObj = {};

            for (var i = 0; i < positionArray.length; i++) {
                positionsObj[positionArray[i]] = true
            }
            this.positionsObj = positionsObj
        },
        checkedTraitItems: function(value) {
            this.checkedTraitsArray = value
            var traitArray = this.checkedTraitsArray
            var traitsObj = {}

            for (var i = 0; i < traitArray.length; i++) {
                traitsObj[traitArray[i]] = true
            }
            this.traitsObj = traitsObj
        },
        playerSignUp: function(){

            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                (user) => {
                    
                    var userId = firebase.auth().currentUser.uid;
                    var playersRef = database.ref('Players/' + userId)

                    var firstName = this.firstname;
                    var lastName = this.lastname;
                    var email = this.email;
                    var currentClub = this.currentclub;
                    var dob = this.dob;
                    var birthday = Date.parse(dob)
                    var age = ~~((Date.now() - birthday) / (31557600000))
                    var role = this.role;
                    var selectedExperience = this.selectedExperience;
                    var selectedCounty = this.selectedCounty;
                    var selectedFoot = this.selectedFoot;
                    var checkedPositions = this.checkedPositionsArray;
                    var checkedTraits = this.checkedTraitsArray;

                    playersRef.set({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        dob: dob,
                        age: age,
                        role: role,
                        playingExperience: selectedExperience,
                        currentClub: currentClub,
                        county: selectedCounty,
                        preferredFoot: selectedFoot,
                        positions: this.positionsObj,
                        traits: this.traitsObj
                    });

                    this.$router.replace('player-home')
                },
                (err) => {
                    alert('You have now signed in')
                }
            );
        }

    }
}
</script>

<style scoped>

    .player-sign-up {
        margin-top: 40px;
    }
    input {
        margin: 10px 0;
        width: 20%;
        padding: 15px;
    }
    button {
        margin-top: 10px;
        width: 10%;
        cursor: pointer;
    }
</style>


