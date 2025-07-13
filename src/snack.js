/*
 * Copyright (c) 2025 solarcosmic.
 * This project is licensed under the MIT license.
 * To view the license, see <https://opensource.org/licenses/MIT>.
*/
// src/snack.js - Snackbar at the bottom of the viewport when needed.
/* 
used to create the snackbar things, thanks w3schools
https://www.w3schools.com/howto/howto_js_snackbar.asp
*/
var hasInit = false;
/*
 * Creates the snackbar that shows at the bottom of the viewport.
*/
export function createSnackbar(text) {
    if (!hasInit) initSnackbar();
    hasInit.textContent = text || "Operation successful!";
    hasInit.className = "show";
    setTimeout(function(){
        hasInit.className = hasInit.className.replace("show", "");
    }, 3000);
}

/*
 * Checks for the snackbar on the current page and removes it.
 * This makes me realise that this should probably be in a shadow DOM, but oh well.
*/
function checkForSnack() {
    const snack = document.getElementById("convertbox-status-snackbar");
    if (snack) snack.remove();
}

/*
 * Initialises the snackbar.
*/
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