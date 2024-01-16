
function handleError(err, res) {
    console.log(err);
    return res.sendStatus(400)
}

module.exports ={handleError}