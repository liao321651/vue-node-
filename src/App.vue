<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>
<style lang='scss'>
body{
   background:url('../src/assets/img/main_6.png')no-repeat,
              url('../src/assets/img/main_5.png')no-repeat,
              url('../src/assets/img/main_4.png')no-repeat,
              url('../src/assets/img/main_3.png')no-repeat,
              url('../src/assets/img/main_2.png'),
              url('../src/assets/img/main_1.jpg')no-repeat
              ;
  background-size: 100% 100%;
  #app{
    padding: 20PX;
    min-height: 666px;
    }
}

 
</style>
