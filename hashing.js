import { auth, database } from "./firebase.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";
import { hashpw, gensalt } from "./bcrypt.js";


export async function hashPassword(userId, website, plainPassword) {
  // Return a Promise so calling code can get the final password
  return new Promise((resolve, reject) => {
    try {
      const salt = gensalt(10);          // Generate a salt (rounds=10)
      const pepper = genSeasoning();     // Generate a pepper (your custom function)
      const dbPath = `users/${userId}/${website}`;

      // hashpw is asynchronous; use its callback to resolve the Promise
      hashpw(pepper + plainPassword, salt, async (hash) => {
        try {
          // Store salt and pepper in the database
          await set(ref(database, dbPath), {
            salt,
            pepper
          });
          const finalPassword = hash.substring(45, 60);
          
          // Update the DOM for immediate user feedback
          document.getElementById("output").innerText = `Your 3FA password: ${finalPassword}`;
          
          // Resolve the Promise with the final password so other code can use it
          resolve(finalPassword);
        } catch (dbError) {
          console.error("Error storing salt/pepper:", dbError);
          reject(dbError);
        }
      });
    } catch (error) {
      console.error("Error hashing/storing password:", error);
      reject(error);
    }
  });
}

  function genSeasoning() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    const length = Math.floor(Math.random() * 16) + 5;
  
    let result = '';
  
    for(let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }
