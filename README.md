This project is part of the [Adobe I/O Events](https://www.adobe.io/apis/cloudplatform/events.html) beta and helps get you set up to test Creative Cloud events. By going through the user consent flow you'll allow the integration you create to listen for events on your behalf so that you can test the webhooks you registered.

# Setup

This uses the starter files from the [Creative SDK](https://github.com/CreativeSDK/web-getting-started-samples/tree/master/getting-started/code) to perform authentication.

## Integration Setup

* Log into the [Adobe I/O Console](http://www.adobe.io/console/) and select the integration you created when you set up the webhooks. If you havne't set one up yet, create a new Adobe ID Key integration.
* Select *Web* as the platform and use `https://localhost:8080` as your redirect URI.
* Redirect URI pattern will be `https://localhost:8080`
* Add the Creative SDK as a service
* Save your changes

## Getting the Server running

* Clone this repo
* Add the Client ID and Client Secret from the integration you created above to `config.js`
* Install [http-server](https://www.npmjs.com/package/http-server) with `npm install http-server -g`
* Create an SSL cert `openssl req -new -x509 -keyout key.pem -out cert.pem -days 365 -nodes`
* Start the server with `http-server . -S` (the -S ensures it starts up with https)

## Authorizing Events
* Load [https://localhost:8080](https://localhost:8080) in your browser.
* You'll get an unsafe warning since you generated the certificate yourself, but click through to proceed
* Click on the "Authorize Events" button
* This will open a new window where you'll see the name of the application you created in the I/O Console and a list of services that it will now have access to.
* Click "Allow Access"
* The window will close and take you back to https://localhost:8080 and you should start seeing any asset changes you make trigger your webhook.
