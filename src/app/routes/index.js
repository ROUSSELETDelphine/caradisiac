const populate = require('./populate');

module.exports = function(app, db){
  populate(app, db);
}
