<template>
    <div class="scout-home">
        <h3>Welcome Scout.</h3>
        <v-btn @click="logout">Logout</v-btn>
    </div>
    
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'ScoutHome',
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
