### API url
The API url can be found at `/api/v1-0/*`

### Retrieving a token
* Flask HTTP Basic Auth is used for the API authorisation
* To retrieve a new token, make sure a user is registered in the database.
* Then go to `/api/v1-0/token` and login with the credentials. You do this by sending a username and a password when choosing Basic Auth as your Authorisation type (Try Postman)
* When you retrieve the token, you still need to use Basic Auth but instead of entering a username and a password, you can ignore the password field and just paste the token in the username field.
* These tokens gets send over HTTP headers

### API routes
Coming soon
