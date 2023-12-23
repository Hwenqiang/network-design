<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <router-link v-if="$store.state.is_login" class="navbar-brand" :to="{name:'home'}">聊天室</router-link>
            <router-link v-else class="navbar-brand" :to="{name:'login'}">聊天室</router-link>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
              <ul class="navbar-nav" v-if="!$store.state.is_login">
                <li class="nav-item">
                  <router-link class="nav-link active" aria-current="page" :to="{name:'login'}">Home</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" :to="{name:'login'}" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    登陆
                  </router-link>
                </li>
              </ul>
                <!-- 上面是未登录状态   下面是已登录状态 -->
              <ul class="navbar-nav" v-else>
                <li class="nav-item">
                  <router-link class="nav-link active" aria-current="page" :to="{name:'home'}">{{ $store.state.username }}</router-link>
                </li>
                <li class="nav-item">
                  <router-link @click="logout" class="nav-link" :to="{name:'login'}" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    退出
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    </div>
</template>

<script>
import { useStore } from 'vuex';
export default{
    name:'NavBar',
    setup(){
        const store = useStore();
        const login = store.state.is_login;

        const logout = () => {
          store.commit('logout');
        }
        return {
          logout,
        }
    }
}
</script>

