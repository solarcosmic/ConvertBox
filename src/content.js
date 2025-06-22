import { PngIcoConverter } from "./libraries/png2icojs.min.js";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "convertImage") {
        convertImage(request.srcUrl, request.format, "converted_image");
    }
});

/**
 * Converts an image from a URL to a standard format (PNG, JPEG, WebP) and downloads it.
 * Note that if there is an unsupported format the function will just print out that it
 * can't convert it.
 */
async function convertImage(imageUrl, format, fileName, quality = 0.92) {
    try {
        const img = new Image();
        img.crossOrigin = "anonymous";

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
        switch (format.toLowerCase()) {
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
                mimeType = "image/png"; // set as png so we can convert the png to ico
                break;
            default:
                console.log("Unsupported file conversion format", format);
                return;
        }

        if (format.toLowerCase() == "ico") {
            const icoSize = 256; // by default
            const icoCanvas = document.createElement("canvas");
            icoCanvas.width = icoSize;
            icoCanvas.height = icoSize;
            const icoCtx = icoCanvas.getContext("2d");
            icoCtx.drawImage(img, 0, 0, icoSize, icoSize);

            icoCanvas.toBlob(async (blob) => {
                if (!blob) {
                    console.log("Failed to create the blob");
                    return;
                }

                const converter = new PngIcoConverter();
                const inputs = [{ png: blob }];
                try {
                    const icoBlob = await converter.convertToBlobAsync(inputs);
                    const url = URL.createObjectURL(icoBlob);
                    chrome.runtime.sendMessage({
                        action: "downloadImage",
                        url: url,
                        filename: `${fileName}.${format.toLowerCase()}`
                    });
                } catch (error) {
                    console.log("ICO conversion failed", error);
                }
            }, "image/png");
        } else {
            canvas.toBlob((blob) => {
                if (!blob) {
                    console.log("Failed to create the blob");
                    return;
                }

                const url = URL.createObjectURL(blob);
                chrome.runtime.sendMessage({
                    action: "downloadImage",
                    url: url,
                    filename: `${fileName}.${format.toLowerCase()}`
                });
            }, mimeType, quality);
        }
    } catch (error) {
        console.log("Error when converting", error);
    }
}