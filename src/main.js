import { createApp } from "vue";
import App from "./App.vue";

import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore/lite';
import { getStorage } from "firebase/storage"; 
//import axios from "axios";
import { createRouter, createWebHashHistory } from 'vue-router'; 

import { firebaseConfig } from "./keys/firebase.config";
//import fbAuth from "@/components/fb-auth.vue";
import userPage from "@/components/view-user.vue";
import forumPage from "@/components/view-forum.vue";


const fb = initializeApp(firebaseConfig);
const db = getFirestore(fb);
const storage = getStorage(fb);

const router = createRouter({
    history: createWebHashHistory(), //?
    routes: [
      {
        path: "/",         
      },
      { //storage and db
        path: "/user",
        component: userPage 
      },
      { //all from db
        path: "/forum",
        component: forumPage 
      },
      
    ],
});


createApp(App).use(router).mount("#app");

export {
    db, storage
}
