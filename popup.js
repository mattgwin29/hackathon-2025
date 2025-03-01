// popup.js

// === PROCESS BUTTON: Base64 encode + Show current URL
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

  // Query the active tab to get the URL
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs && tabs.length > 0) {
      const currentTabUrl = tabs[0].url;
      outputElem.innerText += `\nCurrent Website: ${currentTabUrl}`;
    }
  });
});

// === SIGN-IN BUTTON: Real OAuth flow
document.getElementById("signInBtn").addEventListener("click", () => {
  // We'll request the background page to start the OAuth flow
  chrome.runtime.sendMessage({ action: "startOAuth" }, (response) => {
    const outputElem = document.getElementById("output");

    if (!response) {
      outputElem.innerText = "No response from background. Possibly an error.";
      return;
    }

    if (response.success) {
      const googleAccessToken = response.token;
      outputElem.innerText = `Sign-In Successful!\nAccess Token: ${googleAccessToken}`;
      // TODO: If you want to pass this token to Firebase or do something else, you can do it here.
    } else {
      outputElem.innerText = `OAuth failed: ${response.error}`;
      outputElem.style.color = "red";
    }
  });
});
