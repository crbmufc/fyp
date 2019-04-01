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
                positionId: 'Right-Back',
                positionValue: 'Right Back'
            },
            {
                positionId: 'Left-Back',
                positionValue: 'Left Back'
            },
            {
                positionId: 'Centre-Back',
                positionValue: 'Centre Back'
            },
            {
                positionId: 'Defensive-Midifield',
                positionValue: 'Defensive Midfield'
            },
            {
                positionId: 'Centre-Midfield',
                positionValue: 'Centre Midfield'
            },
            {
                positionId: 'Attacking-Midfield',
                positionValue: 'Atticking Midfield'
            },
            {
                positionId: 'Right-Wing',
                positionValue: 'Right Wing'
            },
            {
                positionId: 'Left-Wing',
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

            // console.log('hello world')
            var checkedPositionValue = e.target.value;
            // var checkedPositionsArray = [];
            // console.log(checkedPositionValue);
            if (e.target.checked) {
                this.checkedPositionsArray.push(checkedPositionValue)
                // console.log(this.checkedPositionsArray)
                this.$emit('checked', this.checkedPositionsArray)
            }
            else {
                for (var i = 0; i < this.checkedPositionsArray.length; i++) {
                    if(checkedPositionValue == this.checkedPositionsArray[i]){
                        this.checkedPositionsArray.pop(checkedPositionValue);
                    }
                    
                }
            }
            // console.log(this.checkedPositionsArray);
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
