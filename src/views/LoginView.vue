<template>
  <ContentBase style="margin-top: 200px;;">
    <form>
      <div class="mb-3">
        <input type="text" placeholder="请输入用户名" v-model="username" />
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary" @click="handleEnter">Submit</button>
    </form>
  </ContentBase>
</template>

<script>

import { ref,onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import ContentBase from '@/components/ContentBase.vue';

export default{
    name: 'LoginView',
    setup(props, cxt) {
        const username = ref('');
        const router = useRouter(); //useRouter用于手动控制路有变化
        const store = useStore();
        // onMounted(()=>{
        //   //查看sessionStorage中是否存在username
        //   username.value = sessionStorage.getItem('username');
        //   if(username.value){//存在的话直接跳转
        //     router.push('/');
        //     return ;
        //   }
        // });
        const handleEnter = () => {
            const _username = username.value; //ref对象的值用value取得
            //控制用户名格式
            if (_username.length < 2) {
                alert('用户名应不小于2位');
                username.value = '';
                return;
            }
            sessionStorage.setItem('username', _username); //存入localStorage
            username.value = '';
            store.commit('login',_username);
            router.push('/');
        };
        return {
            username,
            handleEnter,
        };
    },
    components: { ContentBase }
}
</script>

<style scoped>

</style>
