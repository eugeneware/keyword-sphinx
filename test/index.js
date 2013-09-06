var expect = require('expect.js'),
    Sphinx = require('..');

describe('keyword-sphinx', function() {
  it('should be able to scrape data from the API', function(done) {
    var sphinx = new Sphinx('http://74.52.41.202/sphinx/index.php');
    sphinx.get('houses for sale', function (err, data) {
      if (err) return done(err);
      expect(data.data.length).to.be.above(0);
      var part = data.data[0];
      expect(part.keyword).to.equal('houses for sale');
      ['global_monthly_search',
       'google_search_network',
       'local_monthly_search'].forEach(function (prop) {
        expect(part[prop]).to.be.above(1000);
      });
      done();
    });
  });
});
