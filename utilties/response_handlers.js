const bad_request = ( res) => {
    res.status(400)
    res.json({ message: 'bad request' })

}

const successfull_request = ( res) => {
    res.status(200)
    res.json({ message: 'seccess' })
}

const server_error_request = ( res) => {
    res.status(500)
    res.json({ message: 'server error' })
}

const not_found_request = ( res) => {
    res.status(404)
    res.json({ message: 'not found' })
}




module.exports = { bad_request , successfull_request, server_error_request, not_found_request}