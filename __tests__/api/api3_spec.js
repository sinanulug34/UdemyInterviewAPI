const frisby = require('frisby');
const _ = require("lodash");

let getBorder;

it('test1', function () {
    return frisby
        .get('https://restcountries.eu/rest/v2/name/turkey')
        .then(function (response) {
            getBorder = response.json[0].borders;
            expect(getBorder).toContain('AZE')
            getAlphaCode = getBorder[1]
            return frisby
                .get('https://restcountries.eu/rest/v2/alpha/' + getAlphaCode)
                .then(function (response) {
                    let capitalValue = response.json.capital;
                    expect(capitalValue).toEqual('Baku')
                })

        })

});