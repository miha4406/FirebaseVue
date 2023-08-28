import { createApp } from "vue";
import App from "./App.vue";

import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore/lite';
import { getStorage } from "firebase/storage"; 
//import axios from "axios";

import { firebaseConfig } from "./keys/firebase.config";

const fb = initializeApp(firebaseConfig);
const db = getFirestore(fb);
const storage = getStorage(fb);


createApp(App).mount("#app");

export {
    db, storage
}
