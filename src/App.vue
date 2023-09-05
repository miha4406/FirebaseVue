<!-- eslint-disable prettier/prettier -->
<template>
  <h1>Vue + Firebase test app</h1>

  <fbAuth @login="credsHandler" @logout="logoutHandler" @register="regHandler" />
  
  <div v-if="userCreds.uid"  class="nav">
    <div>
      <router-link to="/"> HOME </router-link>
    </div>
    <div>
      <router-link to="/user"> MyPAGE </router-link>
    </div>
    <div>
      <router-link to="/forum"> FORUM </router-link>
    </div>
    
  </div>

  <router-view  />

</template>

<script>
import fbAuth from "./components/fb-auth.vue";
//import fbFstore from "./components/fb-firestore.vue";
//import fbStorage from "./components/fb-storage.vue"

export default {
  name: "App",
  components: {
    fbAuth, //fbFstore, fbStorage
  },

  data() {
    return {
      userCreds: {},
    };
  },

  methods: {

    credsHandler(value) {
      this.userCreds = value;
      sessionStorage.setItem('userCreds', JSON.stringify(value));

      this.$router.push("/user");
    },    

    logoutHandler() {
      this.userCreds = {};

      this.$router.push("/");
    },

    regHandler(value) {
      this.userCreds = value;
      sessionStorage.setItem('userCreds', JSON.stringify(value));

      this.$router.push({path: "/user", query: { new: true } }); //?new=true
    }
  },
};
</script>



<style>
  #app {
    margin-left: 10px;
    max-width: 95%;
    border: 2px double black;
    padding: 5px;
  }

  .nav{
    align-content: space-around;
  }
  .nav div{
    display: inline-block;
    border: 1px solid black;
    margin: 5px 4px;
  }
</style>
