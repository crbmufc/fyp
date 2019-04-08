<template>
  <div class="positions">
    <li class="player-positions" v-for="position in positions">
        {{position.positionValue}} <input type="checkbox" :id="position.positionId" v-model="checkedPositions" v-bind:value="position.positionId" @click="checked($event)">
    </li>
  </div>
</template>

<script>
export default {
    name: 'PlayerPositions',
    data: function(){

        return{
            checkedPositions: [],
            checkedPositionsArray: [],
            positions: [
            {
                positionId: 'Goalkeeper',
                positionValue: 'Goalkeeper'
            },
            {
                positionId: 'Right_Back',
                positionValue: 'Right Back'
            },
            {
                positionId: 'Left_Back',
                positionValue: 'Left Back'
            },
            {
                positionId: 'Centre_Back',
                positionValue: 'Centre Back'
            },
            {
                positionId: 'Defensive_Midifield',
                positionValue: 'Defensive Midfield'
            },
            {
                positionId: 'Centre_Midfield',
                positionValue: 'Centre Midfield'
            },
            {
                positionId: 'Attacking_Midfield',
                positionValue: 'Attacking Midfield'
            },
            {
                positionId: 'Right_Wing',
                positionValue: 'Right Wing'
            },
            {
                positionId: 'Left_Wing',
                positionValue: 'Left Wing'
            },
            {
                positionId: 'Striker',
                positionValue: 'Striker'
            }]
        }
    },
    methods: {
        checked: function(e) {

            var checkedPositionValue = e.target.value;
            if (e.target.checked) {
                this.checkedPositionsArray.push(checkedPositionValue)
                this.$emit('checked', this.checkedPositionsArray)
            }
            else {
                for (var i = 0; i < this.checkedPositionsArray.length; i++) {
                    if(checkedPositionValue == this.checkedPositionsArray[i]){
                        this.checkedPositionsArray.pop(checkedPositionValue);
                    }
                    
                }
            }
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.positions {
    padding: 5px;
    border: 1px solid grey;
}

li {
    list-style: none;
}
</style>
