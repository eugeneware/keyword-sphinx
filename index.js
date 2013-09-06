var request = require('request'),
    _ = require('underscore');
module.exports = Sphinx;

function Sphinx(baseUrl) {
  this.baseUrl  = baseUrl;
}

Sphinx.prototype.get = function(keyword, cb) {
  request({
    url: this.baseUrl + '/suggestions',
    qs: { keyword: keyword },
    json: true },
    function (err, res, body) {
      cb(err, body);
    });
};

Sphinx.prototype.suggestions = function(keyword, options, cb) {
  if (typeof cb === 'undefined') {
    cb = options;
    options = {};
  }
  options = _.pick(options, ['limit', 'sort_by', 'sort_direction', 'cpc_min',
                  'global_monthly_search_min', 'local_monthly_search_min']);
  options = _.extend(options, { keyword: keyword, suggestions: 'y' });
  request({
    url: this.baseUrl + '/suggestions',
    qs: options,
    json: true },
    function (err, res, body) {
      cb(err, body);
    });
};
