import { auth, database } from "./firebase.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";
import { hashpw, gensalt } from "./bcrypt.js";

console.log(auth, database)
const saltRounds = 10;

export async function hashPassword(userId, website, plainPassword) {
    try {
      // const salt = bcrypt.genSaltSync(saltRounds);
      // const pepper = bcrypt.genSaltSync(saltRounds);
      // const hash = bcrypt.hashSync(pepper + plainPassword, salt);

      // const salt = genSeasoning();
      const salt = gensalt(10);
      const pepper = genSeasoning();
      hashpw(pepper+plainPassword, salt, async hash => {
        const dbPath = `users/${userId}/${website}`;
  
        await set(ref(database, dbPath), {
          salt,
          pepper
        });
    
        console.log("Successfully stored salt & pepper in Firebase!");
        console.log("Local hash (not stored in Firebase):", hash);
      }, undefined);
      // const hash = ourHash(pepper + plainPassword);

  
      // console.log("pepper:", pepper);
      // console.log("salt:", salt);
      // console.log("hash:", hash);
  
      // const dbPath = `users/${userId}/${website}`;
  
      // await set(ref(database, dbPath), {
      //   salt,
      //   pepper
      // });
  
      // console.log("Successfully stored salt & pepper in Firebase!");
      // console.log("Local hash (not stored in Firebase):", hash);
    } catch (error) {
      console.error("Error hashing/storing password:", error);
    }
  }


  // temporary hashing and salting algorithms until we get bcrypt working
export function ourHash(str) {
  let hash = 0;
  for(let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(16);
}

function genSeasoning() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // generate random length between 5 and 20
  const length = Math.floor(Math.random() * 16) + 5;

  let result = '';

  // Generate random string
  for(let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}