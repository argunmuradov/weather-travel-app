import { checkForUrl } from '../src/client/js/app.js'


describe("Testing the Check URl functionality", () => {
    test("Testing the checkForURL() function", () => {
        const input = 'https://classroom.udacity.com/nanodegrees/nd0011/parts/5bb114fe-8add-4c47-bc13-1cee34886c1a/modules/aa658fdb-12bd-489f-9078-7e8b2f789ecb/lessons/adbf2a15-5fa5-466b-a8fe-19ce08b82b61/concepts/5675966c-1a35-4d58-8715-e279d2303167'
        const output = true;
        expect(checkForUrl(input)).toEqual(output);
    })
});