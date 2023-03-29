function handler(event) {
  var authHeaders = event.request.headers.authorization;
  var host = event.request.headers.host;
  var request = event.request;

  // The Base64-encoded Auth string that should be present.
  // It is an encoding of `Basic base64([username]:[password])`
  // The username and password are:
  //      Username: john
  //      Password: foobar
  var expected = "Basic am9objpmb29iYXI=";

  // If an Authorization header is supplied and it's an exact match, pass the
  // request on through to CF/the origin without any modification.
  if (authHeaders && authHeaders.value === expected) {
    return request;
  }

  // Exclude api requests
  if (host.value === "api.doto.com") {
    return request;
  }

  // But if we get here, we must either be missing the auth header or the
  // credentials failed to match what we expected.
  // Request the browser present the Basic Auth dialog.
  var response = {
    statusCode: 401,
    statusDescription: "Unauthorized",
    headers: {
      "www-authenticate": {
        value: 'Basic realm="Restricted Area"',
      },
    },
  };

  return response;
}