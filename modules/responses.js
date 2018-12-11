module.exports ={
    parameterMissingResponse : parameterMissingResponse,
    actionCompleteResponse   : actionCompleteResponse,
    loginSuccessfully        : loginSuccessfully,
    sendError                : sendError,
    authenticationFailed     : authenticationFailed
}



function parameterMissingResponse(res, err, data) {
    var response = {
        "message": err|| "PARAMETER_MISSING",
        "status": 404,
        "data" : data || {}
    };
    res.send(JSON.stringify(response));
};

function actionCompleteResponse(res, data) {
    var response = {
        "message": "ACTION_COMPLETE",
        "status": 200,
        "data" : data || {}
    };
    res.send(JSON.stringify(response));
};
function loginSuccessfully(res, data, msg) {
    var response = {
    message: "LOGIN_SUCCESSFULLY",
    status : 200,
    data   : data || {}
  };
  res.send(JSON.stringify(response));
}

function sendError(res, data, message) {
    var response = {
      message:"ERROR_IN_EXECUTION",
      status : 201,
      data   : data || {}
    };
    res.send(JSON.stringify(response));
  }
  function authenticationFailed(res, data, message) {
    var response = {
      message:"ERROR_IN_AUTHENTICATION",
      status : 201,
      data   : data || {}
    };
    res.send(JSON.stringify(response));
  }