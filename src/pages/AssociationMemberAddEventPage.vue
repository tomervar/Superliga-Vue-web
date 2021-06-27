<template>
  <div class="container">
    <h1 class="title"> Add Event </h1>
    <b-form @submit.prevent="onAdd" @reset.prevent="onReset">
      <b-form-group
        id="input-group-ID"
        label-cols-sm="3"
        label="ID:"
        label-for="ID"
      >
        <b-form-input
          id="ID"
          v-model="this.form.ID"
          type="text"
          :disabled="true"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-Date"
        label-cols-sm="3"
        label="Date:"
        label-for="Date"
      >
        <b-form-input
          id="Date"
          v-model="this.form.Date"
          type="text"
          :disabled="true"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-Date"
        label-cols-sm="3"
        label="Hour:"
        label-for="Hour"
      >
        <b-form-input
          id="Hour"
          v-model="this.form.Hour"
          type="text"
          :disabled="true"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-Minute"
        label-cols-sm="3"
        label="Minute:"
        label-for="Minute"
      >
        <b-form-input
          id="Minute"
          v-model="$v.form.Minute.$model"
          type="text"
          :state="validateState('Minute')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.Minute.required">
          Minute is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.Minute.between_0_and_90">
          Minute must be between 0 - 90
        </b-form-invalid-feedback>
      </b-form-group>

     <b-form-group
        id="input-group-Game_event"
        label-cols-sm="3"
        label="Game Event:"
        label-for="Game_event"
      >
        <b-form-select
          id="Game_event"
          v-model="$v.form.Game_event.$model"
          :options="gamesEvents"
          :state="validateState('Game_event')"
        ></b-form-select>
        <b-form-invalid-feedback>
          game_event is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-player"
        label-cols-sm="3"
        label="player:"
        label-for="player"
      >
        <b-form-input
          id="player"
          v-model="$v.form.Player.$model"
          type="text"
          :state="validateState('Player')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.Player.required">
          Player is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.Player.alpha">
          Player must be alpha
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button
        type="submit"
        variant="primary"
        style="width:250px;"
        class="ml-5 w-75"
        >Update</b-button
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
      add event failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import gamesEvents from "../assets/gameEvents"
import {
  required,
  numeric,
  integer,
  maxValue,
  minValue,
  alpha
} from "vuelidate/lib/validators";

export default {
  name: "AssociationMemberAddEvent",
  data() {
    return {
      form: {
        ID: this.$route.params.id,
        Date: this.$route.params.date,
        Hour: this.$route.params.hour,
        Minute: "",
        Game_event: null,
        Player:"",
        submitError: undefined
      },
      gamesEvents: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      Minute: {
        required,
        between_0_and_90: (u) => minValue(0)(u) && maxValue(90)(u)
      },
      Game_event: {
        required,
      },
      Player: {
        required,
        alpha
      }
    }
  },
  mounted() {
      this.gamesEvents.push(...gamesEvents);
      this.form.ID = this.$route.params.id;
      this.Date = this.$route.params.date;
      this.Hour = this.$route.params.hour;
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async add() {
      try {
          console.log(this.form.Game_event);
        let time = this.getRightTime();
        const response = await this.axios.post(
          "http://localhost:3000/users/associationMember/addEventCalender",
          {
            match_id: this.form.ID,
            eventCalender: [{
            "event_date": this.form.Date,
            "event_time": time,
            "minute": this.form.Minute,
            "game_event": this.form.Game_event + " " + this.form.Player
        }]
          }
        );
        this.$router.push("/associationMember");
        console.log(response);
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
    onReset() {
      this.form = {
        ID: this.$route.params.id,
        Date: this.$route.params.date,
        Hour: this.$route.params.hour,
        Minute: "",
        Game_event: null,
        Player:"",
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    getRightTime() {
        let time = this.form.Hour;
        let totalInMinutes = (parseInt(time.split(":")[0]) * 60) + parseInt(time.split(":")[1]);
        let otherMinutes = parseInt(this.form.Minute);
        let grandTotal = otherMinutes + totalInMinutes;
        //Now using your own code
        let bookH = Math.floor(grandTotal / 60);
        let bookM = grandTotal % 60;
        let bookingDurationToHour;
        if(bookM < 10){
            bookingDurationToHour = bookH + ':0' + bookM;
        }
        else{
            bookingDurationToHour = bookH + ':' + bookM;
        }
        return bookingDurationToHour;
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
}
</style>