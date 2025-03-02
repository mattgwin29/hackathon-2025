import { database } from "./firebase.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";
import { hashPassword } from "./hashing.js";
import  "./hashing.js";
import { hashpw } from "./bcrypt.js";


export async function checkOrCreateSaltPepper(userId, domain, plainPassword) {
  // Return a Promise so we can retrieve the final substring outside
  return new Promise((resolve, reject) => {
    domain = domain.replaceAll(".", "_");
    const pathRef = ref(database, `users/${userId}/${domain}`);
    
    get(pathRef)
      .then(async (snapshot) => {
        if (snapshot.exists()) {
          const { salt, pepper } = snapshot.val();
          console.log(salt, pepper);

          hashpw(pepper + plainPassword, salt, async (hash) => {
            const finalPassword = hash.substring(45, 60);
            document.getElementById("output").innerText = `Your 3FA password: ${finalPassword}`;
            resolve(finalPassword);
          });
        } else {
          const finalPassword = await hashPassword(userId, domain, plainPassword);
          document.getElementById("output").innerText = `Your 3FA password: ${finalPassword}`;
            resolve(finalPassword);
        }
      })
      .catch((err) => {
        console.error("Error in checkOrCreateSaltPepper:", err);
        reject(err);
      });
  });
}