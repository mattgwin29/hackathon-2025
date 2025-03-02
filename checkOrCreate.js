import { database } from "./firebase.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";
import { hashPassword } from "./hashing.js";

async function checkOrCreateSaltPepper(userId, domain, plainPassword) {
  const pathRef = ref(database, `users/${userId}/${domain}`);
  const snapshot = await get(pathRef);

  if (snapshot.exists()) {
    // If salt & pepper exist, let's read them
    const { salt, pepper } = snapshot.val();
    console.log(`Already have salt & pepper for ${domain}:`, { salt, pepper });

    // Just for demonstration, you could compute a local hash:
    const hash = bcrypt.hashSync(pepper + plainPassword, salt);
    console.log(`Local hash from DB's salt/pepper + provided password: ${hash}`);
  } else {
    console.log(`No salt/pepper found for ${domain}. Creating them now...`);
    // Call your existing hashPassword function
    await hashPassword(userId, domain, plainPassword);
  }
}

export { checkOrCreateSaltPepper };
