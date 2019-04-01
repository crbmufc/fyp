<template>
    <div class="sign-up-page">
        <div class="sign-up-as-player">
            <h3>Sign Up As a Player.</h3>
            <p>Sign up for a player account to get discovered by your next club!</p>
            <v-btn to="/player-sign-up">Sign up</v-btn>
        </div>
        <div class="sign-up-as-scout">
            <h3>Sign Up As a Scout.</h3>
            <p>Sign up for a scouting account to discover the talent your club is missing!</p>
            <v-btn to="/scout-sign-up">Sign up</v-btn>
        </div>
    </div>
    
</template>

<script>
export default {
    
}
</script>

<style scoped>

.sign-up-button {
    cursor:pointer;
}

</style>
