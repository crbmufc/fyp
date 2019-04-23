<template>
    <header>
        <router-link to="/">
            <img src="../assets/logo-white.png" class="site-logo">
            <p class="logo-text">NEXTGEN SCOUT</p>
        </router-link>
    </header>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style scoped>
    header {
        background-color: grey;
    }

    header a {
        text-decoration: none;
    }

    .site-logo {
        width: 100px;
        padding: 10px 0 0;
    }

    .logo-text {
        color: white;
        margin-bottom: 5px;
    }
</style>
