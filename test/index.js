var expect = require('expect.js'),
    Sphinx = require('..'),
    _ = require('underscore');

describe('keyword-sphinx', function() {
  var sphinx;
  beforeEach(function(done) {
    sphinx = new Sphinx('http://74.52.41.202/sphinx/index.php');
    done();
  });

  function cleanse(item) {
    return item.replace(/[^\w]+/, '');
  }

  it('should be able to scrape data from the API', function(done) {
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

  it('should be able to get keyword suggestions', function(done) {
    var kw = 'houses for sale';
    var needle = kw.split(' ').map(cleanse);
    sphinx.suggestions(kw, function (err, data) {
      if (err) return done(err);
      expect(data.data.length).to.be.above(10);
      data.data.forEach(function (row) {
        var haystack = row.keyword.split(' ').map(cleanse);
        var matches = _.intersection(needle, haystack);
        expect(matches.length).to.be(3);
      });
      done();
    });
  });
});
