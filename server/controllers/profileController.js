/**
 * profile Controller
 */

 
 module.exports = function(profileModel, userAuth) {
 	var profileObj = {};

 	profileObj.updateProfile = function(req, res, next) {

 		var profileObj = req.body;
 		
 		profileModel.updateProfile(profileObj.id,profileObj.fname,profileObj.lname,profileObj.email,profileObj.password,profileObj.company,profileObj.fullname,function(err, result) {
			if (err) {
				res.status(500).send({
					"error": "server error"
				});
			} else {
				res.status(200).send(result);
			}
		});
 	};




 	



 	
 	
 	return profileObj;
 };