<template>
  <ContentBase>
      <div class="row" style="width: 700px;">
        <div class="col-3" style="width:150px; background-color: lightblue;">
          <div>UserList : {{ userList.length+1 }} </div>
          <hr>
          <div>{{ username }}</div>
          <div v-for="(item,index) in userList" :key="index"> {{ item }} </div>
        </div>
        <div class="col-9" style="height:500px; width: 550px;  padding: 0px 0px;">
          <div id="ltk"> 
            <ul>
              <li v-for="item of msgList" :key="item.id" style="list-style: none; height: 80px;">
                <div>      
                  <span style="display: block; text-align: center; font-size: small;">{{ item.dataTime }}</span> 
                  <span v-if="item.user === username" 
                    style="display: block; text-align: right; padding-right: 50px; padding-top: 0; font-size: small;">
                    {{ item.user }}
                  </span>
                  <span v-else style="text-align: left;">
                    {{ item.user }}
                  </span>
                </div>
                <div v-if="item.user === username" 
                  style="display: block; text-align: right; padding-right: 50px;">
                  {{ item.msg }}
                </div>
                <div v-else style="text-align: left;">
                  {{ item.msg }}
                </div>

              </li>
            </ul>
          </div>
          <div class="input">
            <input type="text" placeholder="输入消息" v-model="msg"/>
            <button @click="handleSend">发送</button>
          </div>
        </div>
      </div>
  </ContentBase>

</template>

<script>
import { reactive,toRefs,onMounted,ref } from 'vue';
import { useRouter } from 'vue-router';
import useWebSocket from '../hooks/websocket.js'
import store from '@/store';
import ContentBase from '@/components/ContentBase.vue';
import LoginView from './LoginView.vue';

export default {
  name: 'HomeView',
  components:{
    ContentBase,
  },
  setup(){
    const router = useRouter();
    
    const state = reactive({
      msg:'',
      msgList:[],
    });

    let userList = ref([]);
    let username = sessionStorage.getItem('username');
    onMounted(() => {
      if(!username || store.state.is_login===false){
        router.push('/login');
        return ;
      }
      //实现实时滚动
      setInterval(()=>{
        var e = document.getElementById('ltk');
        e.scrollTop = e.scrollHeight;
        //scrollTop：指的是滚动条卷去的距离（滚动条向下滚动之后距离顶部的距离）
        //scrollHeight：指的是内容的高度
      },20)
    })
    const ws = useWebSocket(handleMessage,username);
    const handleSend = () => {
      const _msg = state.msg;
      if(!_msg.trim().length){
        return ;//空
      }
      let time = new Date();
      ws.send(JSON.stringify({
        id: time.getTime(),
        user: username,
        dataTime:`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
        msg:state.msg,
      }));
      state.msg = '';
    }

    function handleMessage(e){
      const _msgData=JSON.parse(e.data);
      if(_msgData.tag === 'userUpdate'){
          for(let i = 0;i < _msgData.userList.length;i++){
            var f = false;
            for(let j = 0;j < userList.value.length;j++){
              if(userList.value[j] === _msgData.userList[i]){
                f = true;
                break;
              }
            }
            if(!f)
              userList.value.push(_msgData.userList[i]);
          }
      }else if(_msgData.tag === 'msgUpdate'){
        if(state.msgList.length === 0)
          console.log(_msgData.chatList.length);
          for(let i = 0;i < _msgData.chatList.length;i++){
            state.msgList.push(_msgData.chatList[i]);
          }
      }
      else
        state.msgList.push(_msgData);
      userList.value = userList.value.filter(item=>item!==username);
      
    }


    return {
      ...toRefs(state),  //平铺开state
      handleSend,
      userList,
      username,
    }
  }
}
</script>

<style scoped>

.input{
  height: 100px; 
  border: 2px solid black;
  padding: 30px;
  background-color: whitesmoke;
}

#ltk{
  height: 400px; 
  width: 550px;
  overflow-y: auto;  
  /* auto : 根据需要显示滚动条   scroll不需要的时候也会显示 */
  background-color: green;
  /* background-image: url('../assets/background.png');
  background-size: cover;
  background-repeat: no-repeat;
  border: 2px solid black; */
}
</style>
