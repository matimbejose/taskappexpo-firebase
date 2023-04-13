import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/database'


const firebaseConfig = {
    apiKey: "AIzaSyDKmfTZC_1jM5SVHdsYCtRG7E_6rfxMs84",
    authDomain: "apptarefas-a3de6.firebaseapp.com",
    projectId: "apptarefas-a3de6",
    storageBucket: "apptarefas-a3de6.appspot.com",
    messagingSenderId: "906256995359",
    appId: "1:906256995359:web:3da66f96f5f7156410712a",
    measurementId: "G-2ZJVXDBK4R"
  };
  


  
  if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
export default firebase;