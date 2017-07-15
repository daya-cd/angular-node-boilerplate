/**
 * Register Controller
 */

 var crypto = require('crypto');
 var encoding = 'base64';
 var hashAlgorithm = 'sha1';
 var secretKey = 'userkey';

 
 module.exports = function(registerModel, userAuth) {
 	var registerObj = {};
 	registerObj.register = function(req, res, next) {
 		var userObj = req.body;

 		
 		registerModel.register(userObj.email, userObj.password,
 			userObj.fname,userObj.lname,userObj.company,userObj.fullname,function(err, result) {
 				if (err) {
 					res.status(500).send({
 						"error": "server error"
 					});
 				} else {
 					if (result.duplicate) {
 						res.status(400).send({
 							"message": "Emailid already exists"
 						});
 					}
 					else{

 						res.status(201).send({
 							"message": "success"
 						});
 					}
 				}


 			});
 		

 	};

 	registerObj.login = function(req, res, next) {
 		var userObj = req.body;

 		console.log(userObj);
 		registerModel.login(userObj.email, userObj.password,function(err, result) {
 			if (err) {
 				res.status(500).send({
 					"error": "server error"
 				});
 			} else {
 				if(result!=='notmatch')
 				{

 					var hmacObj = crypto.createHash(hashAlgorithm, secretKey);
 					hmacObj.update(result.password);
 					var token= hmacObj.digest([encoding]);
 					res.cookie('pid', result.id);
 					res.cookie('id', result.email);
 					res.cookie('token', token);
 					res.status(200).send({
 						"message": "success"
 					});

 				}else
 				{
 					res.status(400).send({
 						"message": "password not matched"
 					});
 				}
 			}
 		});
 		
 	};
 	registerObj.getCurrentuser = function(req, res, next) {

 		// console.log(res);

 		var emailID = req.query.email || (req.cookies ? req.cookies.id : null);
 		console.log(emailID);
 		if (!emailID) {
 			res.status(400).send({
 				"message": "Emailid is required!"
 			});
 			return;
 		}
 		registerModel.getCurrentUser(emailID, function(err, result) {
 			if (err) {
 				res.status(500).send({
 					"error": "server error"
 				});
 			} else {
 				res.status(200).send(result);
 			}
 		});
 		

 	};


 	registerObj.resetpassword= function(req, res, next) {

 		var emailObj = req.body;

 		registerModel.resetpassword(emailObj.email,function(err, results) {
 			if (err) {
 				res.status(500).send({
 					"error": "server error"
 				});
 			} else {
 				console.log(results);
 				res.status(200).send(results);
 			}
 		});

 	};

 	registerObj.updatepassword= function(req, res, next) {

 		var updObj = req.body;

 		registerModel.updatepassword(updObj.token,updObj.password,function(err, result) {
 			if (err) {
 				res.status(500).send({
 					"error": "server error"
 				});
 			} else {
 				
 				res.status(200).send(result);
 			}
 		});

 	};

 	registerObj.checkvalidtoken= function(req, res, next) {

 		var token = req.params.token;

 		registerModel.checkvalidtoken(token,function(err, result) {
 			if (err) {
 				res.status(500).send({
 					"error": "server error"
 				});
 			} else if(result){
 				res.status(200).send(result);
 			}else
 			{
 				res.send("not valid token");
 			}
 		});

 	};
 	registerObj.logout= function(req, res, next) {

 		res.clearCookie('pid');
 		res.clearCookie('id');
 		res.clearCookie('token');
		res.status(200).send({
			"message": "success"
		});

 	};

 	
 	

 	
 	return registerObj;
 };