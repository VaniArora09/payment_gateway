let vendorValidator = require('./validator/vendorValidator');
let vendorController = require('./controller/vendorController.js');


 app.post('/vendor/Register',         vendorValidator.vendorRegister,vendorController.vendorRegister);
 app.post('/vendor/login',            vendorValidator.vendorLogin,vendorController.vendorLogin);
 app.post('/vendor/makeItemBooking',  vendorValidator.makeItemBooking,vendorController.makeItemBooking);