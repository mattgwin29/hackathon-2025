// content.js
// Author:
// Author URI: https://
// Author Github URI: https://www.github.com/
// Project Repository URI: https://github.com/
// Description: Handles all the webpage level activities (e.g. manipulating page data, etc.)
// License: MIT

const pwdInput = getPwdInput();

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



getPwdInput().addEventListener("blur", e => {
    console.log(e.currentTarget.value);
});