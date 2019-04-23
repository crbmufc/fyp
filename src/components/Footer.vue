<template>
    <footer>
        <p id="footer-copyright">NextGen Scout&copy; {{year}}</p>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
    created() {
        this.getYear()
    },
    data() {
        return {
            year: ''
        }
    },
    
    methods: {
        getYear() {
            this.year = new Date().getFullYear();
        }
    },
}
</script>

<style scoped>
footer {
    width: 100%;
    bottom: 0;
    margin-bottom: 60px;
    background: #363636;
    clear: both;
}

#footer-copyright {
    padding: 1rem;
    font-weight: 100;
    color: white;
    text-align: center;
    margin-bottom: 5px;
}
</style>
