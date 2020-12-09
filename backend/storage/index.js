
exports.handler = async (event) => {
    let fbId = "you";
    let days = "days";
   
    let responseCode = 200;
    console.log("request: " + JSON.stringify(event));

    if (event.body) {
        let body = JSON.parse(event.body)
        fbId = body.fbId;
        days = body.days
    }
 
    let information = `fbId is ${fbId} and days is ${days}`;

    let responseBody = {
        message: information,
    };
    //Trying something new
    // The output from a Lambda proxy integration must be 
    // in the following JSON object. The 'headers' property 
    // is for custom response headers in addition to standard 
    // ones. The 'body' property  must be a JSON string. For 
    // base64-encoded payload, you must also set the 'isBase64Encoded'
    // property to 'true'.
    let response = {
        statusCode: responseCode,
        headers: {
            "x-custom-header" : "my custom header value"
        },
        body: JSON.stringify(responseBody)
    };
    console.log("response: " + JSON.stringify(response))
    return response;
};