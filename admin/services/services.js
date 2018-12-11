module.exports={
    insertAdmin    : insertAdmin,
    adminLoginData : adminLoginData,
    addItems       : addItems
}


function insertAdmin(req, opts) {
    return new Promise((resolve, reject) => {
        console.log("THE OPTS ARE AS FOLLOW",opts);
        var sql = "INSERT INTO tb_vendors (first_name, last_name, email, phone_no, password, company, access_token)"+
            " VALUES (?,?,?,?,?,?,?)";
        var sql_args = [opts.first_name,opts.last_name, opts.email, opts.phone_no, opts.password, opts.company,opts.access_token];
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
function adminLoginData(req, opts) {
    return new Promise((resolve, reject) => {
        let params = [];
        var sql = "SELECT * FROM tb_admin WHERE 1=1"
        if(opts.email){
        sql += "AND email =?"
        params.push(opts.email);
    }
        if(opts.password){
            sql += "AND password =?"
            params.push(opts.password);
        } 
        if(opts.access_token){
            sql += "AND access_token =?"
            params.push(opts.access_token);
        } 
        if(opts.admin_id){
            sql += "AND admin_id =?"
            params.push(opts.admin_id);
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

function addItems(req, opts) {
    return new Promise((resolve, reject) => {
        console.log("THE OPTS ARE AS FOLLOW",opts);
        var sql = "INSERT INTO tb_items (itemName, price) VALUES (?,?)";
        var sql_args = [opts.itemName,opts.price];
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