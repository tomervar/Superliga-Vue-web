<template>
  <div class="About-div">
      <div class="about_p_div">
        <h1><b> About Us </b></h1>
        Welcome to our Superliga League Managment !<br />
        In this App you can find information about First Danish League that includes
        data about matches,players and teams<br />
        This website developed and designed by Tomer Varon & Lior Tabachnik.<br />
        <h2><b> Our previous projects : </b></h2>
        <div class="projects_div">
        <a
        href="https://github.com/Web-Development-Environments-2021/assignment2_308438795_205360498"
        >2Pacman Game</a
        >
        <br />
        <a 
        href="https://github.com/Web-Development-Environments-2021/assignment-3-1-205360498_308438795"
        >API</a
        ><br />
        <a
        href="https://github.com/Web-Development-Environments-2021/assignment-3-2-205360498_308438795"
        >ServerSide</a
        ><br />
        </div>
      </div>
    <h2 class="h2_div"><b> About Us: </b></h2>
    <div class="Tomer_and_Lior-div">
      <div class="Tomer_div">
        <b-card no-body class="overflow-hidden" style="max-width: 40%">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img
                :src="tomer_img"
                alt="Image"
                class="rounded-0"
              ></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body title="Tomer Varon">
                <b-card-text>
                  <u>ID: 205360498</u>
                  <br />
                  3rd year student in Informain Systems and Software Engineering
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </div>
      <br />
      <br />
      <div class="Lior_div">
        <b-card no-body class="overflow-hidden" style="max-width: 40%">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img
                :src="lior_img"
                alt="Image"
                class="rounded-0"
              ></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body title="Lior Tabachnik">
                <b-card-text>
                  <u>ID: 308438795</u>
                  <br />
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
import tomerImg from "../assets/img/tomerImg.jpg";
import liorImg from "../assets/img/liorImg.png";
export default {
  name: "About",
  data() {
    return {
      tomer_img: tomerImg,
      lior_img: liorImg,
    };
  },
};
</script>

<style>
.about_p_div{
    align-items: center;
    text-align: center;
}
.projects_div{
    background-color: antiquewhite;
}
.Tomer_and_Lior-div {
  display: flex;
}
.h2_div{
    align-items: center;
    text-align: center;
}
.Tomer_div {
  flex: 0 0 50%;
  color: black;
}

.Lior_div {
  flex: 1;
  color: black;
}
</style>