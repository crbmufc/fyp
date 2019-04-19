<template>
    <div class="scout-sign-up">
        <h3>Create Scout Account</h3>
        <v-form @submit="scoutSignUp" method="post">
            <v-text-field type="text" v-model="firstname" placeholder="First Name" required></v-text-field>
            <v-text-field type="text" v-model="lastname" placeholder="Last Name" required></v-text-field>
            <v-text-field type="text" v-model="clubname" placeholder="Club Name" required></v-text-field>
            <v-text-field type="text" v-model="email" placeholder="Email" required></v-text-field>
            <v-text-field type="password" v-model="password" placeholder="Password" required></v-text-field>
            <v-btn @click="scoutSignUp">Create Account</v-btn>
        </v-form>
    </div>
</template>

<script>
import firebase from 'firebase'
import {database} from '../main'

export default {
    name: 'scoutSignUp',
    data(){
        return{
            firstname: '',
            lastname: '',
            clubname: '',
            email: '',
            password: '',
            role: 'scout'
        };
    },
    methods: {
        scoutSignUp: function(){
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                (user) => {
                    
                    var userId = firebase.auth().currentUser.uid;
                    var firstName = this.firstname;
                    var lastName = this.lastname;
                    var email = this.email;
                    var clubName = this.clubname;
                    var role = this.role;

                    database.ref('Scouts/' + userId).set({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        clubName: clubName,
                        role: role
                    });
                    this.$router.replace('scout-home')
                },
                (err) => {
                    alert('There was an error signing you up, please try again')
                }
            );
        },

    }
}
</script>

<style scoped>
    .scout-sign-up {
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


