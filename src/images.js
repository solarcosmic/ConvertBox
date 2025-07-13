/*
 * Copyright (c) 2025 solarcosmic.
 * This project is licensed under the MIT license.
 * To view the license, see <https://opensource.org/licenses/MIT>.
*/
import { PngIcoConverter } from "./libraries/png2icojs.min.js";
import { CanvasToTIFF } from "./libraries/canvastotiff.min.js";
import { CanvasToBMP } from "./libraries/canvastobmp.min.js";
import { createSnackbar } from './snack.js';
import { createModal } from './modal.js';

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.action == "convertImage") {
        convertImage(req["srcUrl"], req["format"], "converted_image");
    }
});

/**
 * Converts an image from a URL to a standard format (PNG, JPEG, WebP) and downloads it.
 * Note that if there is an unsupported format the function will just print out that it
 * can't convert it.
 * 
 * Also, this function detects any CORS issues and reports the issue to the user, where
 * the user can decide whether to send the URL to a CORS proxy or to cancel.
 * NOTE file:// error catching should not be needed since it's unlikely CORS will be there
 */
async function convertImage(imageUrl, format, fileName, quality = 0.92) {
    try {
        const img = new Image();
        img.crossOrigin = "anonymous";
        format = format.toLowerCase();

        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = imageUrl;
        })

        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        let mimeType;
        switch (format) {
            case "png":
                mimeType = "image/png";
                break;
            case "jpeg":
                mimeType = "image/jpeg";
                break;
            case "webp":
                mimeType = "image/webp";
                break;
            case "ico":
            case "tiff":
            case "bmp":
                mimeType = "image/png"; // set as png so we can convert them to its respective formats (or at least for now)
                break;

            default:
                createModal("Unsupported file conversion format! " + format);
                console.log("Unsupported file conversion format", format);
                return;
        }

        if (format == "ico") {
            pngToICO(img, fileName, format);
        } else if (format == "tiff") {
            pngToTIFF(canvas, fileName, format)
        } else if (format == "bmp") {
            pngToBMP(canvas, fileName, format)
        } else {
            canvas.toBlob((blob) => {
                if (!blob) {
                    createSnackbar("Failed to create canvas blob!");
                    console.log("Failed to create the blob");
                    return;
                }

                const url = URL.createObjectURL(blob);
                createSnackbar("Converted! You should be prompted to download shortly.");
                chrome.runtime.sendMessage({
                    action: "downloadImage",
                    url: url,
                    filename: `${fileName}.${format.toLowerCase()}`
                });
            }, mimeType, quality);
        }
    } catch (error) {
        chrome.storage.sync.get("enabledMenus", (data) => {
            const enabledMenus = data.enabledMenus || {};
            if (enabledMenus["RequireCORSDialog"] == null || enabledMenus["RequireCORSDialog"] == true) {
                console.log("==BEGIN IMAGE CONVERSION ERROR DIALOG, LOOK ABOVE FOR CORS ERRORS==");
                createModal(
                    "Image Conversion Error",
                    `It seems that there was an error retrieving this image.
                    This can sometimes be caused by CORS-related issues.
                    Would you like to route this URL through a CORS proxy?
                    
                    Nothing happened? Please check the console for errors and report this!`,
                    "Cancel",
                    "Use CORS Proxy",
                    `You can check "Always Use CORS Proxy" in the Settings to automatically allow CORS proxy-ing.
                    Note that this method sends the URL to corsproxy.io, an external third-party source.`,
                    function(button) {
                        console.log(`==BUTTON PRESSED: "${button}"==`);
                        if (button == "Use CORS Proxy") {
                            chrome.runtime.sendMessage({
                                action: "reconvertImageUsingCORSProxy"
                            });
                        }
                        console.log("==END IMAGE CONVERSION ERROR DIALOG==");
                    }
                );
            } else {
                chrome.runtime.sendMessage({
                    action: "reconvertImageUsingCORSProxy"
                });
            }
        });
    }
}

function pngToICO(img, fileName, format) {
    const icoSize = 256; // by default
    const icoCanvas = document.createElement("canvas");
    icoCanvas.width = icoSize;
    icoCanvas.height = icoSize;
    const icoCtx = icoCanvas.getContext("2d");
    icoCtx.drawImage(img, 0, 0, icoSize, icoSize);

    icoCanvas.toBlob(async (blob) => {
        if (!blob) {
            createSnackbar("Failed to create canvas blob!");
            console.log("Failed to create the blob");
            return;
        }

        const converter = new PngIcoConverter();
        const inputs = [{ png: blob }];
        try {
            const icoBlob = await converter.convertToBlobAsync(inputs);
            const url = URL.createObjectURL(icoBlob);
            createSnackbar("Converted to ICO! You should be prompted to download shortly.");
            chrome.runtime.sendMessage({
                action: "downloadImage",
                url: url,
                filename: `${fileName}.${format}`
            });
        } catch (error) {
            createSnackbar("ICO conversion failed: " + error);
            console.log("ICO conversion failed", error);
        }
    }, "image/png");
}

function pngToTIFF(canvas, fileName, format) {
    try {
        CanvasToTIFF.toBlob(canvas, function(blob) {
            const url = URL.createObjectURL(blob);
            createSnackbar("Converted to TIFF! You should be prompted to download shortly.");
            chrome.runtime.sendMessage({
                action: "downloadImage",
                url: url,
                filename: `${fileName}.${format}`
            });
        });
    } catch (error) {
        createSnackbar("TIFF conversion failed: " + error);
        console.log("TIFF conversion failed", error);
    }
}

function pngToBMP(canvas, fileName, format) {
    try {
        CanvasToBMP.toBlob(canvas, function(blob) {
            const url = URL.createObjectURL(blob);
            createSnackbar("Converted to BMP! You should be prompted to download shortly.");
            chrome.runtime.sendMessage({
                action: "downloadImage",
                url: url,
                filename: `${fileName}.${format}`
            });
        });
    } catch (error) {
        createSnackbar("BMP conversion failed: " + error);
        console.log("BMP conversion failed", error);
    }
}
/* 
async function pngToAVIF(canvas, fileName, format) {
    try {
        const avifBuffer = await encode(canvas);
        const arrayBuffer = new Uint8Array(avifBuffer);
        const blob = new Blob([arrayBuffer], {type: "image/avif"});
        const url = URL.createObjectURL(icoBlob);
        chrome.runtime.sendMessage({
            action: "downloadImage",
            url: url,
            filename: `${fileName}.${format}`
        });
    } catch (error) {
        console.log("AVIF conversion failed", error);
    }
} */