import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDryzykMjr0yxq8ju8229Ko2VRsIW2G08M",
    authDomain: "easythreeway.firebaseapp.com",
    databaseURL: "https://easythreeway-default-rtdb.firebaseio.com",
    projectId: "easythreeway",
    storageBucket: "easythreeway.firebasestorage.app",
    messagingSenderId: "583678349837",
    appId: "1:583678349837:web:6559dc90d098e8b93bfb44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Sign in with Google
document.getElementById("login-btn").addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            document.getElementById("user-info").innerText = `Logged in as: ${user.displayName}`;
            fetchData(user.uid);
        })
        .catch((error) => {
            console.error("Authentication error:", error);
        });
});

// Fetch data from database
function fetchData(userId) {
    const colorRef = ref(database, `users/${userId}/favoriteColor`);
    onValue(colorRef, (snapshot) => {
        const color = snapshot.val();
        document.getElementById("fav-color").innerText = color ? color : "Not set";
    });
}