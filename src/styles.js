/*
 * Copyright (c) 2025 solarcosmic.
 * This project is licensed under the MIT license.
 * To view the license, see <https://opensource.org/licenses/MIT>.
*/
// src/styles.js - Styles that get injected into the main page.
const styles = `
        @font-face {
        font-family: "Inter";
        src: url("${chrome.runtime.getURL("./src/assets/Inter.ttf")}");
        }

        /* source: https://www.w3schools.com/howto/howto_js_snackbar.asp */
        #convertbox-status-snackbar {
        font-family: "Inter", sans-serif !important;
        visibility: hidden;
        min-width: 250px;
        margin-left: -125px;
        background-color: rgba(0, 0, 0, 0.9);
        color: #fff;
        text-align: center;
        border-radius: 8px;
        padding: 16px;
        position: fixed;
        left: 50%;
        bottom: 35px;
        font-size: 17px;
        z-index: 999999999;
        }

        #convertbox-status-snackbar.show {
        visibility: visible;
        -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
        animation: fadein 0.5s, fadeout 0.5s 2.5s;
        }

        @-webkit-keyframes fadein {
        from {bottom: 0; opacity: 0;} 
        to {bottom: 30px; opacity: 1;}
        }

        @keyframes fadein {
        from {bottom: 0; opacity: 0;}
        to {bottom: 30px; opacity: 1;}
        }

        @-webkit-keyframes fadeout {
        from {bottom: 30px; opacity: 1;} 
        to {bottom: 0; opacity: 0;}
        }

        @keyframes fadeout {
        from {bottom: 30px; opacity: 1;}
        to {bottom: 0; opacity: 0;}
        }

        /* modal */
        #convertbox-modal-space {
        box-sizing: border-box;
        font-family: "Inter", sans-serif !important;
        color: #ffffff;
        background-color: rgba(0, 0, 0, 0.3);
        /* display: none; */
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 99999;
        }

        .convertbox-modal-layout {
        background-color: #000000e5;
        width: 600px;
        max-width: 100%;
        padding: 15px 30px;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        text-align: center;
        }

        #convertbox-modal-title {
        font-size: 40px;
        }

        #convertbox-modal-description {
        font-size: 18px;
        white-space: pre-line;
        }

        #convertbox-modal-subtext {
        font-size: 12px;
        white-space: pre-line;
        color: grey;
        margin-top: 10px;
        }

        .convertbox-modal-close {
        margin-top: 30px;
        }

        .convertbox-modal-logo {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
        width: 45%;
        margin-bottom: 15px;
        margin-top: 10px;
        }

        .convertbox-modal-button {
        padding: 10px 20px;
        background-color:rgba(32, 32, 32, 0.7);
        color: #ffffff;
        border: none;
        border-radius: 8px;
        margin-top: 15px;
        cursor: pointer;
        margin-right: 7.5px;
        }

        .convertbox-modal-button:hover {
        background-color:rgba(56, 56, 56, 0.7);
        }
`;
const link = document.createElement("style");
link.innerHTML = styles;
document.head.appendChild(link);