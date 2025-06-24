/******/ (() => { // webpackBootstrap
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
function convertImageChecker(info, tab) {
    console.log(info, tab);
    if (info["mediaType"] == "image") {
        const menuItemSplit = info["menuItemId"].toLowerCase().split("_");
        chrome.tabs.sendMessage(tab.id, {
            action: "convertImage",
            srcUrl: "https://corsproxy.io/?url=" + info["srcUrl"],
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
            action: "hexToRGB",
            selectionText: info["selectionText"]
        });
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "downloadImage") {
        chrome.downloads.download({
            url: request.url,
            filename: request.filename,
            saveAs: true,
        });
    } else if (request.action === "downloadFromUrl") {
        chrome.downloads.download({
            url: request.url,
            filename: request.filename,
            saveAs: true,
        });
    }
});

chrome.runtime.onInstalled.addListener(() => {
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
/******/ })()
;
//# sourceMappingURL=background.js.map