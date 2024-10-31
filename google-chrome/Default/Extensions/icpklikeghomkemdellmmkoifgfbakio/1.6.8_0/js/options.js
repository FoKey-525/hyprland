import {Config} from "./config.js";

document.title = chrome.i18n.getMessage("Options");

// open port for tab change messages
let myPort = await chrome.runtime.connect({name: "options"});

// listen for tab changes
myPort.onMessage.addListener(handleMessage);

// process tab changes message.tabinfo
function handleMessage(message, sender, sendResponse) {
    if (message.premium) {
        jQuery("#activate-premium-form").hide();
        jQuery("#activate-premium-noaction").show();
    }
    if (message.activateError) {
        jQuery("#activate-premium-result").text(message.activateError);
    }

    // if (message.browserInfo) {
    //     jQuery("#browser-version").val(message.browserInfo.name + " " + message.browserInfo.version);
    // }
    // console.log(navigator.userAgent)
    if (message.extVersion) {
        jQuery("#ext-version").val(message.extVersion);
    }
    if (message.userId) {
        jQuery("#user-id-field").val(message.userId);
    }
}

myPort.postMessage({ requestState: ["premium", "userId"] });

jQuery('#activate-premium-submit').click(() => {
    let code = jQuery("#premium-code").val();
    jQuery("#activate-premium-result").text("");
    myPort.postMessage({ activateCode: code });
});

/**
 * i18n
 */
jQuery('body').find("[data-i18n]").each(function(idx, val) {
    let el = $(val);
    let text = chrome.i18n.getMessage(el.data("i18n"));
    text = text.replace("\n", "<br/>");
    el.html(text);
});