<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'app',
  provide (){
    return {
      reload: this.reload
    }
  },
  data (){
    return {
      isRouterAlive: true
    }
  },
  methods:
  {
    reload(){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true 
      })
    }
  }
}
</script>
<style>
@import "./assets/css/main.css";
@import "./theme/index.css";
@import "./assets/css/wrap.css";
</style>

