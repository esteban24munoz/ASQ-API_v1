
function notFound(req, res){
    res.status(404);
    res.render('notfound.hbs', {url: req.url});

}

function internalError(err, req, res, next){
    
}

module.exports = {notFound};