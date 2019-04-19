<template>
    <div class="scout-home">
        <h2>Welcome Scout.</h2>
        <v-btn @click="logout">Logout</v-btn>

        <h3>Your Watch List</h3>
        <!-- <v-alert :value="false" type="success" transition="scale-transition" dismissible>This is a success alert.</v-alert> -->
        <div class="watch-list-container">
            <v-card class="watchlist-results-card" hover v-for="(player, key) in watchListPlayers" :key="key" >
                <v-subheader class="grey">
                    <v-card-title primary-title class="watchlist-results-card-title">
                        <h3>{{player.playerName + ' - ' + player.club}}</h3>
                    </v-card-title>
                </v-subheader>
                <v-container>
                    <v-expansion-panel v-for="(report, index) in watchListPlayers[key].reports" :key="index" expand>
                        <v-expansion-panel-content>
                            <template v-slot:header class="report-header">
                                <div>{{'Player Report: ' + report.date}}</div>
                            </template>
                            <div class="report-content">
                                <p>{{'Grade: ' + report.grade}}</p>
                                <p>{{'Recommendation: ' + report.recommendation}}</p>
                                <h3>Match Notes</h3>
                                <p>{{report.matchNotes}}</p>
                            </div>
                        </v-expansion-panel-content>   
                    </v-expansion-panel>
                </v-container>
                <!-- <v-btn depressed>New Report</v-btn> -->

                <v-form class="create-report-form">
                    <h3>Create New Report for {{player.playerName}}</h3>
                    <v-text-field type="date" v-model="reportDate"  label="Report Date" :rules="[rules.required]"></v-text-field>
                    <v-select label="Select Player Grade" :items="grades" name="grade" item-text="gradeValue" v-model="selectedGrade" outline single-line :rules="[rules.required]"></v-select>
                    <v-select label="Select Recommendation" :items="recommendations" name="recommendation" item-text="recommendationValue" v-model="selectedRecommendation" outline single-line :rules="[rules.required]"></v-select>
                    <v-textarea type="text" v-model="reportMatchNotes"  label="Match Notes Date" auto-grow clearable :rules="[rules.required]"></v-textarea>
                    <v-btn @click="submitReport(player.key)">Submit Report</v-btn>
                </v-form>
            </v-card>
        </div>
    </div>
    
</template>

<script>
import firebase from 'firebase'
import {database} from '../main'
import Timestamp from 'time-stamp'
export default {
    name: 'ScoutHome',
    created() {
        this.getWatchList()
    },
    data() {
        return {
            watchListPlayers: '',
            playerReport: '',
            grades: [
                {
                    gradeValue: 'A - Sign Immediately'
                },
                {
                    gradeValue: 'B – Good Performance'
                },
                {
                    gradeValue: 'C - Keep an eye on the player'
                },
                {
                    gradeValue: 'D – Average Performance'
                },
                {
                    gradeValue: 'E – No interest'
                }

            ],
            recommendations: [
                {
                    recommendationValue: 'Sign'
                },
                {
                    recommendationValue: 'Monitor Closely'
                },
                {
                    recommendationValue: 'Monitor'
                },
                {
                    recommendationValue: 'No interest'
                }

            ],
            rules: {
                required: value => !!value || "Required"
            },
            reportDate: '',
            selectedGrade: '',
            selectedRecommendation: '',
            reportMatchNotes: '',
            userId:'',
            player: ''
        }
    },
    components: {
    },
    methods: {
        logout: function(){
            firebase.auth().signOut().then(() => {
                this.$router.replace('home')
            })
        },
        getWatchList(){
            var userId = firebase.auth().currentUser.uid 
            var players = database.ref('Scouts/' + userId + '/watchList').on('value', this.logWatchListPlayers);
            this.userId = userId;             
        },
        
        logWatchListPlayers(snapshot){
            var playerSnap = snapshot.val();
            this.watchListPlayers = playerSnap;
            this.watchListPlayers = Object.values(this.watchListPlayers);
        },

        submitReport(playerId) {
            var reportDate = this.reportDate;
            var selectedGrade = this.selectedGrade;
            var selectedRecommendation = this.selectedRecommendation;
            var matchNotes = this.reportMatchNotes;
            var userId = firebase.auth().currentUser.uid
            var report = database.ref('Scouts/' + userId + '/watchList/' + playerId + '/reports').push()
            
            report.set({
                date: reportDate,
                grade: selectedGrade,
                recommendation: selectedRecommendation,
                matchNotes: matchNotes
            })
        }
    }
}
</script>

<style scoped>
.watchlist-results-card {
    margin: 5%;
    width: 45%;
}

.v-expansion-panel {
    border-bottom: 1px solid grey;
}

.watch-list-container {
    display: flex;
    justify-content: center;
    
}

</style>
