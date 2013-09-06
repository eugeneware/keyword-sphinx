# keyword-sphinx

A simple API wrapper around [backlink miner's](http://www.backlinkminer.com)
keyword research API.

## Installation

Install via npm:

``` bash
$ npm install keyword-sphinx
```

## Example Usage

``` js
var Sphinx = require('keyword-sphinx');
var sphinx = new Sphinx('http://your-keyword-sphix-api-server/sphinx/index.php');

sphinx.get('houses for sale', function (err, data) {
  // data contains the keyword data for the seed keyword 'houses for sale'
});

sphinx.suggestions('houses for sales', function (err, data) {
  // data contains keyword suggestions that are similar to 'houses for sale'
});

sphinx.suggestions('houses for sales', { limit: 10 }, function (err, data) {
  // only 10 rows are returned
});
```

## API
### new Sphinx(apiUrl)
Returns a new sphinx API object with the `apiUrl` as the API endpoint.

### Sphinx#get(keyword)
Get the keyword data for the keyword `keyword`

### Sphinx#suggestions(keyword, [options], callback)
Generate keywords suggestions based on the seed keyword `keywword`.

Takes an optional `options` object that can contain the following keys:

* limit: (this parameter is used to set the maximum number of suggestions returned and can be any number you choose)
* sort_by: (this parameter can be used to sort the suggestions based on global monthly search volume, local monthly search volume, and CPC). Valid values:
    * global_monthly_search: (sorts results based on Global Search Volume)
    * local_monthly_search: (sorts results based on Local Search Volume)
    * cpc: (sorts results based on cost per click)
* sort_direction: (this parameter sorts the results in either ascending or descending order based on the value set with the “sord_by” parameter). Valid Values:
    * asc: (ascending order)
    * desc: (descending order)
* cpc_min: (the minimum cost per click a keyword should have in order ot be included in the results returned)
* global_monthly_search_min: (the minimum global monthly search volume a keyword should have in order to be included in the results returned)
* local_monthly_search_min: (the minimum local monthly search volume a keyword should have in order ot be included in the results returned)
