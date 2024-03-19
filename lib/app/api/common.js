// ERROR HANDLING   
function notFound(req, res) {
    res.status(404);
    res.json({message: "The requested resource could not be found."})
}

function unsupportedMethod(req, res) {
    res.status(405);
    res.json("Request method not supported for this resource");
}

function InternalServerError(err, req, res) {
    logger.error(err);
    res.status(500);
    res.json({message: "Internal Server Error"});
}


module.exports = {notFound, InternalServerError, unsupportedMethod}