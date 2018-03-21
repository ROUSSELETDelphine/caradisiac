// Declare required packages
var _ = require('underscore');
var es = require('elasticsearch');
var fs = require('fs');
// Set ElasticSearch location and port
var client = new es.Client({
    host : 'localhost:9200'
});

var xloop = _.size(json);
// Declare variable to contain body of JSON data for loading to ElasticSearch
var br = [];

/* Function to create body for loading to ElasticSearch */
async function create_bulk (bulk_request) {
  var obj = JSON.parse(fs.readFileSync('models_peugeot.json', 'utf8'));
  var i = 1;
  obj.forEach(function(model)
  {
    bulk_request.push( {index : { _index: 'peugeot', _type: 'model', _id: i }})
    bulk_request.push({ doc: model})
    i++
  })
  return bulk_request;
  };

// Call function to get body for loading
create_bulk(br);

// Standard function of ElasticSearch to use bulk command
client.bulk(
{
    body : br
}, function (err, resp) {
  console.log(err);
});
