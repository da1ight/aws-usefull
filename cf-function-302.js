```
This function redirects a user to a country-specific version of a site based on the country of the user. It  makes use of the Cloudfront-Viewer-Country geo-location header which performs a lookup on the request to determine the user's country and includes that value in the Cloudfront-Viewer-Country request header. You can use any of the geo-location or device detection headers that are available from CloudFront. For the geo-location or device detection headers to appear in the request object within a function, you must allow these headers (or allow all viewer headers) in a CloudFront origin request policy or cache policy.
```

function handler(event) {
    var request = event.request;
    var headers = request.headers;
    var host = request.headers.host.value;
    var newurl = 'https://$URL$/'; // Change the redirect URL to your choice
    var country = [ 'AD', 'AL', 'AT', 'AX', 'BA', 'BE', 'BG', 'BY', 'CH', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FO', 'FR', 'GB', 'GG', 'GI', 'GR', 'HR', 'HU', 'IE', 'IM', 'IS', 'IT', 'JE', 'LI', 'LT', 'LU', 'LV', 'MC', 'MD', 'ME', 'MK', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'RS', 'RU', 'SE', 'SI', 'SJ', 'SK', 'SM', 'TR', 'UA', 'VA', 'XK' ];

    if (headers['cloudfront-viewer-country']) {
        var countryCode = headers['cloudfront-viewer-country'].value;
        if (country.includes(countryCode)) {
            var response = {
                statusCode: 302,
                statusDescription: 'Found',
                headers:
                    { "location": { "value": newurl } }
                };

            return response;
        }
    }
    return request;
}
