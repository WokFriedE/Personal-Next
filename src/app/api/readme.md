# API Docs

-   Each folder acts as a route with route.js acting as the handler for the api end point
-   Each endpoint's routejs can have functions for each of the api methods which will run the function on call

## API Methods

### Method types

-   GET method: retrieves information or data from a specified resource.
-   POST method: submits data to be processed to a specified resource.
-   PUT method: updates a specified resource with new data.
-   DELETE method: deletes a specified resource.
-   PATCH method: partially updates a specified resource.

### Method Interaction

-   Each method can have a request JSON sent to it - it would await the json info
-   The req's JSON can have info from the passed body and it basically acts as props
    -   Those req's can be used for POST and DELETE operations
    -   For POST in extracurricular, the RETURNING clause in SQLite3 allows for getting something back after it finishes
