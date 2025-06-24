/* used to create the snackbar things, thanks w3schools */
var hasInit = false;
export function createSnackbar(text) {
    if (!hasInit) initSnackbar();
    hasInit.textContent = text || "Operation successful!";
    hasInit.className = "show";
    setTimeout(function(){
        hasInit.className = hasInit.className.replace("show", "");
    }, 3000);
}

function initSnackbar() {
    if (hasInit) return;
    const snackbar = document.createElement("div");
    snackbar.setAttribute("id", "snackbar");
    document.body.appendChild(snackbar);
    hasInit = snackbar;
}