<template>
    <h1>{{ msg }}</h1>
</template>

<script>
export default {
  name: 'PageNotFound',
  data () {
    return {
      msg: 'The requested page could not be found (404).'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
