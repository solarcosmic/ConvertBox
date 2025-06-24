var last_info = null;
var last_tab = null;
function convertImageChecker(info, tab, corsProxy = false) {
    last_info = info;
    last_tab = tab;
    try {
        if (info["mediaType"] == "image") {
            const menuItemSplit = info["menuItemId"].toLowerCase().split("_");
            chrome.tabs.sendMessage(tab.id, {
                action: "convertImage",
                srcUrl: corsProxy ? "https://corsproxy.io/?url=" + info["srcUrl"] : info["srcUrl"],
                format: menuItemSplit[1]
            });
        } else if (info["menuItemId"] == "convertHTMLToMarkdown") {
            chrome.tabs.sendMessage(tab.id, {
                action: "convertHTMLToMarkdown"
            });
        } else if (info["menuItemId"] == "convertQRCode") {
            chrome.tabs.sendMessage(tab.id, {
                action: "convertQRCode",
                selectionText: info["selectionText"]
            });
        } else if (info["menuItemId"] == "convertHexToRGB") {
            chrome.tabs.sendMessage(tab.id, {
                action: "convertHexToRGB",
                selectionText: info["selectionText"]
            });
        }
    } catch (error) {
        console.error(error);
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action == "downloadImage") {
        chrome.downloads.download({
            url: request.url,
            filename: request.filename,
            saveAs: true,
        });
    } else if (request.action == "downloadFromUrl") {
        chrome.downloads.download({
            url: request.url,
            filename: request.filename,
            saveAs: true,
        });
    } else if (request.action == "reconvertImageUsingCORSProxy") {
        if (last_info && last_tab) {
            convertImageChecker(last_info, last_tab, true);
        }
    }
});

chrome.runtime.onInstalled.addListener(() => {
    // Image Conversion
    chrome.contextMenus.create({
        id: "convertImage",
        title: "Convert Image",
        contexts: ["image"]
    });
    const image_list = {
        "JPEG": "Joint Photographic Expert Group Image",
        "PNG": "Portable Network Graphics",
        "WebP": "Web Picture Format",
        "ICO": "Microsoft Icon",
        "TIFF": "Tagged Image File Format",
        "BMP": "Bitmap Format",
    }
    for (const format in image_list) {
        chrome.contextMenus.create({
            id: "convertImage_" + format.toLowerCase(),
            title: format + " (" + image_list[format] + ")",
            contexts: ["image"],
            parentId: "convertImage",
        });
    }
    // Page to Markdown, QR Code, Hex to RGB
    chrome.contextMenus.create({
        id: "convertHTMLToMarkdown",
        title: "Convert Page (HTML) to Markdown",
        contexts: ["page"]
    });
    chrome.contextMenus.create({
        id: "convertQRCode",
        title: "Convert Selected Text to QR Code",
        contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: "convertHexToRGB",
        title: "Convert HEX to RGB (Selection, Clipboard)",
        contexts: ["selection"]
    });
    chrome.contextMenus.onClicked.addListener(convertImageChecker)
});