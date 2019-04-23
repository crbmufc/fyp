<template>
<div class="player-results-page">
    <h2>Player List</h2>
    <div class="filters">
        <v-expansion-panel>
            <v-expansion-panel-content v-model="show">
                <template v-slot:header>
                    <div>Filter Players</div>
                </template>
                <!-- <div class="age-filter">
                    <v-text-field v-model="selectedAge" label="Age" type="number"></v-text-field>''
                </div> -->
                <div class="playing-experience-filter player-filter"> 
                    <v-radio-group v-model="selectedPlayingExperience" label="Playing Experience">
                        <v-radio label="Amateur" value="Amateur"></v-radio>
                        <v-radio label="Academy" value="Academy"></v-radio>
                        <v-radio label="Semi Professional" value="Semi Professional"></v-radio>
                        <v-radio label="Professional" value="Professional"></v-radio>
                    </v-radio-group>
                </div>
                <v-container v-model="selectedCounty" class="player-filter" fluid>
                    <v-select label="County" :items="counties" name="county" item-text="countyValue" v-model="selectedCounty" outline single-line></v-select>
                </v-container>
                <div class="positions-filter player-filter">
                    <v-radio-group v-model="selectedPosition" label="Position">
                        <v-radio label="Goalkeeper" value="Goalkeeper"></v-radio>
                        <v-radio label="Right Back" value="Right Back"></v-radio>
                        <v-radio label="Left Back" value="Left Back"></v-radio>
                        <v-radio label="Centre Back" value="Centre Back"></v-radio>
                        <v-radio label="Defensive Midfield" value="Defensive Midfield"></v-radio>
                        <v-radio label="Centre Midfield" value="Centre Midfield"></v-radio>
                        <v-radio label="Attacking Midfield" value="Attacking Midfield"></v-radio>
                        <v-radio label="Right Wing" value="Right Wing"></v-radio>
                        <v-radio label="Left Wing" value="Left Wing"></v-radio>
                        <v-radio label="Striker" value="Striker"></v-radio>
                    </v-radio-group>
                </div>
                <div class="traits-filter player-filter">
                    <v-radio-group v-model="selectedTrait" label="Trait">
                        <v-radio label="Crosser" value="Crosser"> </v-radio>
                        <v-radio label="Dribbler" value="Dribbler"> </v-radio>
                        <v-radio label="Finisher" value="Finisher"> </v-radio>
                        <v-radio label="Heading" value="Heading"> </v-radio>
                        <v-radio label="Leader" value="Leader"> </v-radio>
                        <v-radio label="Long Shots" value="Long Shots"> </v-radio>
                        <v-radio label="Long Throw" value="Long Throw"> </v-radio>
                        <v-radio label="Penalty Taker" value="Penalty Taker"> </v-radio>
                        <v-radio label="Playmaker" value="Playmaker"> </v-radio>
                        <v-radio label="Set Pieces" value="Set Pieces"> </v-radio>
                        <v-radio label="Speedster" value="Speedster"> </v-radio>
                        <v-radio label="Strength" value="Strength"> </v-radio>
                        <v-radio label="Workhorse" value="Workhorse"> </v-radio>
                    </v-radio-group>
                </div>
                <div class="preferred-foot-filter player-filter">
                    <v-radio-group v-model="selectedPreferredFoot" label="Preferred Foot">
                        <v-radio label="Right" value="Right"></v-radio>
                        <v-radio label="Left" value="Left"></v-radio>
                        <v-radio label="Either" value="Either"></v-radio>
                    </v-radio-group>
                </div>
                <v-btn depressed class="orange white--text" @click="outputSelected">Apply Filters</v-btn>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </div>
    <v-card class="player-results-card" hover v-for="(player, key) in filterPlayers" :key="key">
        <!-- <div class="player-results-card-header orange"> -->
        <v-subheader class="grey">
            <v-card-title primary-title class="player-results-card-title">
                <h2>{{player.firstName + ' ' + player.lastName}}</h2>
            </v-card-title>
        </v-subheader>
        <!-- </div> -->
        <div class="card-data">
            <v-card-title>
                <h3>Age</h3>
            </v-card-title>
             <v-card-text>{{player.age}}</v-card-text>
        </div>
        <div class="card-data">
            <v-card-title>
                <h3>Playing Experience</h3>
            </v-card-title>
            <v-card-text>{{player.playingExperience}}</v-card-text>
        </div>
        <div class="card-data">
            <v-card-title>
                <h3>County</h3>
            </v-card-title>
            <v-card-text>{{player.county}}</v-card-text>
        </div>
        <div class="card-data">
            <v-card-title>
                <h3>Current Club</h3>
            </v-card-title>
            <v-card-text>{{player.currentClub}}</v-card-text>
        </div>
        <div class="card-data">
            <v-card-title>
                <h3>Positions</h3>
            </v-card-title>
            <div v-for="(key,position) in player.positions" :key="position">
                <v-card-text>{{position.replace('_', ' ')}}</v-card-text>
            </div>
        </div>
        <div class="card-data">
            <v-card-title>
                <h3>Traits</h3>
            </v-card-title>
            <div v-for="(key,trait) in player.traits" :key="trait">
                <v-card-text>{{trait.replace('_', ' ')}}</v-card-text>
            </div>
        </div>
        <div class="card-data">
            <v-card-title>
                <h3>Preferred Foot</h3>
            </v-card-title>
            <v-card-text>{{player.preferredFoot}}</v-card-text>
        </div>
        <v-btn v-if="compareIds" @click="removeFromWatchList(player.firstName, player.lastName, player.currentClub, key)" depressed class="black white--text">Remove From Watch List</v-btn>
        <v-btn v-else @click="addToWatchList(player.firstName, player.lastName, player.currentClub, key)" depressed class="grey white--text">Add To Watch List</v-btn>
    </v-card>
