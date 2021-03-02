const fetch = require('node-fetch');
const cheerio = require('cheerio');

const utils = require('./utils');
const Link = require('./utils/link');

async function WebCrawler(defaultUrl, queueOfLinksToVisit, allVisitedLinksMap) {
    const linksWithErrors = new Map();

    const params = {
        headers: {
            Accept: 'text/html*'
        }
    };

    while (!queueOfLinksToVisit.isEmpty()) {
        const linkToVisit = queueOfLinksToVisit.dequeue();
        const urlToVisit = linkToVisit.getUrl();

        if (!allVisitedLinksMap.has(urlToVisit)) {
            allVisitedLinksMap.set(urlToVisit, linkToVisit);

            try {
                const textHtml = await fetch(urlToVisit, params)
                    .then(response => response.text());

                const parsedHTML = cheerio.load(textHtml);
                const allLinksFoundInHtml = parsedHTML('a');

                parsedHTML(allLinksFoundInHtml).each((i, link) => {
                    const href = parsedHTML(link).attr('href');

                    if (utils.validateLink(href)) {

                        const innerUrl = utils.createValidLink(defaultUrl, href);

                        const InnerLink = allVisitedLinksMap.has(innerUrl)
                            ? allVisitedLinksMap.get(innerUrl)
                            : new Link(innerUrl);

                        if (InnerLink.getUrl() !== linkToVisit.getUrl()) {
                            linkToVisit.addInnerLink(InnerLink);
                        }

                        queueOfLinksToVisit.enqueue(InnerLink);
                    }
                });

            } catch (err) {
                linksWithErrors.set(urlToVisit, `cannot be accessed, will just skip it. Error: ${err}`);
            }
        }
    }
    utils.illustrate(allVisitedLinksMap, linksWithErrors);
}

module.exports = WebCrawler;
