"use strict"

require('dotenv').config()


const Queue = require('./utils/queue');
const webCrawler = require('./webCrawler');

const START_URL = process.env.START_URL;
const DOMAIN_BASE = process.env.DOMAIN_BASE;


async function main() {
    console.log(`Started crawling: ${START_URL}`);
    const queueOfLinksToVisit = new Queue();
    const allVisitedLinksMap = {};

    queueOfLinksToVisit.enqueue(START_URL);

    webCrawler(START_URL, DOMAIN_BASE, queueOfLinksToVisit, allVisitedLinksMap);
}

main();
