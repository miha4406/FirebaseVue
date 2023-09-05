<template>
    <div id="userpage">
        <h2>{{userCreds.uid}}</h2>
        <fbStorage :userCreds=userCreds :isNewUser=isNewUser />
        <fbFstore  :userCreds=userCreds :isNewUser=isNewUser />
    </div>
</template>


<script setup>
import fbFstore from "./fb-firestore.vue"
import fbStorage from "./fb-storage.vue"
import { useRoute } from 'vue-router';


const userCreds = JSON.parse(sessionStorage.getItem('userCreds'));
const isNewUser = useRoute().query.new || false;

</script>
