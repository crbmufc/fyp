<template>
    <div class="player-home">
        <h3>Welcome Player.</h3>
        <button @click="logout">Logout</button>
    </div>
    
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'PlayerHome',
    components: {
    },
    methods: {
        logout: function()
        {
        firebase.auth().signOut().then(() => {
            this.$router.replace('home')
        })
        }
    }
}
</script>

<style scoped>

</style>
