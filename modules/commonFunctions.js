
module.exports={
    checkEmailExits : checkEmailExits,
    checkAdminEmailExits : checkAdminEmailExits
}


    function checkEmailExits(req, opts) {
        return new Promise((resolve, reject) => {
            var sql = "SELECT * FROM tb_vendors WHERE email = ?";
            con.query(sql, [opts.email], function (error, result) {
                console.log("THE RESULT IS====>",this.sql);
                if (error) {
                    return reject(error);
                }
                return resolve(result);
            });
        });
    };
    function checkAdminEmailExits(req, opts) {
        return new Promise((resolve, reject) => {
            var sql = "SELECT * FROM tb_admin WHERE email = ?";
            con.query(sql, [opts.email], function (error, result) {
                console.log("THE RESULT IS====>",this.sql);
                if (error) {
                    return reject(error);
                }
                return resolve(result);
            });
        });
    };