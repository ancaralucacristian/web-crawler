const fetch = require('node-fetch');
const cheerio = require('cheerio');

const utils = require('./utils');

async function WebCrawler(defaultUrl, basis, queueOfLinksToVisit, allVisitedLinksMap) {
    const linksWithErrors = new Map();

    const params = {
        headers: {
            Accept: 'text/html*'
        }
    };

    while (!queueOfLinksToVisit.isEmpty() && new Date < new Date('2021-03-02T21:16:02.352Z')) {
        const urlToVisit = queueOfLinksToVisit.dequeue();

        if (!allVisitedLinksMap[urlToVisit]) {
            const listOfInnerLinks = new Set();
            try {
                const textHtml = await fetch(urlToVisit, params)
                    .then(response => response.text());

                const parsedHTML = cheerio.load(textHtml);
                const allLinksFoundInHtml = parsedHTML('a');

                parsedHTML(allLinksFoundInHtml).each((i, link) => {
                    const href = parsedHTML(link).attr('href');

                    if (utils.validateLink(href, defaultUrl, basis)) {
                        const innerUrl = utils.createValidLink(href, defaultUrl);

                        listOfInnerLinks.add(innerUrl);
                        queueOfLinksToVisit.enqueue(innerUrl);
                    }
                });

            } catch (err) {
                linksWithErrors.set(urlToVisit, `cannot be accessed, will just skip it. Error: ${err}`);
                console.log(urlToVisit, `cannot be accessed, will just skip it. Error: ${err}`);
            }

            allVisitedLinksMap[urlToVisit] = Array.from(listOfInnerLinks);
        }
    }

    utils.writeToFile(allVisitedLinksMap);
}

module.exports = WebCrawler;
