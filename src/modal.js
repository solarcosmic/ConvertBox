/*
 * Copyright (c) 2025 solarcosmic.
 * This project is licensed under the MIT license.
 * To view the license, see <https://opensource.org/licenses/MIT>.
*/
// src/modal.js - Creates a modal on the current webpage.
var modal = false;
var modal_space;
var modal_layout;
var modal_logo;
var modal_title;
var modal_description;
var modal_subtext;

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.action == "createModal") {
        createModal(req["title"], req["description"], req["button1"], req["button2"], req["callback"]);
    }
});

/*
 * Initialises the modal.
*/
export function initModal() {
    if (modal) return;
    modal_space = document.createElement("div");
    modal_layout = document.createElement("div");
    modal_logo = document.createElement("img");
    modal_title = document.createElement("div");
    modal_description = document.createElement("div");
    modal_subtext = document.createElement("div");

    // assign stuff
    modal_space.setAttribute("id", "convertbox-modal-space");
    modal_layout.classList.add("convertbox-modal-layout");
    modal_logo.src = chrome.runtime.getURL("./src/assets/ConvertBox.png");
    modal_logo.classList.add("convertbox-modal-logo");
    modal_title.setAttribute("id", "convertbox-modal-title");
    modal_description.setAttribute("id", "convertbox-modal-description");
    modal_space.style.display = "none";
    modal_subtext.setAttribute("id", "convertbox-modal-subtext");

    document.body.appendChild(modal_space);
    modal_space.appendChild(modal_layout);
    modal_layout.appendChild(modal_logo);
    modal_layout.appendChild(modal_title);
    modal_layout.appendChild(modal_description);
    modal_layout.appendChild(modal_subtext);
    modal = true;
}

/*
 * Creates a modal.
 * As of right now, this modal is used to display the CORS proxy error thing.
 * However, this modal should be adaptable for other uses in the future.
*/
export function createModal(title, description, button1, button2, subtext, callback) {
    if (!modal) initModal();
    try {
        modal_title.textContent = title;
        modal_description.textContent = description;
        // remove all buttons so that we don't have random duplicates
        modal_layout.querySelectorAll(".convertbox-modal-button").forEach(loopButton => {
            loopButton.remove();
        })
        if (button1) {
            const button = document.createElement("button");
            button.classList.add("convertbox-modal-button");
            button.textContent = button1;
            button.addEventListener("click", function() {
                if (callback) callback(button1);
                modal_space.style.display = "none";
            });
            modal_layout.appendChild(button);
        }
        if (button2) {
            const button = document.createElement("button");
            button.classList.add("convertbox-modal-button");
            button.textContent = button2;
            button.addEventListener("click", function() {
                if (callback) callback(button2);
                modal_space.style.display = "none";
            });
            modal_layout.appendChild(button);
        }
        if (subtext && modal_subtext) modal_subtext.textContent = subtext;
        modal_space.style.display = "flex";
    } catch (error) {
        console.log("Modal error: " + error);
    }
}