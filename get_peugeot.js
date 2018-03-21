const {getModels} = require('node-car-api');
const fs = require('fs');

async function print () {
  const models = await getModels('PEUGEOT');

  exportToJson(models)
  console.log(models);
}

print();

async function exportToJson(models){
  const fs = require('fs');
  let data = JSON.stringify(models);
  fs.writeFile('models_peugeot.json', data);

}
