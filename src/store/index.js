import { createStore } from 'vuex'
const axios = require('axios');
export default createStore({
  state: {
    is_login : false,
    username : "",
    // count : 0,
  },
  getters: {
  },
  mutations: {
    login(state,username){
      state.username = username,
      state.is_login = true;
    },
    logout(state){
      state.is_login = false;
      state.username = "";
    }
  },
  actions: {
    // login(context,data){
    //   let username = data.username;
    //   console.log(username);
    //   axios({
    //     //请求类型
    //     method: 'GET',
    //     url: ' http://localhost:3000/user',
    //   }).then(response => {
    //       let f = false;
    //       for(let i = 0;i < response.data.length;i++){
    //         if(response.data[i] === username){
    //           f = true;
    //           break;
    //         }
    //       }
    //       console.log('axios+'+username);
    //       if(!f){
    //         console.log('axios+'+username);
    //         axios({
    //           method: 'POST',
    //           url: ' http://localhost:3000/user',
    //           //设置请求体
    //           data: {
    //               //不需要写id
    //               username: username,
    //           }
    //         })
    //       }
    //       context.commit("login",username);
    //   });
    // }
  },
  modules: {
  }
})
