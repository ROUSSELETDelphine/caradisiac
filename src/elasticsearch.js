var elasticsearch = require('elasticsearch');
const esClient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'error'
});



// Declare variable to contain body of JSON data for loading to ElasticSearch
var br = [];

function index(name, element){
  //Call function to get body for loading
  create_bulk(br, element, name);
}

/* Function to create body for loading to ElasticSearch */
async function create_bulk (bulk_request, element, name) {
  var obj = element;
  var i = 1;
  obj.forEach(function(model)
  {
    bulk_request.push( {index : { _index: 'cars', _type: name, _id: i }})
    bulk_request.push({ doc: model})
    i++
  });
  return bulk_request;
}

// Standard function of ElasticSearch to use bulk command
esClient.bulk(
{
    body : br
}, function (err, resp) {
  console.log(err);
});

module.exports.index = index;
