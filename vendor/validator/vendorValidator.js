let responses = require('./../../modules/responses');
let Joi = require('joi');

module.exports ={
  vendorRegister : vendorRegister,
  vendorLogin    : vendorLogin,
  makeItemBooking : makeItemBooking,
  validateFields  : validateFields
};

function vendorRegister(req, res, next) {
 
  let schema = Joi.object().keys ({
    app_device_type  : Joi.string().optional(),
    first_name    : Joi.string().required(),
    last_name     : Joi.string().optional().allow(''),
    phone_no      : Joi.string().required(),
    email         : Joi.string().required(),
    company       : Joi.string().optional(),
    address       : Joi.string().optional(),
    lat           : Joi.string().optional(),
    lng           : Joi.string().optional(),
    description   : Joi.string().optional(),
    password      : Joi.string().required(),
    username      : Joi.string().required(),
  });
  var validFields = validateFields(req.body, res, schema);
  if (validFields) {
    next();
  }
}

function vendorLogin(req, res, next) {
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

  function makeItemBooking(req, res, next) {
   
    let schema = Joi.object().keys ({
      vendor_id    : Joi.number().required(),
      access_token : Joi.string().required(),
      item_id      : Joi.number().required(),
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