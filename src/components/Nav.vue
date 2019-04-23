<template>
    <div id="no-user-nav" class="nav nav-3" v-if="!playerLoggedIn">
        <ul>
            <li><router-link to="/home"><v-icon>home</v-icon>HOME</router-link></li> <!--v-icon from material design https://material.io/tools/icons/?style=baseline-->
            <li><router-link to="/login"><v-icon>input</v-icon>LOGIN</router-link></li> <!--v-icon from material design https://material.io/tools/icons/?style=baseline-->
            <li><router-link to="/sign-up"><v-icon>person_add</v-icon>SIGN UP</router-link></li> <!--v-icon from material design https://material.io/tools/icons/?style=baseline-->
        </ul>
    </div>
    <div id="scout-nav" class="nav nav-4" v-else-if="playerLoggedIn && role == 'scout'">
        <ul>
            <li><router-link to="/home"><v-icon>home</v-icon>HOME</router-link></li> <!--v-icon from material design-->
            <li><router-link v-if="role == 'scout'" to="/scout-home"><v-icon>assignment</v-icon>SCOUT AREA</router-link></li> <!--v-icon from material design https://material.io/tools/icons/?style=baseline-->
            <li><router-link v-if="role == 'scout'" to="/player-search"><v-icon>search</v-icon>PLAYER SEARCH</router-link></li> <!--v-icon from material design https://material.io/tools/icons/?style=baseline-->
            <li @click="logout"><router-link to="/"><v-icon>power_settings_new</v-icon>LOGOUT</router-link></li> <!--v-icon from material design https://material.io/tools/icons/?style=baseline-->
        </ul>
    </div>
    <div id="player-nav" class="nav nav-3" v-else-if="playerLoggedIn && role == 'player'">
        <ul>
            <li><router-link to="/home"><v-icon>home</v-icon>HOME</router-link></li> <!--v-icon from material design https://material.io/tools/icons/?style=baseline-->
            <li><router-link v-if="role == 'player'" to="/player-home"><v-icon>person</v-icon>PLAYER AREA</router-link></li> <!--v-icon from material design https://material.io/tools/icons/?style=baseline-->
            <li @click="logout"><router-link to="/"><v-icon>power_settings_new</v-icon>LOGOUT</router-link></li> <!--v-icon from material design https://material.io/tools/icons/?style=baseline-->
        </ul>
    </div>
</template>

<script>
import firebase from 'firebase'
import {database} from '../main'

export default {
    name: 'Nav',
    created() {
        this.checkRole()
    },
    data() {
        return {
            notLoggedIn: false,
            playerLoggedIn: false,
            role:''
        }

    },

    methods: {
        checkRole()
        {
            let self = this
            firebase.auth().onAuthStateChanged(function(user){
                if(user) {
                    var userId = firebase.auth().currentUser.uid 
                    console.log(userId)
                    let loggedIn = true
                    self.playerLoggedIn = loggedIn;
                    console.log('logged in')

                    firebase.database().ref().child('Players').orderByKey().equalTo(userId).once('value', function(snapshot){
                        console.log(snapshot.val())

                        if(snapshot.val()){
                            self.role = 'player'
                            console.log('player')
                        }
                        else{
                            self.role = 'scout'
                            console.log('scout')
                        }
                    })

                } else {
                    let loggedIn = false
                    self.playerLoggedIn = loggedIn;
                }

            })
        },
        logout: function(){
            firebase.auth().signOut().then(() => {
                this.$router.replace('home')
            })
        }
        
    }
}

</script>

<style scoped>
.nav {
  /* padding: 30px; */
    position: fixed;
    left: 0;
    bottom: 0;
    overflow: hidden;
    z-index: 1000;
    width: 100%;
    background-color: grey;
}

.nav ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    overflow: hidden;
}

.nav-3 li{
    width: 33%;
    padding: 10px 0;
    float: left;
}

.nav-4 li{
    width: 25%;
    padding: 10px 0;
    float: left;
}

.nav a {
  color: #2c3e50;
  text-decoration: none;
  font-size: 10px;
  font-weight: bold;
}

.nav i {
    width: 100%;
}

.nav .router-link-exact-active {
  color: #42b983;
}

.nav i.router-link-exact-active {
  color: #42b983;
}


</style>

