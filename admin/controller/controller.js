let commonFun =  require('../../modules/commonFunctions');
let responses =  require('../../modules/responses');
let Service = require('../services/services');
let md5 = require('md5');
let _ = require('underscore');

module.exports ={
    adminRegister  : adminRegister,
    adminLogin     : adminLogin,
    addItems       : addItems
}
async function adminRegister(req, res) {
    try {
        console.log("THE REQUEST BODY FOR ADMIN REGISTER IS ",req.body);
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let phone_no = req.body.phone_no;
        let email = req.body.email;
        let company = req.body.company;
        let date = new Date();
        let access_token = date.getTime();
        let toekn = md5(access_token);
        let opts = {
            email : email
        }
        let check = await commonFun.checkAdminEmailExits(req,opts);
        if (check.length) {
            return responses.authenticationFailed(res, error)
        }
        opts = {
            first_name    : first_name,
            last_name     : last_name,
            phone_no      : phone_no,
            email         : email,
            company       : company,
            access_token  : toekn,
            password      : req.body.password
        };
        console.log("THE DATA IS ",opts);
        let result = await Service.insertAdmin(req,opts);
        if(result.affectedRows>0){
            return responses.actionCompleteResponse(res,result);
        }
          // action complete response
    } catch (error) {
        return responses.sendError(res,error)     // execute error response 
    }
};

async function adminLogin(req, res) {
    try {
        console.log("THE REQUEST BODY FOR ADMIN LOGIN IS ", req.body);
        let opts = {
            email        : req.body.email,
            password     : req.body.password,
            access_token :  req.body.access_token
        }
        let result = await Service.adminLoginData(req, opts);
        if (_.isEmpty(result)) {
            return responses.authenticationFailed(res, error)
        }
        return responses.loginSuccessfully(res, result);  // action complete response
    } catch (error) {
        return responses.sendError(res, error);    // execute error response 
    }
};
async function addItems(req, res) {
    try {
        console.log("THE REQUEST BODY FOR ADMIN LOGIN IS ", req.body);
        let opts = {
           itemName : req.body.itemName,
           price    : req.body.price
        }
        let result = await Service.addItems(req, opts);
        if (result.affectedRows>0) {
            return responses.sendError(res, error)
        }
        return responses.actionCompleteResponse(res, result);  // action complete response
    } catch (error) {
        return responses.sendError(res, error);    // execute error response 
    }
};