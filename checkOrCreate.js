import { database } from "./firebase.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";
import { hashPassword } from "./hashing.js";
import  "./hashing.js";
import { hashpw } from "./bcrypt.js";


async function checkOrCreateSaltPepper(userId, domain, plainPassword) {
  domain = domain.replaceAll(".", "_")
  const pathRef = ref(database, `users/${userId}/${domain}`);
  
  get(pathRef).then(async (snapshot) => {
    if (snapshot.exists()) {

      const { salt, pepper } = snapshot.val();
      console.log(salt, pepper);
      hashpw(pepper + plainPassword, salt, async hash => {
        console.log(hash)
        document.getElementById("output").innerText = `Your 3FA password: ${hash.substring(45, 60)}`;
      }, undefined);
    } else {
      await hashPassword(userId, domain, plainPassword);
    }
  });
}

export { checkOrCreateSaltPepper };
