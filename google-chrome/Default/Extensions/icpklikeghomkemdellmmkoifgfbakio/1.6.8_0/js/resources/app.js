function initEvents() {
    $("#dismiss").on("click", function(event){
        chrome.storage.local.get("dismissList", function(data) {
            var dismissList = data.dismissList;
            const now = new Date();
            if (dismissList) {
                dismissList[window.domain] = now.toJSON()
                chrome.storage.local.set({'dismissList': dismissList});
                window.parent.postMessage({
                    'function': 'closeSafeshopModal',
                }, "*");
            }
        });
    });

    $("#go").on("click", function() {
        chrome.storage.local.get("approvedList", function(data) {
            var approvedList = data.approvedList;
            if (approvedList) {
                approvedList[window.domain] = true
                chrome.storage.local.set({'approvedList': approvedList});
                window.parent.postMessage({
                    'function': 'loadAffLink',
                }, "*");
            }
        });
    })
}

function loadData() {
    var urlParams = new URLSearchParams(window.location.search);
    var domain = urlParams.get('domain') || '';
    window.domain = domain;
    var verified = urlParams.get('verified') || false;
    var trusted = urlParams.get('trusted') || false;
    var ssl = urlParams.get('ssl') || false;
    $('.domain').text(domain);

    var domainlength = domain.toString().length
    if (domainlength > 12 && domainlength < 16) {
        $('.domain').addClass('long-domain');
    } else if (domainlength >= 16 && domainlength <= 21) {
        $('.domain').addClass('superlong-domain');
    } else if (domainlength > 21) {
        $('.domain').addClass('tiny-text');
    }

    if (trusted) {
        $('.google.status').addClass('okay');
    } else {
        $('.google.status').addClass('not-okay');
    }
    if (verified) {
        $('.authentic.status').addClass('okay');
    } else {
        $('.authentic.status').addClass('not-okay');
    }
    if (ssl) {
        $('.ssl.status').addClass('okay');
    } else {
        $('.ssl.status').addClass('not-okay');
    }
}

function initApp() {
    initEvents();
    loadData();
}

initApp();