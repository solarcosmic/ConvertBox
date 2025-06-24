import hexRgb from 'hex-rgb';
import { createSnackbar } from './snack.js';

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.action === "convertHexToRGB") {
        hexToRGB(req["selectionText"]);
    }
});

/**
 * Attempts to convert Hex to RGB and copy to clipboard.
 */
async function hexToRGB(text) {
    try {
        const rgb = hexRgb(text);
        var hasAlpha = (rgb.alpha < 1) ? ", " + rgb.alpha : "";
        const formedString = `${rgb.red}, ${rgb.green}, ${rgb.blue}${hasAlpha}`;
        await navigator.clipboard.writeText(formedString);
        createSnackbar("Copied to clipboard!");
    } catch (error) {
        console.log("Failed to convert hex to RGB", error);
        createSnackbar(error);
    }
}