</div>
</template>
<script>
import firebase from 'firebase'
import {database} from '../main'
// import {players} from '../main'

export default {
    name: 'PlayerSearch',
    created()
    {
        this.getPlayers()
        this.getWatchList()
        this.outputSelected()
    },
    data() {
        return{
            show:false,
            players:'',
            filterPlayers:'',
            filterPlayersIds: [],
            watchListArray: [],
            positions: {

            },
            traits: {

            },
            selectedPlayingExperience: '',
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
        ],
            selectedCounty: '',
            selectedPosition: '',
            selectedTrait: '',
            selectedPreferredFoot: ''
        }
    },
    methods: {
        async getPlayers(){
           var players = database.ref('/Players').on('value', this.logPlayers);
        },
        
        async logPlayers(snapshot){
            var playerSnap = snapshot.val();
            this.players = playerSnap;
            this.filterPlayers = this.players;
            this.filterPlayersIds = (Object.keys(this.filterPlayers))
        },

        getWatchList() {
            var userId = firebase.auth().currentUser.uid;
            var watchList = database.ref('Scouts/' + userId + '/watchList').on('value', function(snapshot){
                var watchListIds = snapshot.val()
                var watchListArray = Object.keys(watchListIds)
                this.watchListArray = watchListArray;
            });
        },

        outputSelected(){
            // console.log(this.show);
            this.filterPlayers = this.players;
            this.filterPlayersIds = (Object.keys(this.filterPlayers))
            this.filterPlayers = (Object.values(this.filterPlayers))

            if(this.selectedPlayingExperience)
            {
                this.filterPlayers = this.filterPlayers.filter(player => player.playingExperience == this.selectedPlayingExperience);
            }

            if(this.selectedPreferredFoot)
            {
                this.filterPlayers = this.filterPlayers.filter(player => player.preferredFoot == this.selectedPreferredFoot);
            }

            if(this.selectedCounty)
            {
                this.filterPlayers = this.filterPlayers.filter(player => player.county == this.selectedCounty);
            }

            /**
             * Trait Filters
             */

            if(this.selectedTrait === 'Crosser')
            {
                this.filterPlayers = this.filterPlayers.filter(player => player.traits.Crosser === true);
            }
            if(this.selectedTrait === 'Dribbler')
            {
                this.filterPlayers = this.filterPlayers.filter(player => player.traits.Dribbler === true);
            }
            if(this.selectedTrait === 'Finisher')
            {
                this.filterPlayers = this.filterPlayers.filter(player => player.traits.Finisher === true);
            }
            if(this.selectedTrait === 'Heading')
            {
                this.filterPlayers = this.filterPlayers.filter(player => player.traits.Heading === true);
            }
            if(this.selectedTrait === 'Leader')
            {
                this.filterPlayers = this.filterPlayers.filter(player => player.traits.Leader === true);
            }
            if(this.selectedTrait === 'Long Shots')
            {
                this.filterPlayers = this.filterPlayers.filter(player => player.traits.Long_Shots === true);
            }
            if(this.selectedTrait === 'Long Throw')
            {
                this.filterPlayers = this.filterPlayers.filter(player => player.traits.Long_Throw === true);
            }
            if(this.selectedTrait === 'Penalty Taker')
            {
                this.filterPlayers = this.filterPlayers.filter(player => player.traits.Penalty_Taker === true);
            }
            if(this.selectedTrait === 'Playmaker')
            {
                this.filterPlayers = this.filterPlayers.filter(player => player.traits.Playmaker === true);
            }
            if(this.selectedTrait === 'Set Pieces')
            {
                this.filterPlayers = this.filterPlayers.filter(player => player.traits.Set_Pieces === true);
            }
            if(this.selectedTrait === 'Speedster')
            {
                this.filterPlayers = this.filterPlayers.filter(player => player.traits.Speedster === true);
            }
            if(this.selectedTrait === 'Strength')
            {
                this.filterPlayers = this.filterPlayers.filter(player => player.traits.Strength === true);
            }
            if(this.selectedTrait === 'Workhorse')
            {
                this.filterPlayers = this.filterPlayers.filter(player => player.traits.Workhorse === true);
            }

            /**
             * Positions Filters
             */

            if(this.selectedPosition === 'Goalkeeper')
            {
                this.filterPlayers = this.filterPlayers.filter(player => player.positions.Goalkeeper === true);
            }
            if(this.selectedPosition === 'Right Back')
            {
                this.filterPlayers = this.filterPlayers.filter(player => player.positions.Right_Back === true);
            }
            if(this.selectedPosition === 'Left Back')
            {
                this.filterPlayers = this.filterPlayers.filter(player => player.positions.Left_Back === true);
            }
            if(this.selectedPosition === 'Centre Back')
            {
                this.filterPlayers = this.filterPlayers.filter(player => player.positions.Centre_Back === true);
            }
            if(this.selectedPosition === 'Defensive Midfield')
            {
                this.filterPlayers = this.filterPlayers.filter(player => player.positions.Defensive_Midfield === true);
            }
            if(this.selectedPosition === 'Centre Midfield')
            {
                this.filterPlayers = this.filterPlayers.filter(player => player.positions.Centre_Midfield === true);
            }
            if(this.selectedPosition === 'Attacking Midfield')
            {
                this.filterPlayers = this.filterPlayers.filter(player => player.positions.Attacking_Midfield === true);
            }
            if(this.selectedPosition === 'Right Wing')
            {
                this.filterPlayers = this.filterPlayers.filter(player => player.positions.Right_Wing === true);
            }
            if(this.selectedPosition === 'Left Wing')
            {
                this.filterPlayers = this.filterPlayers.filter(player => player.positions.Left_Wing === true);
            }
            if(this.selectedPosition === 'Striker')
            {
                this.filterPlayers = this.filterPlayers.filter(player => player.positions.Striker === true);
            }

            //collapses expansion panel when fliter button is clicked
            this.show = false;
        },

        addToWatchList (firstName, lastName, club, key) {
            var user = firebase.auth().currentUser
            var userId = user.uid;
            var playerKey = (firstName + lastName + club);
            var playerName = firstName + ' ' + lastName;
            var watchList = database.ref('Scouts/' + userId + '/watchList');
            var playerKey = key

            let playerObj = {}

            playerObj[playerKey] = {
                key: playerKey,
                playerName: playerName,
                club: club
            }
            
            watchList.update(playerObj)
        }

        // removeFromWatchList (firstName, lastName, club, key) {
        //     var user = firebase.auth().currentUser
        //     var userId = user.uid;
        //     var playerKey = (firstName + lastName + club);
        //     var playerName = firstName + ' ' + lastName;
        //     var watchList = database.ref('Scouts/' + userId + '/watchList');
        //     var playerKey = key

        //     let playerObj = {}

        //     playerObj[playerKey] = {
        //     }

        //     watchList.update(playerObj)
        // }
    }
    // computed: {
    //     compareIds(key) {
    //         var match = false;

    //         for (let i = 0; i < this.watchListArray.length; i++) {
    //             if(key == this.watchListArray[i]){
    //                 match = true;
    //                 break;
    //             }  
    //         }

    //         return match;
    //     }
    // }
}
</script>

<style scoped>

.player-results-page {
    padding: 2%;
}

.player-results-card {
    cursor:default;
    margin:5%;
}

.v-subheader {
    height: auto;
}

.player-results-card-title {
    color: white;
    padding-left: 0;
}

.v-btn__content {
    color: white;
}

.player-filter {
    padding: 2%;
}
</style>
