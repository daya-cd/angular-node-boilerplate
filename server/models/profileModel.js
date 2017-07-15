/**
 * Profile Model
 */
 var Sequelize = require("sequelize");

 module.exports = function(sequelize) {
 	var model = require("./model")(sequelize);
 	var profileModelObj = {};


 	var Login = model.Login;



 	profileModelObj.updateProfile=function(id,fname,lname,email,password,company,fullname,callback){

 		Login.update({
 			fname: fname,
 			lname:lname,
 			email:email,
 			company:company,
 			password: password,
 			fullname:fullname

 		},{
 			where:{
 				id: id
 			},individualHooks: true}).then(function(results){
 				callback(null, results);
 			}).catch(function (err)
 			{
 				console.log(err.message);
 				if(err.message=="Validation error")
 				{
 					console.log("found");
 					callback(null, {
 						duplicate: 1
 					});
 				}
 			});
 		};



 			return profileModelObj;
 		};