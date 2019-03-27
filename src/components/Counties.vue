<template>
  <div class="counties">
    <div class="player-county">
        <select v-model="selectedCounty" @change="onChange()">
            <option :id="county.countyId" v-for="county in counties" v-bind:value="{ text: county.countyValue, id: county.countyId }">{{county.countyValue}}</option>
        </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Counties',
  props: ['selectedCounty.id, selectedCounty.text'],
  data: function(){

    return {
        selectedCounty:'',
        counties: [
            {
                countyId: 'bedfordshire',
                countyValue: 'Bedfordshire'
            },
            {
                countyId: 'berkshire',
                countyValue: 'Berkshire'
            },
            {
                countyId: 'bristol',
                countyValue: 'Bristol'
            },
            {
                countyId: 'buckinghamshire',
                countyValue: 'Buckinghamshire'
            },
            {
                countyId: 'cambridgeshire',
                countyValue: 'Cambridgeshire'
            },
            {
                countyId: 'cheshire',
                countyValue: 'Cheshire'
            },
            {
                countyId: 'cornwall',
                countyValue: 'Cornwall'
            },
            {
                countyId: 'countyDurham',
                countyValue: 'County Durham'
            },
            {
                countyId: 'cumbria',
                countyValue: 'Cumbria'
            },
            {
                countyId: 'derbyshire',
                countyValue: 'Derbyshire'
            },
            {
                countyId: 'Devon',
                countyValue: 'Devon'
            },
            {
                countyId: 'Dorset',
                countyValue: 'Dorset'
            },
            {
                countyId: 'eastRidingOfYorkshire',
                countyValue: 'East Riding of Yorkshire'
            },
            {
                countyId: 'eastSussex',
                countyValue: 'East Sussex'
            },
            {
                countyId: 'Essex',
                countyValue: 'Essex'
            },
            {
                countyId: 'gloucestershire',
                countyValue: 'Gloucestershire'
            },
            {
                countyId: 'greaterLondon',
                countyValue: 'Greater London'
            },
            {
                countyId: 'greaterManchester',
                countyValue: 'Greater Manchester'
            },
            {
                countyId: 'hampshire',
                countyValue: 'Hampshire'
            },
            {
                countyId: 'herefordshire',
                countyValue: 'Herefordshire'
            },
            {
                countyId: 'hertfordshire',
                countyValue: 'Hertfordshire'
            },
            {
                countyId: 'isle of wight',
                countyValue: 'Isle of Wight'
            },
            {
                countyId: 'islesOfScilly',
                countyValue: 'Isles of Scilly'
            },
            {
                countyId: 'kent',
                countyValue: 'Kent'
            },
            {
                countyId: 'lancashire',
                countyValue: 'Lancashire'
            },
            {
                countyId: 'leicestershire',
                countyValue: 'Leicestershire'
            },
            {
                countyId: 'lincolnshire',
                countyValue: 'Lincolnshire'
            },
            {
                countyId: 'merseyside',
                countyValue: 'Merseyside'
            },
            {
                countyId: 'norfolk',
                countyValue: 'Norfolk'
            },
            {
                countyId: 'northSomerset',
                countyValue: 'North Somerset'
            },
            {
                countyId: 'northYorkshire',
                countyValue: 'North Yorkshire'
            },
            {
                countyId: 'northamptonshire',
                countyValue: 'Northamptonshire'
            },
            {
                countyId: 'northumberland',
                countyValue: 'Northumberland'
            },
            {
                countyId: 'bedfordshire',
                countyValue: 'Nottinghamshire'
            },
            {
                countyId: 'oxfordshire',
                countyValue: 'Oxfordshire'
            },
            {
                countyId: 'rutland',
                countyValue: 'Rutland'
            },
            {
                countyId: 'shropshire',
                countyValue: 'Shropshire'
            },
            {
                countyId: 'somerset',
                countyValue: 'Somerset'
            },
            {
                countyId: 'southGloucestershire',
                countyValue: 'South Gloucestershire'
            },
            {
                countyId: 'southYorkshire',
                countyValue: 'South Yorkshire'
            },
            {
                countyId: 'staffordshire',
                countyValue: 'Staffordshire'
            },
            {
                countyId: 'suffolk',
                countyValue: 'Suffolk'
            },
            {
                countyId: 'surrey',
                countyValue: 'Surrey'
            },
            {
                countyId: 'tyneAndWear',
                countyValue: 'Tyne & Wear'
            },
            {
                countyId: 'warwickshire',
                countyValue: 'Warwickshire'
            },
            {
                countyId: 'westMidlands',
                countyValue: 'West Midlands'
            },
            {
                countyId: 'westSussex',
                countyValue: 'West Sussex'
            },
            {
                countyId: 'westyorkshire',
                countyValue: 'West Yorkshire'
            },
            {
                countyId: 'wiltshire',
                countyValue: 'Wiltshire'
            },
            {
                countyId: 'worcestershire',
                countyValue: 'Worcestershire'
            },          
        ]}
    },
    methods: {
        onChange(event) {
        this.$emit('selected', this.selectedCounty.text)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
