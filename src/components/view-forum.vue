<template>
    <div id="forumpage">
        <h2>Current user: {{userCreds.email}}</h2>
        <div id="notes" v-if="res">
            <div v-for="el in res" :key="el" class="note">
                <p> {{el[0]}} </p> 
                <p> {{el[1]}} </p>
                <p> {{el[2]}} </p>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from "@/main"


const userCreds = JSON.parse(sessionStorage.getItem('userCreds'));
const res = ref();


onMounted( async () => {
    await getAllNotes();
})


const getAllNotes = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "test-users"));
        res.value = querySnapshot;

        let arr = [];  //convert    
        querySnapshot.forEach((doc) => { 
            //console.log(`${doc.id} => ${doc.data()}`);                     
            const note = {
                id: doc.id,
                notes: doc.data().notes
            };
            arr.push(note);
        });
       
        res.value = convertRes(arr);

    } catch (error) {
        console.error(error);
    }        
}

const convertRes = (arr) => {
    console.log(arr);

    let arr1 = [];
    
    arr.forEach(el => {
        for (const key in el.notes) {
            //console.log(`Key: ${key}, Value: ${el.notes[key]}`);
            let obj = [ el.id, key, el.notes[key] ];

            arr1.push(obj);
        }
    });
    
    return arr1;
}


</script>


<style scoped>

.note {
    background: gray;
    border: 1px dashed black;
}
.note p {
    margin: 2px;
}

</style>
