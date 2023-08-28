<template>
    <div class="fb-storage">
        <p>{{userCreds.email}} 
            <button type="button" @click="getImageURL()" style="float: right;">GetImg</button>   
        </p>
        <img :src="avaLink" width="100" height="100"/>
        <div class="upload">
            <input type="file" accept="image/png" ref="uplImg">
            <button type="button" @click="uplAva()" >Upload img</button>  
        </div>
    </div>
</template>


<script setup> /* eslint-disable no-unused-vars */
import { ref, defineProps } from "vue";
import { getStorage, ref as stRef, getDownloadURL, uploadBytes} from "firebase/storage";

import { storage } from "@/main"

const props = defineProps({
    userCreds: Object,
});

const avaLink = ref("");
const uplImg = ref(null);


const getImageURL = async () => {
    try {        
        const imgRef = stRef( storage, "test-users/"+props.userCreds.uid.toString()+".png");
       
        const dlURL = await getDownloadURL(imgRef);
        avaLink.value = dlURL;
    } catch (error) {
        console.error('Error getting download URL:', error);
    }
}


const uplAva = async () => {
    const pathRef = stRef(storage, "test-users/"+props.userCreds.uid.toString()+".png");

    try {
        uploadBytes(pathRef, uplImg.value.files[0]);
    } catch (error) {
        console.error("Can't upload:", error);
    }
}

</script>


<style scoped>
    .upload{
        border: 1px dashed black;
        display: flexbox;
    }
</style>