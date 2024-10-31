const regexAnonymox = new RegExp("^https?://([^/]+\\.)?anonymox\\.net/", "i");

export function attachRequestHeaders(details) {
  if (details.type === "main_frame" && details.url.match(regexAnonymox)) {
    console.log("attachRequestHeaders", details);
    // push header
    details.requestHeaders.push({
      name: "X-AnonymoX-Capabilities",
      value: "oneclickactivate"
    });
    details.requestHeaders.push({
      name: "X-AnonymoX-Auth",
      value: "uid:" + "11"
    });
    console.log(details.requestHeaders);
    return {requestHeaders: details.requestHeaders};
  }
}