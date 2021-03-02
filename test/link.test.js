const Link = require('../src/utils/link');


describe('Tests of the link object', () => {

    test('When link is created it has the correct structure', () => {
        const NewLink = new Link('https://text.com');
        const expected = {
            url: 'https://text.com',
            innerLinks: []
        };

        expect(NewLink).toEqual(expected);
    })

    test('When links are added the getInnerLinks is correct ', () => {
        const NewLink = new Link('https://text.com');

        NewLink.addInnerLink('www.testLink1.com');
        NewLink.addInnerLink('www.testLink2.com');
        NewLink.addInnerLink('www.testLink3.com');
        NewLink.addInnerLink('www.testLink4.com');

        const expected = [
            'www.testLink1.com',
            'www.testLink2.com',
            'www.testLink3.com',
            'www.testLink4.com'
        ];

        expect(NewLink.getUrl()).toEqual('https://text.com');
        expect(NewLink.getInnerLinks()).toEqual(expected);
    })

    test('When trying to add duplicated links it is not added  ', () => {
        const NewLink = new Link('https://text.com');

        NewLink.addInnerLink('www.testLink1.com');
        NewLink.addInnerLink('www.testLink1.com');
        NewLink.addInnerLink('www.testLink1.com');
        NewLink.addInnerLink('www.testLink1.com');

        const expected = [
            'www.testLink1.com',
        ];

        expect(NewLink.getUrl()).toEqual('https://text.com');
        expect(NewLink.getInnerLinks()).toEqual(expected);
    })
})
