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
        } else if (info["menuItemId"] == "convertToUpperCase") {
            chrome.tabs.sendMessage(tab.id, {
                action: "convertToUpperCase",
                selectionText: info["selectionText"]
            });
        } else if (info["menuItemId"] == "convertToLowerCase") {
            chrome.tabs.sendMessage(tab.id, {
                action: "convertToLowerCase",
                selectionText: info["selectionText"]
            });
        } else if (info["menuItemId"] == "convertToTitleCase") {
            chrome.tabs.sendMessage(tab.id, {
                action: "convertToTitleCase",
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

function createContextMenus(enabledMenus = {}) {
    chrome.contextMenus.removeAll(() => {
        // Image Conversion
        if (enabledMenus["convertImage"] !== false) {
            chrome.contextMenus.create({
                id: "convertImage",
                title: "Convert Image",
                contexts: ["image"]
            });
            const image_list = {
                "JPEG": "Joint Photographic Expert Group Image",
                "PNG": "Portable Network Graphics",
                "WebP": "Web Picture Format",
                "ICO": "Microsoft Icon 256x256 only",
                "TIFF": "Tagged Image File Format",
                "BMP": "Bitmap Format",
            }
            for (const format in image_list) {
                const subId = "convertImage_" + format.toLowerCase();
                if (enabledMenus[subId] !== false) {
                    chrome.contextMenus.create({
                        id: subId,
                        title: format + " (" + image_list[format] + ")",
                        contexts: ["image"],
                        parentId: "convertImage",
                    });
                }
            }
        }
        // Other menus
        if (enabledMenus["convertHTMLToMarkdown"] !== false) {
            chrome.contextMenus.create({
                id: "convertHTMLToMarkdown",
                title: "Convert Page (HTML) to Markdown",
                contexts: ["page"]
            });
        }
        if (enabledMenus["convertQRCode"] !== false) {
            chrome.contextMenus.create({
                id: "convertQRCode",
                title: "Convert Selected Text to QR Code",
                contexts: ["selection"]
            });
        }
        if (enabledMenus["convertHexToRGB"] !== false) {
            chrome.contextMenus.create({
                id: "convertHexToRGB",
                title: "Convert HEX to RGB (Selection, Clipboard)",
                contexts: ["selection"]
            });
        }
        if (enabledMenus["convertToUpperCase"] !== false) {
            chrome.contextMenus.create({
                id: "convertToUpperCase",
                title: "Convert Selection to UPPERCASE (Clipboard)",
                contexts: ["selection"]
            });
        }
        if (enabledMenus["convertToLowerCase"] !== false) {
            chrome.contextMenus.create({
                id: "convertToLowerCase",
                title: "Convert Selection to lowercase (Clipboard)",
                contexts: ["selection"]
            });
        }
        if (enabledMenus["convertToTitleCase"] !== false) {
            chrome.contextMenus.create({
                id: "convertToTitleCase",
                title: "Convert Selection to Title Case (Clipboard)",
                contexts: ["selection"]
            });
        }
        chrome.contextMenus.onClicked.addListener(convertImageChecker);
    });
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get("enabledMenus", (dt) => {
        createContextMenus(dt.enabledMenus || {});
    });
});

chrome.storage.onChanged.addListener((ch, ar) => {
    if (ar == "sync" && ch.enabledMenus) {
        createContextMenus(ch.enabledMenus.newValue || {});
    }
});