import TurndownService from "turndown";
import { createSnackbar } from './snack.js';

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.action == "convertHTMLToMarkdown") {
        convertHTMLToMarkdown(document.body.innerHTML, "converted_html");
    }
});

/**
 * Attempts to Convert HTML to Markdown via Turndown and downloads it.
 */
async function convertHTMLToMarkdown(html, fileName) {
    const service = new TurndownService();
    const blob = new Blob([service.turndown(html)], {type: "text/markdown"});
    const url = URL.createObjectURL(blob);

    createSnackbar("Converted and downloading!");
    chrome.runtime.sendMessage({
        action: "downloadFromUrl",
        url: url,
        filename: `${fileName}.md`
    });

    setTimeout(() => URL.revokeObjectURL(url), 10000);
}