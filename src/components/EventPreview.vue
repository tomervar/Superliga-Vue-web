<template>
    <div class="event-preview">
        <p><b style="font-size:23px;">#</b> {{date}} {{time}} {{minute}} , {{game_event}}</p>
  </div>
</template>

<script>
    export default {
        name: "EventPreview",
        props: {
            id:{
                type: Number,
                require: true
            },
            date: {
                type: String,
                required: true
            },
            time: {
                type: String,
                required: true
            },
            minute: {
                type: Number,
                required: true
            },
            game_event: {
                type: String,
                required: true
            },

        }, 
    }
</script>

<style>
.event-preview {
  display: inline-block;
  width: auto;
  height: auto;
  position: relative;
  margin: 10px 10px;
  overflow: auto;  
  color: black;

}

</style>