<template>
    <div class="scout-home">
        <h3>Welcome Scout.</h3>
        <button @click="logout">Logout</button>
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
