<!-- eslint-disable prettier/prettier -->
<template>
  <div class="fb-fstore">
    <h2>User messages: {{userCreds.uid}}</h2>
    <button type="button" @click="getUserNotes()">Refresh</button>
    <button type="button" @click="openAddDialog()" style="float: right;" >Add new</button>

    <dialog id="addDialog" >
        <form @submit.prevent="addNote()">
            <p> Add new note: </p>
            <input type="text" v-model="newNote" placeholder="New note..." />
            <button type="submit">Submit</button>         
        </form>
    </dialog>

    <dialog id="editDialog" >
        <form @submit.prevent="editNote()">
            <p> Edit note:  <button type="button" class="closeBtn" 
                                @click="openEditDialog()">x</button> </p>
            <input type="text" v-model="newNote" />
            <button type="submit">Submit</button>         
        </form>
    </dialog>

    <div id="notes" v-if="res">
        <div v-for="(value, key) in res" :key="key" class="note">
            <p> {{key}}           
                <button type="button" @click="delNote(key)" style="float: right; color: red;">Delete</button> 
                <button type="button" @click="openEditDialog(value, key)" style="float: right;">Edit</button> 
            </p> 
            <p> {{value}} </p>
        </div>
    </div>
  </div>
</template>



<script setup> /* eslint-disable no-unused-vars */
import { ref, defineProps, onMounted, watch } from "vue";
import { collection, doc, getDocs, getDoc, updateDoc } from 'firebase/firestore/lite';
import { db } from "@/main"


const props = defineProps({
    userCreds: Object,
});


const res = ref();
const isDialogA = ref(false);
const newNote = ref("");
const isDialogE = ref(false);
const editKey = ref("");


watch(props.userCreds, () => {
    console.log("props.userCreds");
});


const getUserNotes = async () => {
    try {
        const resDoc = await getDoc(doc(db, "test-users", props.userCreds.uid.toString() ));
        
        if (resDoc.exists()) {
            console.log("Document data:", resDoc.data());
            res.value = resDoc.data().notes;
        } else {
            console.log("No such document!");
        }

    } catch (error) {
        console.error(error);
    }        

}


const openAddDialog = () => {

    if(isDialogA.value){
        document.getElementById("addDialog").close();
    }else{
        document.getElementById("addDialog").show();
    }    

    isDialogA.value = !isDialogA.value;
}

const addNote = async () => {     
    const docRef = doc(db, "test-users", props.userCreds.uid.toString() );
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
        const existingMap = docSnapshot.data().notes;
        let dateString = new Date().toString();
        const newKey = dateString.substring(0, dateString.lastIndexOf('GMT') - 1);

        const updMap = Object.assign( {}, existingMap, { [newKey]: newNote.value } ) ;
        await updateDoc( docRef, { notes: updMap } );

        newNote.value = "";
        document.getElementById("addDialog").close();
    }
    
}


const delNote = async (key) => {
    const docRef = doc(db, "test-users", props.userCreds.uid.toString() );
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
        const oldMap = docSnapshot.data().notes;
        const updMap = { ...oldMap };
        delete updMap[key];
        
        await updateDoc(docRef, { notes: updMap });        
    }
}


const openEditDialog = (text, key) => {
    const dialRef = document.getElementById("editDialog");   

    if(isDialogE.value){
        dialRef.close();
        newNote.value = "";
        editKey.value = "";
    }else{
        dialRef.show();
        newNote.value = text;
        editKey.value = key;
    }    

    isDialogE.value = !isDialogE.value;
}

const editNote = async () => {
    const docRef = doc(db, "test-users", props.userCreds.uid.toString() );
    const docSnapshot = await getDoc(docRef);
    
    if (docSnapshot.exists()) {
        const oldMap = docSnapshot.data().notes;
        const updMap = { ...oldMap, [editKey.value]: newNote.value };

        await updateDoc(docRef, { notes: updMap });

        newNote.value = "";
        document.getElementById("editDialog").close();
    }
}


//forum
const getAllNotes = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "test-users"));
        res.value = querySnapshot;

        let arr = [];  //convert    
        querySnapshot.forEach((doc) => { 
            console.log(`${doc.id} => ${doc.data()}`); 
                    
            const note = {
                id: doc.id,
                notes: doc.data().notes
            };
            arr.push(note);
        });
        res.value = arr;

    } catch (error) {
        console.error(error);
    }        
}

</script>



<style scoped>
.fb-fstore {
    background: aquamarine;
}
.note {
    background: gray;
    border: 1px dashed black;
}
.note p {
    margin: 2px;
}
.closeBtn {
    float: right;
    background-color: brown;
}
dialog p {
    margin-top: 0;
}
</style>
