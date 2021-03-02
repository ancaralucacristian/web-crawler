const fetch = require('node-fetch');
const cheerio = require('cheerio');

const utils = require('./utils');


async function fetchData(urlToVisit) {
    const params = {
        headers: {
            Accept: 'text/html*'
        }
    };
    const textHtml = await fetch(urlToVisit, params)
        .then(response => response.text());

    return cheerio.load(textHtml);
}


async function WebCrawler(defaultUrl, urlBase, queueOfLinksToVisit, allVisitedLinksMap) {
    const linksWithErrors = {};

    while (!queueOfLinksToVisit.isEmpty()) {
        const urlToVisit = queueOfLinksToVisit.dequeue();

        if (!allVisitedLinksMap[urlToVisit]) {
            const listOfInnerLinks = new Set();
            try {
                const $ = await fetchData(urlToVisit);

                const allLinksFoundInHtml = $('a');

                allLinksFoundInHtml.each((i, link) => {
                    const href = $(link).attr('href');

                    if (utils.validateLink(href, defaultUrl, urlBase)) {
                        const innerUrl = utils.createValidLink(href, defaultUrl);

                        listOfInnerLinks.add(innerUrl);
                        queueOfLinksToVisit.enqueue(innerUrl);
                    }
                });

            } catch (err) {
                const message = `cannot be accessed, will just skip it. Error: ${err}`;
                linksWithErrors[urlToVisit] = message;
                console.log(urlToVisit, ' ', message);
            }

            allVisitedLinksMap[urlToVisit] = Array.from(listOfInnerLinks);
        }
    }

    utils.writeToFile(allVisitedLinksMap);
    console.log(`Some links were not processed due to errors : ${JSON.stringify(linksWithErrors, undefined, 4) || 'none'}`)
}

module.exports = WebCrawler;
