let responses = require('./../../modules/responses');
let Joi = require('joi');

module.exports ={
  adminRegister   : adminRegister,
  adminLogin      : adminLogin,
  addItems        : addItems,
  validateFields  : validateFields
};

function adminRegister(req, res, next) {
 
  let schema = Joi.object().keys ({
    first_name    : Joi.string().required(),
    last_name     : Joi.string().optional(),
    phone_no      : Joi.string().required(),
    email         : Joi.string().required(),
    company       : Joi.string().optional(),
    password      : Joi.string().required(),
  });
  var validFields = validateFields(req.body, res, schema);
  if (validFields) {
    next();
  }
}

function adminLogin(req, res, next) {
  let schema = Joi.object().keys ({
    email        : Joi.string().required(),
    access_token : Joi.string().required(),
    password     : Joi.string().required(),
  });
  var validFields = validateFields(req.body, res, schema);
  if (validFields) {
    next();
  }
  }

  function addItems(req, res, next) {
   
    let schema = Joi.object().keys ({
      vendor_id    : Joi.number().required(),
      access_token : Joi.string().required(),
      itemName    : Joi.string().required(),
      price        : Joi.string().required(),
    });
    var validFields = validateFields(req.body, res, schema);
  if (validFields) {
    next();
  }
    }

    function validateFields(req, res, schema) {
    console.log("THE REQUEST BODY IS ------------->",req);
      var validation = Joi.validate(req, schema);
      if(validation.error) {
        var errorReason =
              validation.error.details !== undefined
                ? validation.error.details[0].message
                : 'Parameter missing or parameter type is wrong';
        console.log("error", validation.error.details);
        responses.sendError(res,errorReason, 404);
        return false;
      }
      return true;
    }