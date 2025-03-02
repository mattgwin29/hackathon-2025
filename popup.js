// popup.js
import { auth, provider } from "./firebase.js";
import { signInWithPopup } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { checkOrCreateSaltPepper } from "./checkOrCreate.js";

document.getElementById("login-btn").addEventListener("click", async (event) => {
  event.preventDefault();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("User signed in:", user);
    document.getElementById("user-info").innerText = `Logged in as: ${user.displayName}`;

    // After sign-in, get the current tab domain
    getCurrentTabDomain(async (domain) => {
      if (!domain) {
        console.error("No domain found from current tab!");
        return;
      }

      // Provide a password to check or create salt/pepper
      // In reality, you'd get this from user input, or generate it. This is just an example.
      const plainPassword = "cybersecure";

      await checkOrCreateSaltPepper(user.uid, domain, plainPassword);
    });
  } catch (error) {
    console.error("Authentication error:", error);
  }
});


document.getElementById("processBtn").addEventListener("click", async () => {
  const input = document.getElementById("userInput").value.trim();
  const outputElem = document.getElementById("output");

  // 1. Validate that a password was provided
  if (!input) {
    outputElem.innerText = "Please enter a valid password.";
    return;
  }

  // 2. Check if the user is logged in
  const user = auth.currentUser;
  if (!user) {
    outputElem.innerText = "You must be signed in first!";
    return;
  }

  // 3. Retrieve current tab domain
  getCurrentTabDomain(async (domain) => {
    if (!domain) {
      outputElem.innerText = "Could not retrieve domain!";
      return;
    }
    try {
      await checkOrCreateSaltPepper(user.uid, domain, input);
      outputElem.innerText = `Salt & Pepper logic done for domain: ${domain}`;
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
