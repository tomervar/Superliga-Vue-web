<template>
  <div class="About-div">
      <h1><b> About Us </b></h1>
      <div class="Tomer_and_Lior-div">
          <div class="Tomer_div">
            <b-card no-body class="overflow-hidden" style="max-width:40%;">
                <b-row no-gutters>
                <b-col md="6">
                    <b-card-img :src="tomer_img" alt="Image" class="rounded-0"></b-card-img>
                </b-col>
                <b-col md="6">
                    <b-card-body title="Tomer Varon">
                    <b-card-text>
                        <u>ID: 205360498</u>
                        <br/>
                        3rd year student in Informain Systems and Software Engineering

                    </b-card-text>
                    </b-card-body>
                </b-col>
                </b-row>
            </b-card>
          </div>
          <br/>
          <br/>
          <div class="Lior_div">
            <b-card no-body class="overflow-hidden" style="max-width: 40%;">
                <b-row no-gutters>
                <b-col md="6">
                    <b-card-img :src="lior_img" alt="Image" class="rounded-0"></b-card-img>
                </b-col>
                <b-col md="6">
                    <b-card-body title="Horizontal Card">
                    <b-card-text>
                        <u>ID: 308438795</u>
                        <br/>
                        3rd year student in Informain Systems and Software Engineering

                    </b-card-text>
                    </b-card-body>
                </b-col>
                </b-row>
            </b-card>
          </div>
      </div>
  </div>
</template>

<script>
import tomerImg from "../assets/img/tomerImg.jpg"
import liorImg from "../assets/img/liorImg.png"
export default {
    name: "About",
    data() {
        return {
            tomer_img: tomerImg,
            lior_img: liorImg
        }
    },
}
</script>

<style>

</style>