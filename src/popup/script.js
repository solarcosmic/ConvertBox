/*
 * Copyright (c) 2025 solarcosmic.
 * This project is licensed under the MIT license.
 * To view the license, see <https://opensource.org/licenses/MIT>.
*/
document.addEventListener("DOMContentLoaded", function() {
    const versionItem = document.getElementById("convertbox-version");
    versionItem.textContent = `Version v${chrome.runtime.getManifest().version}`
    const container = document.getElementById("convertbox-container");

    const contextMenus = [
        { id: "RequireCORSDialog", label: "Require CORS Proxy Dialog" },
        { id: "convertImage", label: "Convert Image Formats" },
        { id: "convertHTMLToMarkdown", label: "HTML to Markdown" },
        { id: "convertQRCode", label: "Selected Text to QR Code" },
        { id: "convertHexToRGB", label: "HEX to RGB (📋)" },
        { id: "convertToUpperCase", label: "Selection to UPPERCASE (📋)" },
        { id: "convertToLowerCase", label: "Selection to lowercase (📋)" },
        { id: "convertToTitleCase", label: "Selection to Title Case (📋)" },
    ];

    chrome.storage.sync.get("enabledMenus", (data) => {
        const enabledMenus = data.enabledMenus || {};
        contextMenus.forEach(item => {
            const wrapper = document.createElement("div");
            wrapper.style.marginBottom = "6px";
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = item.id;
            checkbox.checked = enabledMenus[item.id] != false;
            checkbox.addEventListener("change", () => {
                enabledMenus[item.id] = checkbox.checked;
                chrome.storage.sync.set({enabledMenus});
            });
            const label = document.createElement("label");
            label.htmlFor = item.id;
            label.textContent = item.label;
            label.style.marginLeft = "6px";
            wrapper.appendChild(checkbox);
            wrapper.appendChild(label);
            container.appendChild(wrapper);
        });
    });
})