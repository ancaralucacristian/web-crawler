const utils = require('../src/utils/index');

describe('Tests of the create valid link utils', () => {

    test('When link is not changes if it contains the domain', () => {
        const result = utils.createValidLink('www.monzo.com/some-url/somewhere/', 'www.monzo.com/');
        const expected = 'www.monzo.com/some-url/somewhere';

        expect(result).toEqual(expected);
    })

    test('When link is changes if it doesn`t contain the domain', () => {
        const result = utils.createValidLink('/some-url/somewhere/', 'www.monzo.com/');
        const expected = 'www.monzo.com/some-url/somewhere';

        expect(result).toEqual(expected);
    })

    test('When href is undefined, the default link is returned', () => {
        const result = utils.createValidLink(undefined, 'www.monzo.com/');
        const expected = 'www.monzo.com/';

        expect(result).toEqual(expected);
    })
})
