const ssLogo = chrome.runtime.getURL('js/resources/logo.png');

function injectBadge($eleToAttach, domain, affLink) {
    const ssBadge = `<a title="This site was verified by SafeShop" class="no-style-link ss-link ss-verified-badge" data-domain="${domain}" data-href="${affLink}">
                        <img src="${ssLogo}"><span>Safeshop Verified</span>
                    </a>`;

    $eleToAttach.before(ssBadge);
}

function scan(ssData) {
    $('a[jsname="UWckNb"]').each(function() {
        let affLink;
        const href = $(this).attr('href');
        const domain = new URL(href).hostname.replace('www.', '');
        if(ssData[domain] && ssData[domain].verified) {
            affLink = ssData[domain].skimlink + `&xcust=firsts&url=${encodeURIComponent(href)}`;
        }
        if (affLink) {
            const $nearestParentDiv = $(this).closest('div[jscontroller="SC7lYd"]');
            if ($nearestParentDiv.length && !$nearestParentDiv.prev().is('.ss-verified-badge')) {
                $(this).attr('data-href', affLink).attr('data-domain', domain).addClass('ss-link');
                $(this).on('click', handleSSLinkClick);
                injectBadge($nearestParentDiv, domain, affLink);
            }
        }
    });
}

function createResultObserver(ssData) {
    setInterval(() => {
        scan(ssData);
    }, 500);
}

function handleSSLinkClick(e) {
    e.preventDefault();
    e.stopPropagation();

    const thisLink = $(this);
    chrome.storage.local.get("approvedList", function(data) {
        const approvedList = data.approvedList || {};
        const domain = thisLink.attr("data-domain");
        const href = thisLink.attr("data-href");

        approvedList[domain] = true;
        
        chrome.storage.local.set({'approvedList': approvedList}, function() {
            window.location.href = href;
        });
    });
}

function initEvents() {
    $(document).on('click', '.ss-link', handleSSLinkClick);
}

function app() {
    chrome.storage.local.get(["ssData"], function(data) {
        const ssData = data.ssData;
        if (ssData) {
            initEvents();
            createResultObserver(ssData);
        }
    });
}

chrome.storage.local.get("premium").then(data => {
    if (data.premium) {
        chrome.storage.local.get("activeSafeshop").then(result => {
            if (result.activeSafeshop) {
                app();
            }
        })
    } else {
        app();
    }
})