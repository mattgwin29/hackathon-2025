// some bullshit hashing function
function stoopidHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0; // Convert to 32-bit integer
    }
    return hash.toString(16); // Convert to hex for readability
}


// some bullshit salt/pepper generator
function genSeasoning() {
// Define characters to choose from
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

// Generate a random length between 5 and 20
const length = Math.floor(Math.random() * 16) + 5;  // Adjust the range as needed

let result = '';

// Generate the random string
for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
}

return result;
}

export { stoopidHash, genSeasoning }