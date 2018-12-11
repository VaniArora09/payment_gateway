let validator = require('./validator/validator');
let controller = require('./controller/controller.js');


 app.post('/admin/Register',         validator.adminRegister,controller.adminRegister);
 app.post('/admin/login',            validator.adminLogin,controller.adminLogin);
 app.post('/admin/addItems',         validator.addItems,controller.addItems);