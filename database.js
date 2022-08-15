/** Payer Data Definition
    Name   :Sting Unique   ex: 'DABBON' 'MILLER COORS' 
    Points :Natural Number ex: 0, 1, 2
*/
// payer_data
const payers = new Map();

// for testing 
payers.set('DANNON', 0)
payers.set('UNILEVER', 0)
payers.set('MILLER COORS', 0)

/** Payer Transactions Data Definition
 {
    payer     :string      ex: 'DABBON' 'MILLER COORS' 
    points    :integer     ex: -300, 200
    timestamp :string      ex: '2020-10-31T11:00:00Z'
 }
*/
const payers_transactions = [] ;

module.exports = {payers , payers_transactions}


// for testing 
// const payers_transactions = [
//     { payer: 'DANNON', points: 1000, timestamp: '2020-11-02T14:00:00Z' },
//     { payer: 'UNILEVER', points: 200, timestamp: '2020-10-31T11:00:00Z' },
//     { payer: 'DANNON', points: -200, timestamp: '2020-10-31T15:00:00Z' },
//     {
//         payer: 'MILLER COORS',
//         points: 10000,
//         timestamp: '2020-11-01T14:00:00Z'
//     },
//     { payer: 'DANNON', points: 300, timestamp: '2020-10-31T10:00:00Z' }
// ]