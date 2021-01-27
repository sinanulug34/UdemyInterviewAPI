const frisby = require('frisby');
const _ = require("lodash");
const Joi = frisby.Joi;
var assert = require("assert");


it('Verify that status is 200 and content type must be application-json', function (done, response) {
    jest.setTimeout(120000)
    return frisby.get('https://restcountries.eu/rest/v2')
        .expect('status', 200)
        .expect('header', 'Content-Type', 'application/json;charset=UTF-8')
        //.expect('json', 'RestResponse')
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


it('Alpha code control', function () {
    jest.setTimeout(1200000)
    return frisby
        //.get('https://restcountries.eu/rest/v2/name/Turkey')
        .get('https://restcountries.eu/rest/v2')
        .expect('json', '?.name', 'Turkey')
        .expect('json', '?.alpha2Code', 'TR')
        .expect('json', '?.alpha3Code', 'TUR')
});