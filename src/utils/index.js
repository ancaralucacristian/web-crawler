function validateLink(link, defaultUrl) {
    if (!link) {
        return false;
    }

    if (link.includes(defaultUrl)) {
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

function createValidLink(defaultUrl, href) {
    if (href.includes(defaultUrl)) {
        return href;
    } else {
        if (defaultUrl[defaultUrl.length - 1] === '/' && href[0] === '/') {
            href = href.slice(1);
        }

        if (href.startsWith('..')) {
            href = href.replace(/../g, '');
        }

        // if (href.includes('\'')) {
        //     href = href.replace(/\'/g, "\\'");
        // }

        return defaultUrl + href;
    }
}


function illustrate(linksMap, errorsMap) {
    console.log('****All links****');
    linksMap.forEach((value) => {
        value.innerLinks = value.innerLinks.map(l => l.url);
        console.log(value.url, ': ', value.innerLinks);
    })

    console.log('\n\n****All errors****');
    console.log(errorsMap)

}

module.exports = {
    validateLink,
    createValidLink,
    illustrate
}