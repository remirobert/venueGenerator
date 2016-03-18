'use strict';

var clientId = "AREWTY4KWJEDLALROY0VZWTJ5XFTCITLH2LXZU3WP2OJ1MQW";
var clientSecret = "M2JLJHXBY2CO2V1F05XZMCH3U143BO5MTFDK3MRV0WB5DSG0";

var expect = require('chai').expect;
var venueGenerator = require('../index')(clientId, clientSecret);

describe('#venueGenerator', function() {
  it('should get 5 food venues', function(done) {
    venueGenerator.find({limit: 5})
    .then(function(venues) {
      expect(venues).to.have.length(5);
      done();
    })
    .catch(function(err) {
      assert.fail(error);
      done();
    });
  });
});
