/**
 * Register Model
 */
 var Sequelize = require("sequelize");

 module.exports = function(sequelize) {
  var model = require("./model")(sequelize);
  var adminModelObj = {};


  var Login = model.Login;
  var Roles = model.Roles;

  Roles.belongsTo(Login, {foreignKey: 'user_id',as:'user'});
  




adminModelObj.checkadmin=function(pID,callback){


 Roles.findOne({where:{user_id:pID},include: [{model:Login,as:'user'}]}).then(function(results){
  callback(null,results);
}).catch(function (err)
{
 callback(err);
});





};


return adminModelObj;
};