const basicAuth = require('basic-auth');
const common = require('./common.js');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const fs = require("fs");
const crypto = require("crypto");

// function requireLogin(req, res, next) {
//     let user = basicAuth(req);
//     if (user) {
//         console.log(`Username = ${user.name}`);
//         console.log(`Password = ${user.pass}`);
//     }
// }

function requireLogin(req, res, next) {

    const authHeader = req.headers['Authorization'];

    // Check if Authorization header exists and starts with 'Bearer '
    if (authHeader && authHeader.startsWith('Bearer ')) {
        // Extract the token from the Authorization header
        const token = authHeader && authHeader.split(' ')[1]; // 'Bearer ' is 7 characters long
        if(token == null) return res.status(403).json({ message: 'not token provided'})

        try{
            //TAs Public Key
            const publicKeyRes = axios.get('taz.harding.edu');
            const publicKey = publicKeyRes.data.key;

            // Do once at startup
            // const publicKey = crypto.createPublicKey({ key: fs.readFileSync("tas.pub.pem"), format: "pem" });

            // // Do every time you need to verify a key
            // const payload = await jwt.verify(token, publicKey, { issuer: "taz.harding.edu" });

             // Verify and decode the token using the public key
            const decoded = jwt.verify(token, publicKey);


            // Check if "admin" role exists in the decoded token's roles array 
            const roles = decoded.roles || [];
            const isAdmin = roles.map(role => role.toLowerCase().includes("admin"));

            //Set isAdmin property in the request of the object
            req.isAdmin = isAdmin;

            //call next midleware func
            next();

        }
        catch(error){
            // common.notValidBearerToken(req, res);
            res.status(401).json({error: 'NOt valid token'});
        }


        //EXTRACT USERNAME from the decoded token
        const username = decoded.sub;

        if(!requireWritePermissions(req, username)){
            return res.status(403).json({ error: 'User is not authorized' });
        }

        // User is authenticated and authorized
        req.username = username;
        next();
    }
    else{
        common.notValidBearerToken(req, res);
    }
}


module.exports = { requireLogin };