window.affiliateTag = "tag=thegentlem0a9-20";

window.amazonDomains = [
    "amazon.ca",   // Canada
    "amazon.fr",   // France
    "amazon.de",   // Germany
    "amazon.it",   // Italy
    "amazon.nl",   // Netherlands
    "amazon.pl",   // Poland
    "amazon.es",   // Spain
    "amazon.se",   // Sweden
    "amazon.co.uk", // United Kingdom
    "amazon.com" // International
];

function extractAmazonLinks(text) {
    const amazonDomainsPattern = window.amazonDomains
      .map(domain => domain.replace(/\./g, "\\."))
      .join("|");

    const amazonRegex = new RegExp(`https:\\/\\/www\\.(${amazonDomainsPattern})\\/[^\\/]+\\/dp\\/[A-Z0-9]+`, "gi");

    return text.match(amazonRegex) || [];
}

function addAmazonRequestRule(aglArticleLink, asin) {
    chrome.runtime.sendMessage({
        message: 'addAmazonRequestRule',
        aglArticleLink: aglArticleLink,
        asin: asin,
        domain: window.domain
    });
}

function createAGLArticle(amazonLink) {
    chrome.runtime.sendMessage({
        message: 'createAGLArticle',
        amazonLink: amazonLink
    });
}

function addAmazonRedirectRule() {
    chrome.runtime.sendMessage({
        message: 'addAmazonRedirectRule',
        domain: window.domain
    });
}

window.extractAmazonLinks = extractAmazonLinks;
window.addAmazonRequestRule = addAmazonRequestRule;
window.createAGLArticle = createAGLArticle;
window.addAmazonRedirectRule = addAmazonRedirectRule;