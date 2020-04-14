<template>
  <div>
    <b-alert variant="danger" show dismissible fade>{{ message }}</b-alert> 
    <b-alert variant="danger" show dismissible fade>{{ message2 }}</b-alert> 
    <b-alert variant="danger" show dismissible fade>{{ message3 }}</b-alert> 

  </div>
</template>


<script>
export default {
  props: ['message','message2','message3'],
  
};
</script>

