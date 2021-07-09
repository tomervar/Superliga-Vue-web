<template>
    <div class="team-preview">
      <b-card
      img-alt="Image"
      tag="article"
      style="max-width: 100rem;"
      class="mb-2"
    >
    <img :src="img" class="card-img-up" alt="Image" @click="img_click_handle">
    <br/>
    <br/>
        <b-card-title>{{name}}</b-card-title>
        <b-card-text>
            id: {{ id }}
        </b-card-text>
    </b-card>
  </div>
</template>

<script>
    export default {
        name: "TeamPreview",
        props: {
            id: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            img: {
                type: String,
                required: true
            },

        }, 
        methods:{
          img_click_handle(){
            console.log("img click handler");
            this.$router.push("/TeamPage/"+this.id);
          }
        },
    }
</script>

<style>
.team-preview {
  display: inline-block;
  width: auto;
  height: auto;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  overflow: auto;  
  border-color:rgb(44, 89, 116);
  background-color: white;
  color: black;
}

.team-preview .team-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 155, 197);
}

.team-preview .team-content {
  width: 100%;
  overflow: hidden;
}
.card-img-up{
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    height:50px; 
    width: 50px; 
}
</style>