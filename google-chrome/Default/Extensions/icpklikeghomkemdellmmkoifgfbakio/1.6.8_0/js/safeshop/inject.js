let affLink = '';
let amazonProductPage = null;
let isAmazonPage = false;

if (window.addEventListener) {
    window.addEventListener("message", onMessage, false);        
} 
else if (window.attachEvent) {
    window.attachEvent("onmessage", onMessage, false);
}

function onMessage(event) {
    const data = event.data;

    if (typeof(window[data.function]) == "function") {
        window[data.function].call();
    }
}

function closeSafeshopModal() {
    $("#safeshop-iframe").addClass('ss-slide-out');
}

function loadAffLink() {
    closeSafeshopModal();
    if (amazonProductPage) {
        createAGLArticle(amazonProductPage);
    }
    if (isAmazonPage) {
        addAmazonRedirectRule();
    }
    window.location.href = affLink;
}

function timeToShow(domain, dismissList, approvedList) {
    const now = Date.now();
    if (approvedList[domain]) {
        return false;
    }
    const lastDismissTime = dismissList[domain];
    if (!lastDismissTime) {
        return true;
    }
    const differenceInDays = (now - new Date(lastDismissTime)) / (1000 * 60 * 60 * 24);
    return differenceInDays > 1;
}

function renderAppPanel() {
    chrome.storage.local.get(["ssData", "dismissList", "approvedList"], function(data) {
        const ssData = data.ssData;
        const dismissList = data.dismissList;
        const approvedList = data.approvedList;
        const domain = location.hostname.replace('www.', '');

        if (ssData) {
            window.domain = domain;
            if(ssData[domain]) {
                if (timeToShow(domain, dismissList, approvedList)) {
                    const currentPage = location.href;
                    const thisData = ssData[domain];
                    affLink = thisData.skimlink + `&url=${encodeURIComponent(currentPage)}`;
                    const appPage = chrome.runtime.getURL(`js/resources/app.html?domain=${domain}&ssl=${(location.protocol === 'https:')}${thisData.verified ? '&verified=true': ''}${thisData.trusted ? '&trusted=true': ''}`);
                    const html = `<iframe id="safeshop-iframe" class="ss-slide-in" src="${appPage}"></iframe>`;
                    
                    if (domain === "skechers.com") {
                        //Special execution for skechers.com
                        const div = $(`<div id="safeshop-iframe" class="ss-slide-in"></div>`);
                        const shadow = $(div)[0].attachShadow({ mode: 'closed' });
                        shadow.innerHTML = `<style>
                                                #safeshop-iframe {
                                                    position: fixed!important;
                                                    background: #FFFFFF!important;
                                                    box-shadow: rgb(0 0 0 / 20%) 0px 0px 10px 0px!important;
                                                    border-radius: 8px!important;
                                                    width: 280px!important;
                                                    height: 280px!important;
                                                    border: none!important;
                                                }
                                            </style>` + html;
                    
                        $("body").append(div);
                    } else {
                        //Common execution for everyone else
                        $("body").append(html);
                    }
                }
            }
        }
    });
}

chrome.storage.local.get("premium").then(data => {
    if (data.premium) {
        chrome.storage.local.get("activeSafeshop").then(result => {
            if (result.activeSafeshop) {
                renderAppPanel();
            }
        })
    } else {
        renderAppPanel();
    }
})

window.closeSafeshopModal = closeSafeshopModal;
window.loadAffLink = loadAffLink;
