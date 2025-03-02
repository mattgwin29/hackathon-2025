import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, setPersistence, browserLocalPersistence, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

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
let globaluser = null

setPersistence(auth, browserLocalPersistence)
    .then(() => console.log("Auth persistence set to LOCAL"))
    .catch((error) => console.error("Failed to set auth persistence:", error));

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is logged in:", user);
        document.getElementById("user-info").innerText = `Logged in as: ${user.displayName}`;
    } else {
        console.log("No user logged in.");
    }
});

// Sign in with Google
document.getElementById("login-btn").addEventListener("click", (event) => {
    event.preventDefault(); 
    
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            globaluser = user;
            console.log("User signed in:", user);
            document.getElementById("user-info").innerText = `Logged in as: ${user.displayName}`;
        })
        .catch((error) => {
            console.error("Authentication error:", error);
        });
});

// Sign in with Google
document.getElementById("logout-btn").addEventListener("click", (event) => {
    event.preventDefault(); 
    const auth2 = getAuth(app);
    console.log("Signing out " + JSON.stringify(globaluser))
    signOut(auth2).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        console.log("An error occurred signing out")
      });
});

document.getElementById("salt-btn").addEventListener("click", (event) => {
    const url = "https://www.instagram.com/";
    console.log("Salt clicked");
    //event.preventDefault(); 
    console.log(globaluser);
    fetchSalt(globaluser, url);


});


/*
// Fetch data from database
function fetchData(userId) {
    const colorRef = ref(database, `users/${userId}/favoriteColor`);
    onValue(colorRef, (snapshot) => {
        const color = snapshot.val();
        document.getElementById("fav-color").innerText = color ? color : "Not set";
    });
}*/


function fetchSalt(userId, userWebsite) {
    console.log("inside of fetch salt")
    if (!userWebsite) {
        console.error("userWebsite is not defined");
        return;
    }
    const saltRef = ref(database, `users/${userId}/${userWebsite}/salt`);
    onValue(saltRef, (snapshot) => {
        const salt = snapshot.val();
        console.log("Fetched salt:", salt);
        document.getElementById("salt-value").innerText = salt ? salt : "No salt value found";
    });
}

function fetchPepper(userId, userWebsite) {
    if (!userWebsite) {
        console.error("userWebsite is not defined");
        return;
    }
    const pepperRef = ref(database, `users/${userId}/${userWebsite}/pepper`);
    onValue(pepperRef, (snapshot) => {
        const pepper = snapshot.val();
        console.log("Fetched pepper:", pepper);
        document.getElementById("pepper-value").innerText = pepper ? pepper : "No pepper value found";
    });
}
