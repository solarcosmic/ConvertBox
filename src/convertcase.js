import { createSnackbar } from './snack.js';
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.action == "convertToUpperCase") {
        navigator.clipboard.writeText(req["selectionText"].toUpperCase());
        createSnackbar("Copied to clipboard!");
    } else if (req.action == "convertToLowerCase") {
        navigator.clipboard.writeText(req["selectionText"].toLowerCase());
        createSnackbar("Copied to clipboard!");
    } else if (req.action == "convertToTitleCase") {
        navigator.clipboard.writeText(convertToTitleCase(req["selectionText"]));
        createSnackbar("Copied to clipboard!");
    }
});

// Credit: https://www.geeksforgeeks.org/javascript/convert-string-to-title-case-in-javascript/
function convertToTitleCase(text) {
    return text.toLowerCase().split(" ").map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}