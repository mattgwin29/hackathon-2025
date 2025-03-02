import { auth, database } from "./firebase.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";
import { hashpw, gensalt } from "./bcrypt.js";


export async function hashPassword(userId, website, plainPassword) {
    try {
      const salt = gensalt(10);
      const pepper = genSeasoning();
      hashpw(pepper+plainPassword, salt, async hash => {
        const dbPath = `users/${userId}/${website}`;
  
        await set(ref(database, dbPath), {
          salt,
          pepper
        });
    
        document.getElementById("output").innerText = `Your 3FA password: ${hash.substring(45, 60)}`;
      }, undefined);

    } catch (error) {
      console.error("Error hashing/storing password:", error);
    }
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
