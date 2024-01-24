
function handleError(res, error) {
    console.log(error);
    return res.status(400).send(error.message);
}

function handleResponse(res, data){
   return data instanceof Error ?handleError(res, data) : res.send(data)
}

module.exports ={handleError, handleResponse}