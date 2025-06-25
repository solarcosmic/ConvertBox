![ConvertBox_Banner_3](https://github.com/user-attachments/assets/dacee3e1-04c3-4953-b7dc-b03789fb1d16)

# ConvertBox
Convert images and more without leaving your browser. Converts client-sided.

## How can I install ConvertBox?
[Click here to view the install guide for Chrome, see you there! :D](https://solarcosmic.github.io/convertbox-docs/guides/get_extension#developer-mode-chrome)

## What can ConvertBox convert?
- A variety of image formats (e.g. PNG, JPG) to WebP, ICO, BMP, and more.
- HTML page to Markdown format.
- Selected text to QR code.
- Hex colour codes to RGB.

## Why would ConvertBox be needed?
Imagine this: you stumble across an image you want to use in your project, for example, but the format is something like .avif! ConvertBox can fix that in only two clicks, converting the image without leaving your computer.

## How can I use ConvertBox?
- To convert images, right click on any image, go to the "ConvertBox" dropdown, and select the format you would like to convert the image to.
- To convert pages (HTML) to Markdown (experimental), you can right click on any part of the page that isn't a Node (object), and click on "Convert Page (HTML) to Markdown".
- To convert HEX to RGB, simply select the HEX colour code you want, including the #, go to the "ConvertBox" dropdown, right click and click on "Convert HEX to RGB" and it will copy the result to your clipboard.
- To convert text to any case (UPPERCASE, lowercase, Title Case), simply right click on the text you want to convert and click "Convert Selection to ..." and it will copy it to your clipboard.
- To convert text to a QR code, you can right click on any selected text on a page, go to the "ConvertBox" dropdown, then click on "Convert Selected Text to QR Code" and it should start downloading.

You can also utilize the popup box, which can be done by clicking the ConvertBox icon in the extension tray. This will let you choose what items you want to show on the context menus.

## What browsers is ConvertBox available on?
ConvertBox is only currently available for Chrome-based browsers (e.g. Chrome, Brave, Microsoft Edge)

## How does ConvertBox work?
ConvertBox uses a variety of tools and modules to convert what is needed client-sided without sending anything to a third party. Everything runs directly in your browser.

## What's AI and what isn't?
The majority of this project was not made with AI, with these few exceptions:
- AI helped with some of the errors encountered
- AI helped to make some of the code more readable and efficient
- Webpack configuration file (webpack.config.js)

Most of these were from Google's AI summary feature (Gemini).

## Why was ConvertBox made?
ConvertBox was made for [Summer of Making](https://summer.hackclub.com/projects/2390) by Hack Club. It has solved a problem I always had, saving time efficiently.

## You use a CORS proxy to circumvent CORS issues! Does that mean this extension isn't completely local?
No, this extension isn't completely local, but the methods to convert these are.
