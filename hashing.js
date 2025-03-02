import { auth, database } from "./firebase.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

console.log(auth, database)
const saltRounds = 10;

export async function hashPassword(userId, website, plainPassword) {
    try {
      const salt = bcrypt.genSaltSync(saltRounds);
      const pepper = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(pepper + plainPassword, salt);
  
      console.log("pepper:", pepper);
      console.log("salt:", salt);
      console.log("hash:", hash);
  
      const dbPath = `users/${userId}/${website}`;
  
      await set(ref(database, dbPath), {
        salt,
        pepper
      });
  
      console.log("Successfully stored salt & pepper in Firebase!");
      console.log("Local hash (not stored in Firebase):", hash);
    } catch (error) {
      console.error("Error hashing/storing password:", error);
    }
  }

  
  