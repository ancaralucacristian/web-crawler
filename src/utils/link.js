module.exports = function Link(url) {

    this.innerLinks = [];
    this.url = url;

    Link.prototype.addInnerLink = function (link) {
        if (!this.innerLinks.includes(link)) {
            this.innerLinks.push(link);
        }
    }

    Link.prototype.getInnerLinks = function () {
        return this.innerLinks;
    }

    Link.prototype.getUrl = function () {
        return this.url;
    }

}
