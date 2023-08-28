<!-- eslint-disable prettier/prettier -->
<template>
  <fbAuth userName="" @signout="userSignOut()" @gotCreds="credsHandler" @logout="logoutHandler" />
  
  <fbStorage :userCreds=this.userCreds />
  
  <fbFstore :userCreds=this.userCreds />
</template>

<script>
import fbAuth from "./components/fb-auth.vue";
import fbFstore from "./components/fb-firestore.vue";
import fbStorage from "./components/fb-storage.vue"

export default {
  name: "App",
  components: {
    fbAuth, fbFstore, fbStorage
  },

  data() {
    return {
      userCreds: {},
    };
  },

  methods: {
    userSignOut() {
      this.userCreds = {};
      alert("logout");
    },
    credsHandler(value) {
      this.userCreds = value;
    },
    logoutHandler() {
      this.userCreds = {};
    },
  },
};
</script>

<style>
#app {
  margin-left: 10px;
  max-width: 50%;
}
</style>
