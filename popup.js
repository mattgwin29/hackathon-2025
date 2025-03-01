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
  