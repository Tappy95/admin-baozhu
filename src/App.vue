<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  h2{
    font-size: 26px;
  }

  h3{
    font-size: 20px;
    padding-bottom: 0;
  }
  .el-input--suffix .el-input__inner{
    padding-right: 0;
  }
</style>
