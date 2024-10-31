// Function to handle messages from the background script
function handleMessage(message, sender) {
    console.log(message, sender);
    // alert(message.ads);
    // if (message.type === "load-ad") {
    //     if (cachedResponse) {
    //         // Use cached response if available
    //         sendResponse(cachedResponse);
    //     } else {
    //         // Request ads from the backend if not cached
    //         fetchAdsFromBackend().then(response => {
    //             cachedResponse = response;
    //             sendResponse(response);
    //         });
    //     }
    //     return true; // Indicates that the response will be sent asynchronously
    // }
}

console.log("Loading content script");

// Listen for messages from the background script
// chrome.runtime.onMessage.addListener(handleMessage);

// Establish connection with the background script
const port = chrome.runtime.connect({name: "ad-channel"});

port.onMessage.addListener(handleMessage);

port.postMessage("load-ad");