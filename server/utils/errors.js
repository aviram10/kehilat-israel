
function handleError(err, res) {
    console.log(err);
    res.sendStatus(400)
}

module.exports ={handleError}