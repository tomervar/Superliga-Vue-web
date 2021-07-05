<template>
  <div class="container">
    <h1 class="title"> Add New Match </h1>
    <b-form @submit.prevent="onAdd" @reset.prevent="onReset">

      <b-form-group
        id="input-group-Date"
        label-cols-sm="3"
        label="Date:"
        label-for="Date"
      >
        <b-form-input
          id="Date"
          v-model="$v.form.Date.$model"
          type="date"
          class="mb-2"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.Date.required">
          Date is required
        </b-form-invalid-feedback>
        <b-form-text v-if="$v.form.Date.$error" text-variant="danger">
          Date is past
        </b-form-text>
      </b-form-group>

      <b-form-group
        id="input-group-Date"
        label-cols-sm="3"
        label="Hour:"
        label-for="Hour"
      >
        <b-form-input 
          id="Hour"
          type="time"
          locale="en"
          v-model="$v.form.Hour.$model"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.Hour.required">
          Hour is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-HomeTeamName"
        label-cols-sm="3"
        label="Home Team :"
        label-for="HomeTeamName"
      >
        <b-form-select
          id="HomeTeamName"
          v-model="$v.form.HomeTeamName.$model"
          :options="teams"
          :state="validateState('HomeTeamName')"
        ></b-form-select>
        <b-form-invalid-feedback v-if="!$v.form.HomeTeamName.required">
          Home Team is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.AwayTeamName.sameAsAwayTeam">
          Home Team must be different from Away team
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-AwayTeamName"
        label-cols-sm="3"
        label="Away Team:"
        label-for="AwayTeamName"
      >
        <b-form-select
          id="AwayTeamName"
          v-model="$v.form.AwayTeamName.$model"
          :options="teams"
          :state="validateState('AwayTeamName')"
        ></b-form-select>
        <b-form-invalid-feedback v-if="!$v.form.AwayTeamName.required">
          Away Team is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.AwayTeamName.sameAsHomeTeam">
          Away Team must be different from Home team
        </b-form-invalid-feedback>
      </b-form-group>

     <b-form-group
        id="input-group-Referee"
        label-cols-sm="3"
        label="Referee:"
        label-for="Referee"
      >
        <b-form-select
          id="Referee"
          v-model="$v.form.Referee.$model"
          :options="referees"
          :state="validateState('Referee')"
        ></b-form-select>
        <b-form-invalid-feedback>
          Referee_id is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Stadium"
        label-cols-sm="3"
        label="Stadium:"
        label-for="Stadium"
      >
        <b-form-input
          id="Stadium"
          v-model="$v.form.Stadium.$model"
          type="text"
          :state="validateState('Stadium')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.Stadium.required">
          Stadium is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.Stadium.alpha">
          Stadium must be alpha
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button
        type="submit"
        variant="primary"
        style="width:250px;"
        class="ml-5 w-75"
        >Add</b-button
      >
      <div class="mt-2">
        You want to go back?
        <router-link to="/AssociationMember"> click here </router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      add Match failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import referees from "../assets/referees"
import teams from "../assets/teamsNamesAndIDs"
import {
  required,
  sameAs,
  not,
  different,
  alpha
} from "vuelidate/lib/validators";

export default {
  name: "AssociationMemberAddMatch",
  data() {
    return {
      form: {
        Date: '',
        Hour: '',
        HomeTeamName: null,
        AwayTeamName: null,
        Referee: null,
        Stadium: "",
        submitError: undefined
      },
      teams: [{ value: null, text: "", disabled: true }],
      referees: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      Date: {
        required,
        dateGood: function(value) {
        let now = new Date();
        let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let minDate = new Date(today);
        let choseDate = new Date(value);
        return minDate.getTime() < choseDate.getTime();
        },
      },
      Hour: {
        required,
      },
      HomeTeamName: {
        required,
        sameAsAwayTeam: not(sameAs("AwayTeamName"))
      },
      AwayTeamName: {
        required,
        sameAsHomeTeam:  not(sameAs("HomeTeamName"))

      },
      Referee: {
        required,
      },
      Stadium: {
        required,
        alpha
      }
    }
  },
  mounted() {
      for(const team of teams){
        this.teams.push(team.name);
      }
      for(const referee of referees){
        this.referees.push(referee.name);
      }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async add() {
      try {
        let timeDateString = this.form.Date + "T"+this.form.Hour+":00Z";
        console.log(timeDateString);
        let homeTeamID = this.getTeamIDFromName(this.form.HomeTeamName);
        let awayTeamID = this.getTeamIDFromName(this.form.AwayTeamName);
        let refereeID = this.getRefereeIDFromName(this.form.Referee);
    
        const response = await this.axios.post(
          "http://localhost:3000/users/associationMember/addMatch",
          {
            date: timeDateString,
            home_team_id: homeTeamID,
            away_team_id: awayTeamID,
            referee_id: refereeID,
            stadium: this.form.Stadium
          }
        );
        console.log(response);
        this.$router.push("/associationMember");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data;
      }
    },
    onAdd() {
      // console.log("register method called");
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      console.log("onAdd method");
      this.add();
    },
    getTeamIDFromName(teamName){
      for(const team of teams){
        if(team.name === teamName){
          return team.id;
        }
      }
    },
    getRefereeIDFromName(refereeName){
      for(const referee of referees){
        if(referee.name === refereeName){
          return referee.id;
        }
      }
    },
    onReset() {
      this.form = {
        Date: '',
        Hour: '',
        HomeTeamName: null,
        AwayTeamName: null,
        Referee_id: null,
        Stadium: "",
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
}
</style>