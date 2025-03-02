import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, set, ref, onValue } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";
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
/*document.getElementById("logout-btn").addEventListener("click", (event) => {
    event.preventDefault(); 
    const auth2 = getAuth();
    auth2.signOut()
    console.log("Signing out " + JSON.stringify(globaluser))
    signOut(auth2).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        console.log("An error occurred signing out")
      });
});*/

/*document.getElementById("salt-btn").addEventListener("click", (event) => {
    //const url = "https://www.instagram.com/";
    const url = document.getElementById("site").innerText;
    console.log("Salt clicked");
    //event.preventDefault(); 
    console.log(globaluser);
    //fetchSalt(globaluser.uid, url);

    setSaltPepper(globaluser.uid, url, "XXXXXXXXXXXX", "YYYYYYYYYYYYYY")

    fetchSalt(globaluser.uid, url)
});*/

function querySeasoning(userWebsite){
    setSaltPepper(globaluser.uid, userWebsite, "XXXXXXXXXXXX", "YYYYYYYYYYYYYY")
    fetchSalt(globaluser.uid, userWebsite)
}


/*
// Fetch data from database
function fetchData(userId) {
    const colorRef = ref(database, `users/${userId}/favoriteColor`);
    onValue(colorRef, (snapshot) => {
        const color = snapshot.val();
        document.getElementById("fav-color").innerText = color ? color : "Not set";
    });
}*/

function setSaltPepper(userId, userWebsite, salt, pepper) {
    if (!userWebsite) {
        console.error("userWebsite is not defined");
        return;
    }

    set(ref(database, 'users/' + userId + '/' + userWebsite.replaceAll('.', '_').replace("https://", "")), {
        "salt": salt,
        "pepper" : pepper
        
    });
}


function fetchSalt(userId, userWebsite) {
    if (!userWebsite) {
        console.error("userWebsite is not defined");
        return;
    }
    console.log(userWebsite)
    userWebsite = userWebsite.replaceAll('.', '_').replace("https://", "")
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
    userWebsite = userWebsite.replaceAll('.', '_').replace("https://", "")
    onValue(pepperRef, (snapshot) => {
        const pepper = snapshot.val();
        console.log("Fetched pepper:", pepper);
        document.getElementById("pepper-value").innerText = pepper ? pepper : "No pepper value found";
    });
}

/*************************************************** */

// "Process" button click handler
document.getElementById("processBtn").addEventListener("click", () => {
    const input = document.getElementById("userInput").value.trim();
    const outputElem = document.getElementById("output");
  
    if (input) {
      // Example processing: Base64-encode the input
      const encoded = btoa(input);
      outputElem.innerText = `Processed (Base64): ${encoded}`;
      outputElem.style.color = "#2f3e46";
    } else {
      outputElem.innerText = "Please enter valid input.";
      outputElem.style.color = "red";
    }
  });
  
  // "Sign In" button click handler (placeholder)
  document.getElementById("signInBtn").addEventListener("click", () => {
    alert("Sign-In functionality not implemented yet!");
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    getCurrentTabUrl();
});

function getCurrentTabUrl() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length === 0) {
            console.error("No active tabs found");
            return;
        }
        
        const currentUrl = tabs[0].url;
        console.log("Current URL:", currentUrl);
        
        // Update the HTML element with the current site URL
        //document.getElementById("site").innerText = currentUrl;
        querySeasoning(currentUrl)
    });
}
