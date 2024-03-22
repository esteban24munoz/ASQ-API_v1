
function notFound(req, res){
    res.status(404);
    res.render('notfound.hbs', {url: req.url});

}

module.exports = {notFound};