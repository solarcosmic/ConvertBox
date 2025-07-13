/*
 * Copyright (c) 2025 solarcosmic.
 * This project is licensed under the MIT license.
 * To view the license, see <https://opensource.org/licenses/MIT>.
*/
import QRCode from "qrcode";

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.action == "convertQRCode") {
        createQRCode(req["selectionText"], "qr_code");
    }
});

/**
 * Creates a QR code from the selected text and lets the user download it.
 */
async function createQRCode(text, fileName) {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;

    QRCode.toCanvas(canvas, text, function(error) {
        if (error) console.error(error);
        canvas.toBlob((blob) => {
            if (!blob) {
                console.error("Failed to create the blob");
                return;
            }

            const url = URL.createObjectURL(blob);
            chrome.runtime.sendMessage({
                action: "downloadImage",
                url: url,
                filename: `${fileName}.png`
            });
        }, "image/png", 1);
    });
}