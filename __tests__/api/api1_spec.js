const frisby = require('frisby');
const _ = require("lodash");
const Joi = frisby.Joi;
var assert = require("assert");

it('Verify that status is 200 and content type must be application-json', function (done, response) {
    jest.setTimeout(120000)
    return frisby.get('https://restcountries.eu/rest/v2')
        .expect('status', 200)
        .expect('header', 'Content-Type', 'application/json;charset=UTF-8')
        .done(done);
});

it('Result array lengt should be 250 char.', function (done) {
    jest.setTimeout(120000)
    return frisby
        .get('https://restcountries.eu/rest/v2')
        .expect('status', 200)
        .then(function (response) {
            let responseArrayLength = response.json.length;
            assert.equal(responseArrayLength, 250);
        }).done(done)
});


it('Alphacode control', function () {
    jest.setTimeout(1200000)
    return frisby
        //.get('https://restcountries.eu/rest/v2/name/Turkey')
        .get('https://restcountries.eu/rest/v2')
        .expect('json', '?.name', 'Turkey')
        .expect('json', '?.alpha2Code', 'TR')
        .expect('json', '?.alpha3Code', 'TUR')
});

it('Array list should be sorted by name', function (done) {
    jest.setTimeout(1200000)
    return frisby
        .get('https://restcountries.eu/rest/v2')
        .then(function (response) {
            const responseArrayLength = response.json;
            console.log(isSorted(responseArrayLength));

        }).done(done)
});

function isSorted(array) {
    return array.every((item, i) => {
        if (i === 0) {
            return true;
        }
        const prevItem = array[i - 1];
        const result = prevItem.name.localeCompare(
            item.name
        ) === -1

        if (!result) {
            console.log({prevItemName: prevItem.name, itemName: item.name})
        }
        return result;
    });
}

