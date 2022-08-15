## Backend installation 
npm install 



## Backend run 
npm run run 


## Routes Testing 
    open transactions-api.postman_collection.json 
    using postman 


### project structure 
- main.js is server launcher and containes 
    - Add transaction POST route 
    - Select latest transactions route
    - Select payer balances


- database.js containes payers and transaction data         definitions

- utilities folder containes 
    - validate_request.js containes requests body validator
    - response_handler.js containes response error messages
