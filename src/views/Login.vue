<template>
    <div class="login">
        <h3>Sign In</h3>
        <input type="email" v-model="email" placeholder="Email"><br>
        <input type="password" v-model="password" placeholder="Password"><br>
        <v-btn @click="login">Sign In</v-btn>
        <p>{{errMessage}}</p>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'login',
    data(){
        return {
            email: '',
            password: '',
            errMessage: '',
            alert: false
        };
    },
    methods: {
        login: function()
        {
            //Code from firebase docs https://firebase.google.com/docs/auth/web/password-auth
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                (user) => {
                    this.$router.replace('home')
                },
                (err) => {
                    this.alert = true;
                    this.errMessage = 'The email and password that you entered does not match our records. Please double-check and try again'
                }
            );
        }
    }
}
</script>

<style scoped>
    .login {
        margin-top: 40px;
    }

    input {
        margin: 10px 0;
    }

    button {
        margin-top: 20px;
        width: 10%;
        cursor: pointer;
    }

    p {
        margin-top: 40px;
        font-size: 13px;
    }

    p a {
        text-decoration: underline;
        cursor: pointer;
    }
</style>


