"use strict"

require('dotenv').config()


const Link = require('./utils/link');
const Queue = require('./utils/queue');
const WebCrawler = require('./webCrawler');


const START_URL = process.env.START_URL;


async function main() {
    console.log(`Started crawling the ${START_URL}`);
    const queueOfLinksToVisit = new Queue();
    const allVisitedLinksMap = new Map();

    setInterval(() => console.log(`Found ${allVisitedLinksMap.size} so far.`) , 10000);

    const startLink = new Link(START_URL);

    queueOfLinksToVisit.enqueue(startLink);

    WebCrawler(START_URL, queueOfLinksToVisit, allVisitedLinksMap);
}

main();
