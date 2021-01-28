const frisby = require('frisby');
const _ = require("lodash");
const Joi = frisby.Joi;
var assert = require("assert");


it('test1', function () {
    jest.setTimeout(1000)
    return frisby
        .get('https://restcountries.eu/rest/v2/name/turkey')
        .expect('jsonTypes', Joi.array())
        .then(function (response) {
            let responseArrayLength = response.json.length;
            console.log(responseArrayLength);
            expect(response.json.length).toBe(1);
        });
});

it('test2', function () {
    jest.setTimeout(1000)
    return frisby
        .get('https://restcountries.eu/rest/v2/name/turkey')
        .expect('jsonTypes', Joi.array())
        .then(function (response) {
            let responseArrayLength = response.json.length;
            console.log(responseArrayLength);
            expect(response.json.length).toBe(1);
        });
});

it('test3', function () {
    return frisby.get('https://restcountries.eu/rest/v2/name/turkey')
        .expect('jsonTypes', '*', {
            'name': Joi.string(),
            'alpha2Code':Joi.string(),
            'population': Joi.number(),
            'area':Joi.number()
        });
});

it('test4', function () {
    return frisby.get('https://restcountries.eu/rest/v2/name/turkey')
        .expect('jsonTypes', '*', {
            'name': Joi.string().required(),
            'population': Joi.number().required()
        });
});