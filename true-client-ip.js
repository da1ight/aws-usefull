```
This function add true-client-ip header to incoming request.
```
function handler(event) {
    var request = event.request;
    var clientIP = event.viewer.ip;

    //Add the true-client-ip header to the incoming request
    request.headers['x-real-ip'] = {value: clientIP};

    return request;
}
