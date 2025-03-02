export function detectPasswordInDOM(){
    var elements = document.getElementsByTagName('input');
    console.log("Entered detectPasswordInDOM");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].type == "password"){
            console.log(elements[i]);
        }
    }        
}

/*chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        detectPasswordInDOM()
      // do your things
  
    }
  })

/*document.getElementById("test").addEventListener("click", (event) => {
    console.log("Test button clicked")
    detectPasswordInDOM()
});*/

