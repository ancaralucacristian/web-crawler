const utils = require('../src/utils/index');

describe('Tests of the create valid link utils', () => {

    test('When link is not changes if it contains the domain', () => {
        const result = utils.createValidLink('www.monzo.com/', 'www.monzo.com/some-url/somewhere');
        const expected = 'www.monzo.com/some-url/somewhere';

        expect(result).toEqual(expected);
    })

    test('When link is changes if it doesn`t contain the domain', () => {
        const result = utils.createValidLink('www.monzo.com/', '/some-url/somewhere');
        const expected = 'www.monzo.com/some-url/somewhere';

        expect(result).toEqual(expected);
    })

    // test('', () => {
    //     const result = utils.createValidLink('www.monzo.com/', "/some-url/something-I-couldn't-think-about");
    //     const expected = "www.monzo.com/some-url/some-url/something-I-couldn't-think-about";

    //     expect(result).toEqual(expected);
    // })
})
