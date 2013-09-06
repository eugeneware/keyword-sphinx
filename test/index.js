var expect = require('expect.js'),
    Sphinx = require('..'),
    _ = require('underscore');

describe('keyword-sphinx', function() {
  var sphinx;
  beforeEach(function(done) {
    sphinx = new Sphinx(process.env.KEYWORD_SPHINX);
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

  it('should be able to limit the number of results', function (done) {
    sphinx.suggestions('houses for sale', { limit: 3 }, function (err, data) {
      if (err) return done(err);
      expect(data.data.length).to.be(3);
      done();
    });
  });

  it('should be able to sort by competition', function(done) {
    sphinx.suggestions('houses for sale',
      { limit: 3, sort_by: 'global_monthly_search', sort_direction: 'desc' },
      function (err, data) {
        if (err) return done(err);
        var last = Number.MAX_VALUE;
        expect(data.data.length).to.equal(3);
        data.data.forEach(function (row) {
          var value = row.global_monthly_search;
          expect(parseInt(value, 10)).to.not.be.above(last);
          last = value;
        });
        done();
      });
  });

  it('should be able to filter on cpc minimum values', function(done) {
    sphinx.suggestions('houses for sale',
      { limit: 3, cpc_min: 1.50 },
      function (err, data) {
        if (err) return done(err);
        expect(data.data.length).to.equal(3);
        data.data.forEach(function (row) {
          var value = parseFloat(row.cpc);
          expect(value).to.not.be.below(1.50);
        });
        done();
      });
  });

  it('should not allow arbitrary parameters to be passed in', function(done) {
    var kw = 'houses for sale';
    var needle = kw.split(' ').map(cleanse);
    sphinx.suggestions(kw, { keyword: 'dogs for sale', limit: 10 },
      function (err, data) {
        if (err) return done(err);
        data.data.forEach(function (row) {
          var haystack = row.keyword.split(' ').map(cleanse);
          var matches = _.intersection(needle, haystack);
          expect(matches.length).to.be(3);
        });
        done();
      });
  });
});
