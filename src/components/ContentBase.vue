<template>
  <div class="home">
    <div class="container">
      <div class="card">
        <div class="card-body">
          <slot></slot>
          <!-- 存放父组件传过来的children -->
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  export default {
    name: "ContentBase",

  };
  </script>
  
  <style scoped>
  .container{
    margin-top: 20px;
  }
  </style>