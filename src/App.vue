<template>
  <div id="app">
    <Header />
    <div class="view">
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'app',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
  html {
    color: #fff;
    font-size: 20px;
  }

  body {
    background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(./assets/img/bg.jpg);
    background-size: cover;
  }

  .view {
    margin-top: 100px;
  }

  .timer {
    font-size: 150px;
    text-align: center;
    color: #fff;
  }

  .status {
    color: #fff;
    text-align: center;
  }

</style>
