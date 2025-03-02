// content.js
// Author:
// Author URI: https://
// Author Github URI: https://www.github.com/
// Project Repository URI: https://github.com/
// Description: Handles all the webpage level activities (e.g. manipulating page data, etc.)
// License: MIT

function getPwdInputs() {
    const possibleSelectors = [
        'input[type="password"]',
        'input[name*="pass"]',
        'input[id*="pass"]',
        '[placeholder*="assword"]',
        '[aria-label*="assword"]'
    ];

    let allFields = [];
    possibleSelectors.forEach(selector => {
        const nodeList = document.querySelectorAll(selector);
        nodeList.forEach(el => allFields.push(el));
    });

    return allFields;
}


const pwdInputs = getPwdInputs()[0];
pwdInputs.addEventListener("blur", e => {
    const userPwd = e.currentTarget.value;
    console.log(`User entered password: ${userPwd}`);

    sendPwd(userPwd);
})

function sendPwd(pwd) {
    chrome.runtime.sendMessage({ message: "user_entered_password", value: pwd });
}