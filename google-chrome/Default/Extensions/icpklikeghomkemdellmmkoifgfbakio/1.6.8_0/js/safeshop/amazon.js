const shortenedDomains = [
    "bit.ly",
    "tinyurl.com",
    "goo.gl",
    "t.co",
    "buff.ly",
    "ow.ly",
    "is.gd",
    "bl.ink",
    "shorte.st",
    "amzn.to",
    "urlgeni.us"
];

var processedNodes = new Set();

function scanAmazonLinks() {
    window.amazonDomains.forEach(amzDomain => {
        $(`a[href^="https://www.${amzDomain}/"]`).each(function() {
            var link = $(this);
            if (!link.hasClass('amz-detected') && processedNodes.has(this) === false) {
                var href = link.attr('href');
                var extractedLink = extractAmazonLinks(href)
                if (extractedLink.length > 0) {
                    link.addClass('amz-detected');
                    var asin = extractedLink[0].split('/').pop()
                    var aglArticleLink = extractedLink[0].toLowerCase().replace(`www.${amzDomain}`, "agentlemanslifestyle.com").replace("\/dp\/", "-")
                    var affiliateLink = extractedLink[0] + "?" + affiliateTag
                    link.attr('href', affiliateLink)
    
                    addAmazonRequestRule(aglArticleLink, asin)
    
                    link.on("click", function (e) {
                        createAGLArticle(extractedLink[0])
                    })
                }
                processedNodes.add(this);
            }
        });
    })
}

function scanShortenedLinks() {
    shortenedDomains.forEach(function(domain) {
        $(`a[href*="${domain}/"]`).each(function() {
            var link = $(this);
            if (!link.hasClass('exposed-link')) {
                link.addClass('exposed-link');
                var href = link.attr('href');
                chrome.runtime.sendMessage({
                    message: 'getFinalUrlFromShortenedLink',
                    shortenedLink: href
                }).then((realLink) => {
                    if (realLink) {
                        link.attr('href', realLink)
                    }
                })
            }
        })
    });
}

function scanningLinks() {
    scanAmazonLinks()
    scanShortenedLinks()
}

setInterval(scanningLinks, 1000);