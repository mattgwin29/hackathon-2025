import bcrypt from 'bcrypt';

// TODO: Initialize Firebase 

const saltRounds = 10;
const pepperRounds = 5;

let userDatabase = {}; //will get it from firebase

async function hashPassword(userId, plainPassword) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const pepper = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(pepper + plainPassword, salt);
    console.log(pepper, "pepper");
    console.log(salt, "salt");
    console.log(hash, "hash");

    // TODO: make it firebase bitch
    userDatabase[userId] = { pepper, salt, hash }; 

    console.log('You don"t suck');
  } catch (error) {
    console.error('You suck didn"t work', error);
  }
}

async function verifyPassword(userId, plainPassword) {
  try {
    // TODO: find user
    const userData = userDatabase[userId]; 

    if (!userData) {
      console.log("You don't exist");
      return false;
    }

    const { hash } = userData;
    const { pepper } = userData;

    const isMatch = await bcrypt.compare(pepper + plainPassword, hash);

    console.log(isMatch ? 'Password is valid!' : 'Invalid password.');
    return isMatch;
  } catch (error) {
    console.error('You suck', error);
    return false;
  }
}

//you can test it now

// (async () => {
//   const userId = 'qdqdbqjdq'; 
//   const plainPassword = 'cyberfrdqwdqwat';

//   await hashPassword(userId, plainPassword); 
//   await verifyPassword(userId, plainPassword);
// })();
