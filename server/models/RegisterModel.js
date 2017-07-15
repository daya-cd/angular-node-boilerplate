/**
 * Register Model
 */
 var Sequelize = require("sequelize");
 var crypto = require('crypto');

 module.exports = function(sequelize) {
  var model = require("./model")(sequelize);
  var registerModelObj = {};

  var Login = model.Login;










registerModelObj.register = function(email, password, fname, lname,company,fullname,callback) {

  Login.create({
    fname: fname,
    lname:lname,
    email:email,
    company:company,
    password: password,
    fullname:fullname
  }).then(function(results){
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
})
 ;

};
registerModelObj.login = function(email,password,callback) {
  Login.find({where:{email:email}}).then(function(logins){
    if(logins){
      logins.checkPassword(password, function(err, isMatch) {
        if(isMatch)
        {
         callback(null,logins);
       }
       else
       {
        callback(null,"notmatch");
      }

    }); 
    }else
    {
      callback(null,"notmatch");

    }

  });

};
registerModelObj.getCurrentUser=function(email,callback){
  Login.find({where:{email:email},attributes: ['id', 'email','fname','lname','company']}).then(function(logins){
    callback(null,logins);
  }).catch(function (err)
  {
   callback(err);
 });

};



registerModelObj.resetpassword=function(email,callback){

  var token=crypto.randomBytes(32).toString('hex');

  Login.update(
  {
    token: token
  },
  {
    where: { email : email }
  })
  .then(function (results) { 


    if(results==0)
    {
      callback(null);
    }else
    {

     Login.findOne({where:{email:email},attributes: {exclude: ['password','company','email']}}).then(function(resultname)
     {
     
  
      callback(null,{
        updated: 1,
        token:token,
        name:resultname.dataValues.fname,
      });
    });



   }
   
 }).error(function () {
  callback(err);
});


};

registerModelObj.updatepassword=function(token,password,callback){

  Login.update({
    password: password,
  },{
    where:{
      token: token
    },individualHooks: true}).then(function(results){

      if(results==0)
      {
        callback(null);
      }
      else
      {

        Login.update(
        {
          token:'null'
        },
        {
          where: { token : token }
        })
        .then(function () { 

        })
        .error(function () {

        });
        callback(null, results);

      }
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
  registerModelObj.checkvalidtoken=function(token,callback){

    Login.findAll({where:{token:token},attributes: {exclude: ['password']}}).then(function(results){

      if(results==0)
      {

       callback(null);
     }
     else{
      callback(null,results);

      
    }
  }).catch(function (err)
  {
    console.log(err);
    callback(err);
  });

};





registerModelObj.getUser = function(callback){

};

return registerModelObj;
};

