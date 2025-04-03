// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD84tqid1ISUWiHQk72M4NrhkQ7-HvrCRc",
    authDomain: "esmart-solutions-agency-9016b.firebaseapp.com",
    projectId: "esmart-solutions-agency-9016b",
    storageBucket: "esmart-solutions-agency-9016b.firebasestorage.app",
    messagingSenderId: "958089998578",
    appId: "1:958089998578:web:03cada8e661c964f9d606b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Khởi tạo các service
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Export các service cần dùng
export { app, auth, googleProvider };