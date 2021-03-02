const fs = require('fs');


function validateLink(link = '', defaultUrl = '', basis = '') {
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

    if (/monzo:\/\/[\s]?/g.test(link)) {
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

            return defaultUrl + href;
        }
    } catch (err) {
        console.log(`An error has ocurred while creating valid link: ${err}`);
    }
}

function writeToFile(linksMap) {
    fs.writeFile("output.json", JSON.stringify(linksMap), (err) => {
        if (err) {
            console.log(err);
        }
        console.log("Successfully crawled the website!");
    });
}

module.exports = {
    validateLink,
    createValidLink,
    writeToFile
}