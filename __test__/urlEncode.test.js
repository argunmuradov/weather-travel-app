import { urlEncode } from '../src/client/js/app.js'


describe("Testing the Url encode functionality", () => {
    test("Testing the urlEncode() function", () => {
        const input = 'New York'
        const output = 'New%20York';
        expect(urlEncode(input)).toEqual(output);
    })
});