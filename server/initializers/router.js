var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
    /**
     * Express Router, handles all user entity related routes and middleware
     */
module.exports = function(sequelize,feedbackRouter,registerControllerObj,adminControllerObj,profileControllerObj,emailControllerObj) {

    feedbackRouter.use(cookieParser());
    feedbackRouter.use(bodyParser.json());

      sequelize.sync().then(function (err) { 





        feedbackRouter.post('/api/register',registerControllerObj.register);
        feedbackRouter.post('/api/login',registerControllerObj.login);
        feedbackRouter.get('/api/currentuser',registerControllerObj.getCurrentuser);
 
        feedbackRouter.get('/api/checkadmin',adminControllerObj.checkadmin);
       
        feedbackRouter.put('/api/updateprofile', profileControllerObj.updateProfile);


         feedbackRouter.post('/api/resetpassword',registerControllerObj.resetpassword);
         feedbackRouter.post('/api/updatepassword',registerControllerObj.updatepassword);
         feedbackRouter.get('/api/gettoken/:token',registerControllerObj.checkvalidtoken);
         feedbackRouter.get('/api/logout',registerControllerObj.logout);
         feedbackRouter.post('/api/sendresetemail', emailControllerObj.resetemail);
         feedbackRouter.post('/api/invitemail', emailControllerObj.inviteregistermail);
          feedbackRouter.post('/api/thankyouemail', emailControllerObj.thankyoumail);

    
         
         
         
        
        });


};