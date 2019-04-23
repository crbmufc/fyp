<template>
  <div class="home">
    <div class="home-hero">
      <h1>CHANGING THE GAME</h1>
      <p>NextGen Scout gives players an opportunity to be scouted and gives clubs a larger scouting network than ever before.</p>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import firebase from 'firebase'
// @ is an alias to /src

import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods: {
  }
}
</script>
