<template>
    <div class="fb-storage">
        <p>{{userCreds.email}} 
            <button type="button" @click="getImageURL()" style="float: right;" disabled>GetImg</button>   
        </p>
        <img :src="avaLink" width="100" height="100"/>
        <div class="upload">
            <input type="file" accept="image/png" ref="uplImg">
            <button type="button" @click="uplAva()" >Upload img</button>  
        </div>
    </div>
</template>


<script setup> /* eslint-disable no-unused-vars */
import { ref, defineProps, onMounted } from "vue";
import { getStorage, ref as stRef, getDownloadURL, uploadBytes} from "firebase/storage";
import { storage } from "@/main"


const props = defineProps({
    userCreds: Object,
    isNewUser: Boolean //?
});

const avaLink = ref("");
const uplImg = ref(null);


onMounted( async () => {  
  
    await getImageURL();
} )


//methods
const getImageURL = async () => {
   
    try {        
        const imgRef = stRef( storage, "test-users/"+props.userCreds.uid.toString()+".png");
    
        const dlURL = await getDownloadURL(imgRef);
        avaLink.value = dlURL;
    } catch (error) {            
        if (error.code === 'storage/object-not-found') {
            try {        
                const imgRef = stRef( storage, "test-users/test-user.png");
            
                const dlURL = await getDownloadURL(imgRef);
                avaLink.value = dlURL;
            } catch(error){
                console.error('FB Storage error2:', error);
            }
        } else {
            console.error('FB Storage error1:', error);
        }        
    }    
}


const uplAva = async () => {
    const pathRef = stRef(storage, "test-users/"+props.userCreds.uid.toString()+".png");

    try {
        uploadBytes(pathRef, uplImg.value.files[0]);
    } catch (error) {
        console.error("Can't upload:", error);
    }

    await getImageURL();
}

</script>


<style scoped>
    .upload{
        border: 1px dashed black;
        display: flexbox;
    }
</style>