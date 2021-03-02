const fs = require('fs');


function validateLink(link = '', defaultUrl = '', urlBase = '') {
    if (!link) {
        return false;
    }

    if (link.startsWith(defaultUrl)) {
        return true;
    }

    if (link === '/' || link === '#') {
        return false;
    }

    if (/(tel:[\d]*)/g.test(link)) {
        return false;
    }

    if (link.includes('mailto:')) {
        return false;
    }

    if (/(((https?:?\/?\/?)|(www.))[^\s]+)/g.test(link)) {
        return false;
    }

    if (/(javascript:[^\s]+)/g.test(link)) {
        return false;
    }

    if (link.startsWith(`${urlBase}:`)) {
        return false;
    }

    if (link.startsWith(`whatsapp:`)) {
        return false;
    }

    return true;
}

function createValidLink(href = '', defaultUrl) {
    try {
        if (href[href.length - 1] === '/') {
            href = href.slice(0, href.length - 1)
        }

        if (href.includes(defaultUrl)) {
            return href;
        } else {
            if (defaultUrl[defaultUrl.length - 1] === '/' && href[0] === '/') {
                href = href.slice(1);
            }


            if (href.startsWith('..')) {
                href = href.replace(/../g, '');
            }

            return defaultUrl + escape(href);
        }
    } catch (err) {
        console.log(`An error has ocurred while creating valid link: ${err}`);
    }
}

function writeToFile(linksMap) {
    const count = Object.entries(linksMap).length;

    fs.writeFile(process.env.OUTPUT_FILE_NAME, JSON.stringify({ list: linksMap, count: count }), (err) => {
        if (err) {
            console.log(err);
        }
        console.log(`Successfully scanned the website, total length of links is ${count}!`);
    });
}

module.exports = {
    validateLink,
    createValidLink,
    writeToFile
}
