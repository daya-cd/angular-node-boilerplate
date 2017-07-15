/**
 * Admin Controller
 */

 
 module.exports = function(adminModel, userAuth) {
 	var adminObj = {};



 	adminObj.checkadmin = function(req, res, next) {
 		var pID = req.query.pid || (req.cookies ? req.cookies.pid : null);
 		console.log(pID);
 		if (!pID) {
 			res.status(400).send({
 				"message": "id is required!"
 			});
 			return;
 		}
 		adminModel.checkadmin(pID, function(err, result) {
 			if (err) {
 				res.status(500).send({
 					"error": "server error"
 				});
 			} else {
 				if(result){
 					res.status(200).send("admin");
 				}else
 				{
 					res.send("not admin");
 				}
 			}
 		});
 	};



 	
 	
 	return adminObj;
 };