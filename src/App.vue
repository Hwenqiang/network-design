<template>

  <ContentBase>
    <NavBar />
  </ContentBase>
 
  <div class="box">
    <router-view/>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './components/NavBar';
import ContentBase from './components/ContentBase.vue';

export default {
  name:'App',
  components:{
    NavBar,
    ContentBase
}
}
</script>

<style scoped>
.box{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
