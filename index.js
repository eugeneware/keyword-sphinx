var request = require('request');
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

Sphinx.prototype.suggestions = function(keyword, cb) {
  request({
    url: this.baseUrl + '/suggestions',
    qs: { keyword: keyword, suggestions: 'y' },
    json: true },
    function (err, res, body) {
      cb(err, body);
    });
};
