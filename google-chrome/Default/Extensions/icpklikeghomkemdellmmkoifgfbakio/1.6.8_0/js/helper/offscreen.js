// localStorage.options = JSON.stringify({
//   username: "testuser",
//   passwordPlain: "testpw",
// });

console.log("offscreen", localStorage);

// open port for tab change messages
let myPort = await chrome.runtime.connect({name: "offscreen"});

myPort.postMessage({localStorage: localStorage});