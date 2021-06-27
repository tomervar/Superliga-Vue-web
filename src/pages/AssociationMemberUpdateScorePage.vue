<template>
  <div class="container">
    <h1 class="title">Update Score</h1>
    <b-form @submit.prevent="onUpdate" @reset.prevent="onReset">
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
        id="input-group-HomeTeamScore"
        label-cols-sm="3"
        label="Home Team Score:"
        label-for="HomeTeamScore"
      >
        <b-form-input
          id="HomeTeamScore"
          v-model="$v.form.HomeTeamScore.$model"
          type="text"
          :state="validateState('HomeTeamScore')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.HomeTeamScore.required">
          First Name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.HomeTeamScore.alpha">
          First Name must be alpha
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-AwayTeamScore"
        label-cols-sm="3"
        label="Away Team Score:"
        label-for="AwayTeamScore"
      >
        <b-form-input
          id="AwayTeamScore"
          v-model="$v.form.AwayTeamScore.$model"
          type="text"
          :state="validateState('AwayTeamScore')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.AwayTeamScore.required">
          Last Name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.AwayTeamScore.alpha">
          Last Name must be alpha
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
        <router-link to="/AssociationMember"> click here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Update failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import {
  required,
  numeric,
  integer
} from "vuelidate/lib/validators";

export default {
  name: "AssociationMemberUpdateScore",
  data() {
    return {
      form: {
        ID: this.$route.params.id,
        HomeTeamScore: "",
        AwayTeamScore: "",
        submitError: undefined
      },
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      HomeTeamScore: {
        required,
        numeric,
        integer,
      },
      AwayTeamScore: {
        required,
        numeric,
        integer,
      },
    }
  },
  mounted() {
      this.form.ID = this.$route.params.id;
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async update() {
      try {
        const response = await this.axios.put(
          "http://localhost:3000/users/associationMember/updateMatch",
          {
            match_id: this.form.ID,
            home_team_goals: parseInt(this.form.HomeTeamScore),
            away_team_goals: parseInt(this.form.AwayTeamScore)
          }
        );
        this.$router.push("/associationMember");
        console.log(response);
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data;
      }
    },
    onUpdate() {
      // console.log("register method called");
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      console.log("onUpdate method go");
      this.update();
    },
    onReset() {
      this.form = {
        HomeTeamScore: "",
        AwayTeamScore: "",
        ID: this.$route.params.id,
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
}
</style>