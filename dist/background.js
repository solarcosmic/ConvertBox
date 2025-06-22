/******/ (() => { // webpackBootstrap
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
function convertImageChecker(info, tab) {
    if (info["mediaType"] == "image") {
        const menuItemSplit = info["menuItemId"].toLowerCase().split("_");
        chrome.tabs.sendMessage(tab.id, {
            action: "convertImage",
            srcUrl: info["srcUrl"],
            format: menuItemSplit[1]
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
    chrome.contextMenus.onClicked.addListener(convertImageChecker)
});
/******/ })()
;
//# sourceMappingURL=background.js.map