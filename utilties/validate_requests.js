const response_handlers = require('./response_handlers')

// return bad request  if payer, points, timestamp not in body 
const validate_transaction = (req, res, next) => {
    if (! (req.body.payer && req.body.points && req.body.timestamp)) {          
        // return  bad request
        response_handlers.bad_request(res)
    }else{        
        next()
    }
}

// returns bad request if points not in body and points <= 0
const validate_request_transactions = (req, res, next) => {
    if (! (req.body.points && req.body.points >= 0 )) {          
        // return  bad request
        response_handlers.bad_request(res)
    }else{        
        next()
    }
}



module.exports = { validate_transaction , validate_request_transactions}