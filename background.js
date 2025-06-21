chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "convertImage",
        title: "Convert Image",
        contexts: ["image"]
    });
    const image_list = {
        "APNG": "Animated Portable Network Graphics",
        "AVIF": "AV1 Image File Format",
        "GIF": "Graphics Interchange Format",
        "JPEG": "Joint Photographic Expert Group Image",
        "PNG": "Portable Network Graphics",
        "SVG": "Scalable Vector Graphics",
        "WebP": "Web Picture Format",
        "BMP": "Bitmap Format",
        "ICO": "Microsoft Icon",
        "TIFF": "Tagged Image File Format"
    }
    for (const format in image_list) {
        chrome.contextMenus.create({
            id: "convertImage_" + format,
            title: format + " (" + image_list[format] + ")",
            contexts: ["image"],
            parentId: "convertImage"
        });
    }
});