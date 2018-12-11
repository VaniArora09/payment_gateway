const stripe = require("stripe")('sk_test_wYcl95vQuRtTClEfbmEjJE6p');
const stripePublicKey = require("stripe")('pk_test_lBHsebfROM5GuExOJ7mmt9xb');


module.exports={
    insertVendor : insertVendor,
    vendorLoginData : vendorLoginData,
    fetchItemsInfo : fetchItemsInfo,
    fetchVendorCardDetails : fetchVendorCardDetails,
    insertVendorCardDetails : insertVendorCardDetails,
    fetchVendorDetails      : fetchVendorDetails,
    createToken             : createToken,
    createCustomer          : createCustomer,
    createCharges           : createCharges,
    updateBookingStatus     : updateBookingStatus

}


function insertVendor(req, opts) {
    return new Promise((resolve, reject) => {
        console.log("THE OPTS ARE AS FOLLOW",opts);
        var sql = "INSERT INTO tb_vendors (first_name, last_name, phone_no, email, company, address, latitude, longitude,"+
            " app_device_type, access_token, username, password) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
        var sql_args = [opts.first_name,opts.last_name,opts.phone_no, opts.email, opts.company, opts.address, opts.latitude, 
            opts.longitude, opts.app_device_type, opts.access_token, opts.username, opts.password];
        con.query(sql, sql_args, function (err, result) {
            console.log("THE QUERY IS====>",this.sql);
            console.log("THE RESULT IS====>",result);
            if (err) {
                return reject(err);
            }
            return resolve(result);
        }); 
    });
};
function vendorLoginData(req, opts) {
    return new Promise((resolve, reject) => {
        let params = [opts.email,opts.password,opts.access_token];
        var sql = `SELECT * FROM tb_vendors WHERE email =?  AND password =?  AND access_token =?`
        con.query(sql, params, function (error, result) {
            console.log("THE RESULT IS====>",this.sql);
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
};
function fetchVendorCardDetails(req, opts) {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM tb_vendors_credit_card WHERE vendor_id =?";
        con.query(sql, [opts.vendor_id], function (error, result) {
            console.log("THE RESULT IS====>",result);
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
};
function insertVendorCardDetails(req, opts) {
    return new Promise((resolve, reject) => {
        console.log("THE OPTS ARE AS FOLLOW",opts);
        var sql = "INSERT INTO tb_vendors_credit_card (	card_token, last_four_digit, expiry_date, card_holder_name, vendor_id)"+
            " VALUES (?,?,?,?,?)";
        var sql_args = [opts.card_token,opts.last_four_digit,opts.expiry_date, opts.card_holder_name, opts.vendor_id];
        con.query(sql, sql_args, function (err, result) {
            console.log("THE QUERY IS====>",this.sql);
            console.log("THE RESULT IS====>",result);
            if (err) {
                return reject(err);
            }
            return resolve(result);
        }); 
    });
};
function fetchItemsInfo(req, opts) {
    return new Promise((resolve, reject) => {
        let params = [0];
        var sql = "SELECT * FROM tb_items WHERE is_deleted = ?"
        if(opts.item_id){
            sql +=" AND item_id =? ";
            params.push(opts.item_id)
        }
        con.query(sql, params, function (error, result) {
            console.log("THE RESULT IS====>",result);
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
};
function fetchVendorDetails(req, opts) {
    return new Promise((resolve, reject) => {
        let params = [opts.vendor_id,opts.access_token];
        var sql = `SELECT * FROM tb_vendors WHERE vendor_id =?  AND access_token =?`
        con.query(sql, params, function (error, result) {
            console.log("THE RESULT IS====>",this.sql);
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
};
function createToken(req, opts) {
    return new Promise((resolve, reject) => {
        stripe.tokens.create({
            card:{  
               "number": opts.card_number,
               "exp_month": opts.exp_month,
               "exp_year": opts.exp_year,
               "cvc": opts.cvv
       }
       },function(error,result){
        if(error) {
            return reject(error);
        }
        return resolve(result);
       });
    });
}
function createCustomer(req, opts) {
    return new Promise((resolve, reject) => {
        stripe.customers.create({
            description :"vani.arora@jungleworks.com",
            source : opts.token
        },function(error,result){
        if(error) {
            return reject(error);
        }
        return resolve(result);
       });
    });
}
function createCharges(req, opts) {
    return new Promise((resolve, reject) => {
        console.log("THE OPTS ARE ====================>",opts)
        stripe.charges.create({
            amount : opts.price,
            currency : "usd",
            customer : opts.id,
            description :"charge for vani.arora@gmail.com"
        },function(error,result){
        if(error) {
            return reject(error);
        }
        console.log("THE RESULT IS ",result);
        return resolve(result);
       });
    });
}
function updateBookingStatus(req, opts) {
    return new Promise((resolve, reject) => {
        let params = [opts.transaction_id,opts.vendor_id,opts.status,opts.price];
        var sql = `INSERT INTO tb_bookings(transaction_id, vendor_id, status, amount) VALUES (?,?,?,?)`
        con.query(sql, params, function (error, result) {
            console.log("THE RESULT IS====>",result);
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
};