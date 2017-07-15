var Sequelize = require('sequelize');
var bcrypt = require("bcrypt-nodejs");


module.exports = function (sequelize) {
	
	var Login = sequelize.define("logins", {

		email: {type: Sequelize.STRING,allowNull:false,unique: true},
		password: Sequelize.STRING,
		fname: Sequelize.STRING,
		lname: Sequelize.STRING,
		company: Sequelize.STRING,
		token:Sequelize.TEXT,
		fullname:Sequelize.STRING

	},
	{
		instanceMethods: {
			checkPassword:function(password,cb) {
				var logins= this;
				bcrypt.compare(password, logins.get('password'), function(err, isMatch) {
					if (err) return cb(err);
					cb(null, isMatch);
				});
			},
			 method2: function() { 
			 	return 'foo' 
			 }

		},
		hooks: {
			beforeCreate:function(instance, optons, next) {

				var SALT_FACTOR = 5;
				if (!instance.changed('password')) return next();
				bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
					if (err) return next(err);

					bcrypt.hash(instance.get('password'), salt, null, function(err, hash) {
						if (err) return next(err);
						instance.set('password', hash);
          		// console.log(instance.get('password'))
          		next();
          	});
				});

			},
			beforeUpdate:function(instance, optons, next) {
				var SALT_FACTOR = 5;
				if (!instance.changed('password')) return next();

				bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
					if (err) return next(err);

					bcrypt.hash(instance.get('password'), salt, null, function(err, hash) {
						if (err) return next(err);
						instance.set('password', hash);
						next();
					});
				});


			}
		}
	});


var Roles = sequelize.define("roles", {

	user_id:Sequelize.INTEGER,
	role:Sequelize.STRING

});



return {
	Login: Login,
	Roles:Roles
};
};