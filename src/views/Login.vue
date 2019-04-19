<template>
    <div class="login">
        <h3>Sign In</h3>
        <input type="text" v-model="email" placeholder="Email"><br>
        <input type="password" v-model="password" placeholder="Password"><br>
        <button @click="login">Sign In</button>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'login',
    data(){
        return {
            email: '',
            password: ''
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
                    alert('You have now signed in')
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


