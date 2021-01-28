const frisby = require('frisby');
const _ = require("lodash");
var assert = require("assert");

it('test1', function (done, response) {
    return frisby.get('https://restcountries.eu/rest/v2')
        .expect('status', 200)
        .expect('header', 'Content-Type', 'application/json;charset=UTF-8')
        .done(done);
});

it('test2', function (done) {
    return frisby
        .get('https://restcountries.eu/rest/v2')
        .expect('status', 200)
        .then(function (response) {
            let responseArrayLength = response.json.length;
            assert.equal(responseArrayLength, 250);
        }).done(done)
});


it('test3', function () {
    return frisby
        .get('https://restcountries.eu/rest/v2')
        .expect('json', '?.name', 'Turkey')
        .expect('json', '?.alpha2Code', 'TR')
        .expect('json', '?.alpha3Code', 'TUR')
});

it('test4', function (done) {
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


