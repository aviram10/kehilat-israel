
function handleError(err, res) {
    console.log(err);
    return res.sendStatus(400)
}

function handleResponse(result, res){
   return result instanceof Error ? res.status(400).json(result) : res.send(result)
}

module.exports ={handleError}