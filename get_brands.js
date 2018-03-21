const {getBrands} = require('node-car-api');
const fs = require('fs');

async function print () {
  const brands = await getBrands();
  exportToJson(brands);
  console.log(brands);
}

print();

async function exportToJson(brands){
  const fs = require('fs');
  let data = JSON.stringify(brands, null, 2);
  fs.writeFile('brands.json', data);

}
