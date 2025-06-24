/* 
used to create the snackbar things, thanks w3schools
https://www.w3schools.com/howto/howto_js_snackbar.asp
*/
var hasInit = false;
export function createSnackbar(text) {
    if (!hasInit) initSnackbar();
    hasInit.textContent = text || "Operation successful!";
    hasInit.className = "show";
    setTimeout(function(){
        hasInit.className = hasInit.className.replace("show", "");
    }, 3000);
}

function checkForSnack() {
    const snack = document.getElementById("convertbox-status-snackbar");
    if (snack) snack.remove();
}

function initSnackbar(hideLogo = false) {
    checkForSnack();
    const snackbar = document.createElement("div");
    snackbar.setAttribute("id", "convertbox-status-snackbar");
    if (!hideLogo) {
        const img = document.createElement("img");
        img.src = chrome.runtime.getURL("./src/assets/ConvertBox_logo.png");
        img.style.width = "32px";
        img.style.height = "32px";
        snackbar.appendChild(img);
    }
    document.body.appendChild(snackbar);
    hasInit = snackbar;
}