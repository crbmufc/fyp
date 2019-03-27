<template>
  <div class="traits">
    <div class="player-traits" v-for="trait in traits">
        {{trait.traitValue}} <input type="checkbox" :id="trait.traitId" v-model="checkedTraits" v-bind:value="trait.traitId" @click="checked($event)">
    </div>
  </div>
</template>

<script>
export default {
    name: 'PlayerTraits',
    data: function(){
        return {
            checkedTraits: [],
            checkedTraitsArray: [],
            traits: [
            {
                traitId: 'crosser',
                traitValue: 'Crosser'
            },
            {
                traitId: 'dribbler',
                traitValue: 'Dribbler'
            },
            {
                traitId: 'finisher',
                traitValue: 'Finisher'
            },
            {
                traitId: 'heading',
                traitValue: 'Heading'
            },
            {
                traitId: 'leader',
                traitValue: 'Leader'
            },
            {
                traitId: 'longShots',
                traitValue: 'Long Shots'
            },
            {
                traitId: 'longThrow',
                traitValue: 'Long Throw'
            },
            {
                traitId: 'penaltyTaker',
                traitValue: 'Penalty Taker'
            },
            {
                traitId: 'playmaker',
                traitValue: 'Playmaker'
            },
            {
                traitId: 'setPieces',
                traitValue: 'Set Pieces'
            },
            {
                traitId: 'speedster',
                traitValue: 'Speedster'
            },
            {
                traitId: 'strength',
                traitValue: 'Strength'
            },
            {
                traitId: 'workhorse',
                traitValue: 'Workhorse'
            }]
        }  
    },
    methods: {
        checked: function(e) {

            // console.log('hello world')
            var checkedTraitValue = e.target.value;
            // console.log(checkedPositionValue);
            if (e.target.checked) {
                this.checkedTraitsArray.push(checkedTraitValue)
                // console.log(this.checkedPositionsArray)
                this.$emit('checked', this.checkedTraitsArray)
            }
            else {
                for (var i = 0; i < this.checkedTraitsArray.length; i++) {
                    if(checkedTraitValue == this.checkedTraitsArray[i]){
                        this.checkedTraitsArray.pop(checkedTraitValue);
                    }
                    
                }
            }
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.traits {
    padding: 5px;
    border: 1px solid grey;
}

</style>
