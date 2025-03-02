// popup.js
import { auth, provider } from "./firebase.js";
import { signInWithPopup, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { checkOrCreateSaltPepper } from "./checkOrCreate.js";

const loginBtn = document.getElementById("login-btn");
const userInfo = document.getElementById("user-info");

loginBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  if (auth.currentUser) {
    try {
      await signOut(auth);
      console.log("User logged out.");
      updateUI(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  } else {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in:", result.user);
      updateUI(result.user); 
    } catch (error) {
      console.error("Authentication error:", error);
    }
  }
});

function updateUI(user) {
  if (user) {
    loginBtn.innerText = "Logout";
    userInfo.innerText = `Logged in as: ${user.displayName}`;
  } else {
    loginBtn.innerText = "Login";
    userInfo.innerText = "Not logged in.";
  }
}

onAuthStateChanged(auth, (user) => {
  updateUI(user);
});


document.getElementById("processBtn").addEventListener("click", async () => {
  const input = document.getElementById("userInput").value.trim();
  const outputElem = document.getElementById("output");

  if (!input) {
    outputElem.innerText = "Please enter a valid password.";
    return;
  }

  const user = auth.currentUser;
  if (!user) {
    outputElem.innerText = "You must be signed in first!";
    return;
  }

  getCurrentTabDomain(async (domain) => {
    if (!domain) {
      outputElem.innerText = "Could not retrieve domain!";
      return;
    }
    try {
      await checkOrCreateSaltPepper(user.uid, domain, input);
    } catch (err) {
      console.error("Error in checkOrCreateSaltPepper:", err);
      outputElem.innerText = `Error: ${err}`;
    }
  });
});


document.addEventListener("DOMContentLoaded", function () {
  getCurrentTabDomain((domain) => {
    console.log("Detected domain on DOMContentLoaded:", domain);
  });
});


function getCurrentTabDomain(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs.length === 0) {
      callback(null);
      return;
    }
    try {
      const urlObj = new URL(tabs[0].url);
      console.log("domain", urlObj.hostname);
      callback(urlObj.hostname);
    } catch (e) {
      console.error("Error parsing tab URL:", e);
      callback(null);
    }
  });
}
