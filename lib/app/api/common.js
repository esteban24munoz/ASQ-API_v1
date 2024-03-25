// ERROR HANDLING   
function notFound(req, res) {
    res.status(404);
    res.json({message: 'The resource ' + req.originalUrl + ' was not found.'});
}

function unsupportedMethod(req, res) {
    res.status(405);
    res.json({message:'The resource ' + req.originalUrl + ' does not support method requests.'});
}

function InternalServerError(err, req, res) {
    logger.error(err);
    res.status(500);
    res.json({message: 'The server encountered an unexpected error.'});
}

function notValidBearerToken(req, res) {
    res.status(401);
    set('WWW-Authenticate', 'Bearer');
    res.json({message: 'Authorization is required'});
}

function notAuthorizedAction(req, res){
    res.status(403);
    res.json({message: 'User not authorized to perform this action'})
}



module.exports = {
    notFound, 
    InternalServerError,
    unsupportedMethod,
    notValidBearerToken,
    notAuthorizedAction
}