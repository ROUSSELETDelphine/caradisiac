// Declare required packages
var es = require('elasticsearch');
var fs = require('fs');
// Set ElasticSearch location and port
var client = new es.Client({
    host : 'localhost:9200'
});
const {getBrands} = require('node-car-api');
const {getModels} = require('node-car-api');

async function getCars () {
  const brands = await getBrands();
  const cars = [];
  for (var i = 0; i < brands.length; i++){
    const models = await getModels(brands[i]);
    models.forEach(models => cars.push(models));
  }
  exportToJson(cars, 'cars');
}


async function getModelsFromBrand (brand) {
  const models = await getModels(brand);
  return models;
}


async function exportToJson(obj, name_new_file){
  let data = JSON.stringify(obj, null, 2);
  fs.writeFile(name_new_file + '.json', data);
}

getCars();
