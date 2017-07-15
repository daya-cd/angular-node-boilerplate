/**
 * Initialize all the components of the application.
 * Also works as a dependency injection.
 */
module.exports = function(app, express,sequelize) {
    var expressConfig = require('./expressConfig');
    var router = require('./router');
    var feedbackRouter = express.Router();


/* Checking datbase connection*/


  sequelize.authenticate().then(function (err) {

 if (err) {
    console.log('There is connection in ERROR');
 } else {
    console.log('Connection has been established successfully');
 }

});

   var email = require('./../components/email')();



    //Models
 
    var registerModel = require('./../models/RegisterModel')(sequelize);
    var adminModel= require('./../models/adminModel')(sequelize);
    var profileModel= require('./../models/profileModel')(sequelize);
    var emailModel = require('./../models/emailModel')();
    

    //Controllers
   

    var registerControllerObj = require('./../controllers/RegisterController')(registerModel);
    var adminControllerObj = require('./../controllers/adminController')(adminModel);
    var profileControllerObj = require('./../controllers/profileController')(profileModel);

     var emailControllerObj = require('./../controllers/EmailController')(email, emailModel);


    router(sequelize,feedbackRouter,registerControllerObj,adminControllerObj,profileControllerObj,emailControllerObj);
    expressConfig(app, feedbackRouter);
};