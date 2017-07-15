/**
 * Email  Controller
 */

 var _jade = require('jade');
 var fs = require('fs');
 module.exports = function(emailComp, emailModel) {
 	var emailObj = {};
 	emailObj.resetemail = function(req, res, next) {

 		var emailObj = req.body;

 		var template = 'server/components/index.jade';
 		  fs.readFile(template, 'utf8', function(err, file){
 		  	if(err){
 		  		console.log('ERROR!');
 		  		return res.send('ERROR!');
 		  	}
 		  	else {
 		  		var compiledTmpl = _jade.compile(file, {filename: template});
 		  		var context = {title: 'Express'};
 		  		var html = compiledTmpl(emailObj);
 		  		
 		  		emailModel.html=html;
 		  		emailModel.to=emailObj.email;
 		  		emailModel.subject='Reset password – Atkins Behavioural Surveys';
 		  		// return res.send(html);
 		  		emailComp.sendMail(emailModel, function(error, info) {
 		  			if (error) {
 		  				res.status(500).send({
 		  					"error": "server error"
 		  				});
 		  			} else {
 		  				res.status(200).send({
 		  					"message": info.response
 		  				});
 		  			}
 		  		});
 		  	}
 		  });

 		};
 	emailObj.inviteregistermail = function(req, res, next) {
 		var emailObj = req.body;

 		var template = 'server/components/invite.jade';
 		  fs.readFile(template, 'utf8', function(err, file){
 		  	if(err){
 		  		console.log('ERROR!');
 		  		return res.send(err);
 		  	}
 		  	else {
 		  		var compiledTmpl = _jade.compile(file, {filename: template});
 		  	
 		  		var html = compiledTmpl(emailObj);
 		  		
 		  		emailModel.html=html;
 		  		emailModel.to=emailObj.email;
 		  		emailModel.subject='Atkins Behavioural Surveys';
 		  		// return res.send(html);

 		  		emailComp.sendMail(emailModel, function(error, info) {
 		  			if (error) {
 		  				res.status(500).send({
 		  					"error": "server error"
 		  				});
 		  			} else {
 		  				res.status(200).send({
 		  					"message": info.response
 		  				});
 		  			}
 		  		});
 		  	}
 		  });

 		};

	emailObj.thankyoumail = function(req, res, next) {
 		var emailObj = req.body;

 		var template = 'server/components/thankyou.jade';
 		  fs.readFile(template, 'utf8', function(err, file){
 		  	if(err){
 		  		console.log('ERROR!');
 		  		return res.send('ERROR!');
 		  	}
 		  	else {
 		  		var compiledTmpl = _jade.compile(file, {filename: template});
 		  	
 		  		var html = compiledTmpl(emailObj);
 		  		
 		  		emailModel.html=html;
 		  		emailModel.to=emailObj.email;
 		  		emailModel.subject='Welcome – Atkins Behavioural Surveys';
 		  		// return res.send(html);
 		  		emailComp.sendMail(emailModel, function(error, info) {
 		  			if (error) {
 		  				res.status(500).send({
 		  					"error": "server error"
 		  				});
 		  			} else {
 		  				res.status(200).send({
 		  					"message": info.response
 		  				});
 		  			}
 		  		});
 		  	}
 		  });

 		};
 			emailObj.testemail = function(req, res, next) {
 		var emailObj = req.body;

 		var template = 'server/components/thankyou.jade';
 		  fs.readFile(template, 'utf8', function(err, file){
 		  	if(err){
 		  		console.log(err);
 		  		console.log('ERROR!');
 		  		return res.send(err);
 		  	}
 		  	else {
 		  		var compiledTmpl = _jade.compile(file, {filename: template});
 		  	
 		  		var html = compiledTmpl(emailObj);
 		  		
 		  		emailModel.html=html;
 		  		emailModel.to="dayanithi.hari@atkinsglobal.com";
 		  		emailModel.subject='Welcome – Atkins Behavioural Surveys';
 		  		// return res.send(html);
 		  		emailComp.sendMail(emailModel, function(error, info) {
 		  			if (error) {
 		  				res.status(500).send({
 		  					"error": "server error"
 		  				});
 		  			} else {
 		  				res.status(200).send({
 		  					"message": info.response
 		  				});
 		  			}
 		  		});
 		  	}
 		  });

 		};
 		

 		
 		return emailObj;
 	};




