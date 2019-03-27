<template>
  <div class="playing-experience">
    <div class="player-playing-experience">
        <select v-model="selectedExperience" @change="onChange()">
            <option :id="playingExperience.playingExperienceId" v-for="playingExperience in playingExperiences" v-bind:value="{ text: playingExperience.playingExperienceValue, id: playingExperience.playingExperienceId }">{{playingExperience.playingExperienceValue}}</option>
        </select>
    </div>
  </div>
</template>

<script>
export default {
    name: 'PlayingExperience',
    props: ['selectedExperience.id, selectedExperience.text'],

    data: function(){
        return{
            selectedExperience: '',
            playingExperiences: [
            {
                playingExperienceId: 'amateur',
                playingExperienceValue: 'Amateur'
            },
            {
                playingExperienceId: 'academy',
                playingExperienceValue: 'Academy'
            },
            {
                playingExperienceId: 'semiProfessional',
                playingExperienceValue: 'Semi Professional'
            },              
            {
                playingExperienceId: 'professional',
                playingExperienceValue: 'Professional'
            }            
        ]}
    },
    methods: {
        onChange(event) {
            this.$emit('selected', this.selectedExperience.text)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
