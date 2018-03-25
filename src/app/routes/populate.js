var es = require('../../elasticsearch');
const {getBrands} = require('node-car-api');
const {getModels} = require('node-car-api');


async function getCars () {
  const brands = await getBrands();
  const cars = [];
  for (var i = 0; i < brands.length; i++){
    const models = await getModels(brands[i]);
    models.forEach(models => cars.push(models));
    es.index('model', models);
  }
  //exportToJson(cars, 'cars');
}

async function exportToJson(obj, name_new_file){
  let data = JSON.stringify(obj, null, 2);
  fs.writeFile(name_new_file + '.json', data);
}


module.exports = function(app, db){
  app.post('/populate', (req, res) =>{
    // Create here
    getCars();
  });
};
