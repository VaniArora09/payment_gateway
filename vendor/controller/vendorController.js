let commonFun =  require('../../modules/commonFunctions');
let responses =  require('../../modules/responses');
let vendorService = require('../services/vendorServices');
let md5 = require('md5');
let _ = require('underscore');
const stripe = require("stripe")('sk_test_wYcl95vQuRtTClEfbmEjJE6p');
const stripePublicKey = require("stripe")('pk_test_lBHsebfROM5GuExOJ7mmt9xb');

module.exports ={
    vendorRegister  : vendorRegister,
    vendorLogin     : vendorLogin,
    makeItemBooking : makeItemBooking
}
async function vendorRegister(req, res) {
    try {
        console.log("THE REQUEST BODY FOR VENDOR REGISTER IS ",req.body);
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let phone_no = req.body.phone_no;
        let email = req.body.email;
        let company = req.body.company;
        let address =  req.body.address;
        let latitude =  req.body.lat;
        let longitude = req.body.lng;
        let date = new Date();
        let access_token = date.getTime();
        let toekn = md5(access_token);
        let username = req.body.username;
        let opts = {
            email : email
        }
        let check = await commonFun.checkEmailExits(req,opts);
        if (check.length) {
            return responses.authenticationFailed(res, error)
        }
        opts = {
            first_name : first_name,
            last_name  : last_name,
            phone_no      : phone_no,
            email      : email,
            company    : company,
            address    : address,
            latitude   : latitude,
            longitude  : longitude,
            app_device_type : req.body.app_device_type,
            access_token : toekn,
            username  : username,
            password  : req.body.password
        };
        console.log("THE DATA IS ",opts);
        let result = await vendorService.insertVendor(req,opts);
        if(result.affectedRows>0){
            return responses.actionCompleteResponse(res,);
        }
          // action complete response
    } catch (error) {
        return responses.sendError(res,error)     // execute error response 
    }result
};

async function vendorLogin(req, res) {
    try {
        console.log("THE REQUEST BODY FOR VENDOR LOGIN IS ", req.body);
        let opts = {
            email        : req.body.email,
            password     : req.body.password,
            access_token :  req.body.access_token
        }
        let result = await vendorService.vendorLoginData(req, opts);
        if (_.isEmpty(result)) {
            return responses.authenticationFailed(res, error)
        }
        return responses.loginSuccessfully(res, result);  // action complete response
    } catch (error) {
        return responses.sendError(res, error);    // execute error response 
    }
};

async function makeItemBooking(req, res) {
    try {
        let card_number = "4242424242424242"; // TODO
        let exp_month = "12";
        let exp_year = "2019";
        let cvv = "123";
        let abc;
        let card_token;
        console.log("THE REQUEST BODY FOR VENDOR BOOKING IS ", req.body);
        let opts ={
            access_token : req.body.access_token,
            vendor_id : req.body.vendor_id
        }
        let vendorDetails = await vendorService.fetchVendorDetails(req,opts);
        if(_.isEmpty(vendorDetails)){
            return responses.authenticationFailed(res, error)
        }
        opts = {
            item_id : req.body.item_id
        }
        let result = await vendorService.fetchItemsInfo(req, opts);
        if (!result.length) {
            return responses.authenticationFailed(res, error)
        }
        let price = result[0].price;
        opts = {
             vendor_id : req.body.vendor_id
        }
        let card = await vendorService.fetchVendorCardDetails(req, opts);
        console.log("THE CARD IS ----->",card);
        if(_.isEmpty(card)){
            opts = {
               card_number  :card_number,
                exp_month   :exp_month,
               exp_year :exp_year,
               cvv : cvv
            }
            card_token = await vendorService.createToken(req,opts);
            console.log("THE TOKEN GENERATED IS",card_token);
            opts ={
                token :card_token.id
            }
              abc = await vendorService.createCustomer(req,opts);
             console.log("THE DETAILS ARE AS FOLLOW",abc);
            opts = {
                card_token : abc.id,
                last_four_digit : card_number,
                expiry_date : exp_month+"/"+exp_year,
                card_holder_name : vendorDetails[0].first_name,
                vendor_id  : req.body.vendor_id,

            }
            await vendorService.insertVendorCardDetails(req, opts);
            }
            if(_.isEmpty(card)){
                opts ={
                    price : price,
                    id    :abc.id 
                }
            }
            else{
                console.log("the card details are ------------->",card[0].card_token);
                opts ={
                    price : price,
                    id    : card[0].card_token   
                }
            }
               result =  await vendorService.createCharges(req,opts);
               console.log("the Result ------------->",result.paid);
               if(result.paid == true){
                   opts ={
                       transaction_id :result.id,
                       vendor_id : req.body.vendor_id,
                       price     : price,
                       status    : "PAID"
                   }
                await vendorService.updateBookingStatus(req, opts);
               }
               else{
                opts ={
                    transaction_id :result.id,
                    vendor_id : req.body.vendor_id,
                    price     : price,
                    status    : "FAILED"
                }
             await vendorService.updateBookingStatus(req, opts);
                return responses.sendError(res, error);
               }
               console.log("THE PROCESS COMPLETE");
                return responses.actionCompleteResponse(res, result); // action complete response
    } catch (error) {
        return responses.sendError(res, error);    // execute error response 
    }
};
