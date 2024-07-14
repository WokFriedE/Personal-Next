1. have form that processes the information on the client and sends it to the api
2. Basically goes to API checks for the user's hashed password, if same then make cookie
3. check cookie for proper has in the middleware, if bad redirect to login for all admin
4. redirect to data/dashboard when cookie detected
