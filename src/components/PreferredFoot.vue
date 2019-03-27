<template>
  <div class="preferred-foot">
    <div class="player-preferred-foot">
        <select v-model="selectedFoot" @change="onChange()">
            <option :id="preferredFoot.preferredFootId" v-for="preferredFoot in preferredFoots" v-bind:value="{ text: preferredFoot.preferredFootValue, id: preferredFoot.preferredFootId }">{{preferredFoot.preferredFootValue}}</option>
        </select>
    </div>
  </div>
</template>

<script>
export default {
    name: 'PreferredFoot',
    props: ['selectedFoot.id, selectedFoot.text'],

    data: function(){
        return {
            selectedFoot: '',
            preferredFoots: [
                {
                    preferredFootId: 'right',
                    preferredFootValue: 'Right'
                },
                {
                    preferredFootId: 'left',
                    preferredFootValue: 'Left'
                },
                {
                    preferredFootId: 'eitherFoot',
                    preferredFootValue: 'Either Foot'
                }              
            ]}
    },
    methods: {
        onChange(event) {
            this.$emit('selected', this.selectedFoot.text)
        }
    },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
