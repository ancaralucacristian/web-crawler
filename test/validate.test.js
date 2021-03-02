const utils = require('../src/utils/index');

describe('Tests of the validate utils', () => {

    test('When link is the default one it is accepted', () => {
        const result = utils.validateLink('www.monzo.com/', 'www.monzo.com/');
        expect(result).toBeTruthy();
    })

    test('When link points to a page of the SPA it is accepted', () => {
        const result = utils.validateLink('/some-page/somewhere/in-the-website', 'www.monzo.com/');
        expect(result).toBeTruthy();
    })

    test('When link is part of the domain it is accepted', () => {
        const result = utils.validateLink('www.monzo.com/this-is-a-nice-page', 'www.monzo.com/');
        expect(result).toBeTruthy();
    })

    test('When link is outside of the domain and contains https it is not accepted', () => {
        const result = utils.validateLink('https://youtube.com/monzo', 'www.monzo.com/');
        expect(result).toBeFalsy();
    })

    test('When link is outside of the domain and contains http it is not accepted', () => {
        const result = utils.validateLink('http://youtube.com/monzo', 'www.monzo.com/');
        expect(result).toBeFalsy();
    })

    test('When link is outside of the domain and contains www it is not accepted', () => {
        const result = utils.validateLink('www.youtube.com/monzo', 'www.monzo.com/');
        expect(result).toBeFalsy();
    })

    test('When link is outside of the domain and contains https and www it is not accepted', () => {
        const result = utils.validateLink('https://www.youtube.com/monzo', 'www.monzo.com/');
        expect(result).toBeFalsy();
    })

    test('When link is outside of the domain and contains https and www it is not accepted', () => {
        const result = utils.validateLink('https:www.youtube.com/monzo', 'www.monzo.com/');
        expect(result).toBeFalsy();
    })

    test('When link a phone number it is not accepted', () => {
        const result = utils.validateLink('tel:07404137144', 'www.monzo.com/');
        expect(result).toBeFalsy();
    })

    test('When link looks like a phone number it is not accepted', () => {
        const result = utils.validateLink('something:tel:07404137144', 'www.monzo.com/');
        expect(result).toBeFalsy();
    })

    test('When link points to a email agent it is not accepted', () => {
        const result = utils.validateLink('mailto:myEmail@myDomain.com', 'www.monzo.com/');
        expect(result).toBeFalsy();
    })

    test('When link points to an action it is not accepted', () => {
        const result = utils.validateLink('monzo://something-something', 'www.monzo.com/');
        expect(result).toBeFalsy();
    })

})