// content.js
// Author:
// Author URI: https://
// Author Github URI: https://www.github.com/
// Project Repository URI: https://github.com/
// Description: Handles all the webpage level activities (e.g. manipulating page data, etc.)
// License: MIT

function getPwdInput() {
    const allInputs = document.getElementsByTagName("input");
    
    let pwdInput;
    for(let i = 0; i < allInputs.length; i++) {
        if(allInputs[i].type.toLowerCase() === "password") {
            pwdInput = allInputs[i];
            break;
        }
    }

    return pwdInput;
}

// document.addEventListener("DOMContentLoaded", () => {
    const pwdInput = getPwdInput();
    pwdInput.addEventListener("blur", e => {
        const userPwd = e.currentTarget.value;
        console.log(`User entered password: ${userPwd}`);

        chrome.runtime.sendMessage({ message: "user_entered_password", value: userPwd });
    })
// })