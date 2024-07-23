import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDTZ_pdPnQwpGsMRPup8py5B46u_V4v5lU",
    authDomain: "facegram-58fa6.firebaseapp.com",
    projectId: "facegram-58fa6",
    storageBucket: "facegram-58fa6.appspot.com",
    messagingSenderId: "505428196443",
    appId: "1:505428196443:web:66a69aabb3d38eb5a7137e",
    measurementId: "G-JSJDD3EQL0"
  }

  const app = initializeApp(firebaseConfig)
  const firebaseStore = getStorage(app)
  export { firebaseStore } 
