const express = require('express');
const validate_requests = require('./utilties/validate_requests');
const response_handler = require('./utilties/response_handlers')
const datatbase = require('./database')


const app = express()
const port = 5000
app.use(express.json());


// payers 
const payers = datatbase.payers

// payers transaction
const payers_transactions = datatbase.payers_transactions

/*

5 hours connect with instgram (manual test)
2 hours retrive data into just html

 */
/** Post Payer Transaction Router
 
-  Recives      points ex: '2020-10-31T11:00:00Z'
    

-  Returns 
    200 status -> successfull trnsaction
    400 status -> bad request
    500 status -> server error
*/
app.post('/transaction', validate_requests.validate_transaction, (req, res) => {
    const transaction = {
        payer: req.body.payer,
        points: req.body.points,
        timestamp: req.body.timestamp
    }

    // return bad reques if payer is not found and expected balance after transaction is less than 0         
    if (payers.get(transaction.payer) === undefined || payers.get(transaction.payer) + transaction.points < 0) {
        // return bad request 400 status code
        response_handler.bad_request(res)
        return
    }


    // add transaction 
    payers_transactions.push(transaction)


    // update payers poitns 
    payers.set(transaction.payer, payers.get(transaction.payer) + transaction.points)



    // LOG TRANACTIONS
    console.log('transactions: ', payers_transactions)
    // LOG TRANACTIONS
    console.log("payer's points ", payers)


    // return success response
    response_handler.successfull_request(res)

    try {

    }
    catch (error) {
        // return server error response
        response_handler.server_error_request(res)
    }
})

/**
 *  compare transaction depends on timestamp
 *  sort from latest transactions
 */
const compare = (transaction, transaction2) => {
    const transaction_timestamp = Date.parse(transaction.timestamp)
    const transaction2_timestamp = Date.parse(transaction2.timestamp)
    if (transaction_timestamp < transaction2_timestamp) {
        return -1;
    }
    if (transaction_timestamp > transaction2_timestamp) {
        return 1;
    }
    return 0;
}

// add points into payer key if payer key is found else define new one with pionts
const add_to_map = (points, payer, map) => {

    if (map.get(payer) === undefined) {
        map.set(payer, points)
    }
    else {
        map.set(payer, (map.get(payer) + points))
    }
}

// calaculate points that will withdraw
const update_balance = (transaction, remaining)=>{
    let points = transaction.points
    
    if (remaining - points <= 0) {
        points = remaining         
    }
    if (payers.get(transaction.payer) - points < 0){
        points = payers.get(transaction.payer)        
    }
    return points
}

// select transaction from data
const get_lastest_transactions = (wanted_points) => {
    payers_transactions.sort(compare)

    let remaining = wanted_points
    const transactions_summery = new Map()
    console.log('transactinons are ', payers_transactions)
    for (const transaction of payers_transactions) {
        //update payer balance 
        if (remaining == 0) {
            break
        }
        if (payers.get(transaction.payer) == 0) {
            continue
        }

        let points = update_balance(transaction, remaining)
        remaining -= points
        payers.set(transaction.payer, payers.get(transaction.payer) - points)
        add_to_map(-points, transaction.payer, transactions_summery)
        
    }

    console.log('ramaming is ', remaining)
    console.log('response ', transactions_summery)
    console.log('payers are ', payers)
    return transactions_summery
}

/*
    return requested latest transactions  
 */
app.post('/transactions', validate_requests.validate_request_transactions, (req, res) => {    
    res.json(Object.fromEntries(get_lastest_transactions(req.body.points)))
})


// current payers balance 
app.get('/payers', (req, res)=>{
    res.json(Object.fromEntries(payers))
}) 


// run server 
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})