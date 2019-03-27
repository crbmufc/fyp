<template>
    <div class="player-sign-up">
        <h3>Create Player Account</h3>

        <label>First Name</label>
        <input type="text" v-model="firstname" placeholder="Please enter your first name"><br>

        <label>Last Name</label>
        <input type="text" v-model="lastname" placeholder="Please enter your last name"><br>

        <label>Date of Birth</label>
        <input type="date" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" v-model="dob"><br>

        <label>Email</label>
        <input type="text" v-model="email" placeholder="please enter your email address"><br>

        <label>Password</label>
        <input type="password" v-model="password" placeholder="please enter a password"><br>

        <label>County</label>
        <Counties @selected="selectedCountyItem"></Counties><br>

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
        <button @click="playerSignUp">Create Account</button>
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
            password: '',
            role: 'player',
            selectedExperience: '',
            selectedFoot: '',
            checkedPositions: {},
            positionsObj: {},
            checkedTraits: [],
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
                    var dob = this.dob;
                    var birthday = Date.parse(dob)
                    var age = ~~((Date.now() - birthday) / (31557600000))
                    var role = this.role;
                    var selectedExperience = this.selectedExperience;
                    var selectedCounty = this.selectedCounty;
                    var selectedFoot = this.selectedFoot;
                    var checkedPositions = this.checkedPositionsArray;

                    playersRef.set({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        dob: dob,
                        age: age,
                        role: role,
                        playingExperience: selectedExperience,
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


