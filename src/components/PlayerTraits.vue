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
                traitId: 'Crosser',
                traitValue: 'Crosser'
            },
            {
                traitId: 'Dribbler',
                traitValue: 'Dribbler'
            },
            {
                traitId: 'Finisher',
                traitValue: 'Finisher'
            },
            {
                traitId: 'Heading',
                traitValue: 'Heading'
            },
            {
                traitId: 'Leader',
                traitValue: 'Leader'
            },
            {
                traitId: 'Long-Shots',
                traitValue: 'Long Shots'
            },
            {
                traitId: 'Long-Throw',
                traitValue: 'Long Throw'
            },
            {
                traitId: 'Penalty-Taker',
                traitValue: 'Penalty Taker'
            },
            {
                traitId: 'Playmaker',
                traitValue: 'Playmaker'
            },
            {
                traitId: 'Set-Pieces',
                traitValue: 'Set Pieces'
            },
            {
                traitId: 'Speedster',
                traitValue: 'Speedster'
            },
            {
                traitId: 'Strength',
                traitValue: 'Strength'
            },
            {
                traitId: 'Workhorse',
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
