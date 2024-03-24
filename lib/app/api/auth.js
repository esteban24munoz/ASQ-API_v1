const basicAuth = require('basic-auth');
const common = require('./common.js');

function requireLogin(req, res, next) {
    let user = basicAuth(req);
    if (user) {
        console.log(`Username = ${user.name}`);
        console.log(`Password = ${user.pass}`);
    }
}

function requiredAuth(req, res, next) {

const authHeader = req.headers.authorization;

    // Check if Authorization header exists and starts with 'Bearer '
    if (authHeader && authHeader.startsWith('Bearer ')) {
        // Extract the token from the Authorization header
        const token = authHeader.substring(7); // 'Bearer ' is 7 characters long

        // Here you can add additional logic to verify the token, like JWT verification
        
        // If the token is valid, call next() to pass control to the next middleware
        next();
    }
    else{
        common.notValidBearerToken(req, res);
    }
}

module.exports = { requireLogin };