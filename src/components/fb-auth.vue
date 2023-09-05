<template>
  <div class="fb-auth">
    <div v-if="user">
      <p>{{ user.uid }}</p>
      <button type="button" @click="logout()">SignOut</button>
    </div>
    <div v-else>
      <p>LogIn:</p>
      <form @submit.prevent="login()">
        <input type="email" v-model="email" placeholder="User email" />
        <input type="password" v-model="pass" placeholder="Password" />
        <button type="submit">LogIn</button>
      </form>
      <button type="button" @click="register()">SignUp</button>
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted, defineEmits } from "vue";
// eslint-disable-next-line prettier/prettier
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";


const user = ref();
let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (creds) => {
    user.value = creds;
  });
});

const email = ref("");
const pass = ref("");
const emits = defineEmits(["login", "logout"]);


const login = () => {
  signInWithEmailAndPassword(getAuth(), email.value, pass.value)
    .then((data) => {
      //alert("Logged UID: " + data.user.uid);      
      emits("login", data.user);      
      //router.push({ path: "/user"});
    })
    .catch((error) => alert(error.message));
};

const logout = () => {
  email.value = "";
  pass.value = "";
  signOut(auth);
  emits("logout");
};

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, pass.value)
    .then((data) => {
      alert("Created UID: " + data.user.uid);
      emits("register", data.user);
    })
    .catch((error) => alert(error.message));
};
</script>



<style scoped>
  .fb-auth {
    background: grey;
  }
</style>
