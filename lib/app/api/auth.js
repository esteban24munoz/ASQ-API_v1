const basicAuth = require('basic-auth');
const common = require('./common.js');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const fs = require("fs");
const crypto = require("crypto");
const config = require('../../config.js');

// function requireLogin(req, res, next) {
//     let user = basicAuth(req);
//     if (user) {
//         console.log(`Username = ${user.name}`);
//         console.log(`Password = ${user.pass}`);
//     }
// }

async function requireLogin(req, res, next) {
const authorizationHeader = req.get('Authorization') || '';
const match = authorizationHeader.match(/Bearer\s+(\S+)/i);
let payload = null;
let pubkey = fs.readFileSync(config.projectPath('./tas.pub.pem'));
if (match) {
    const token = match[1];

    try {
        payload = await jwt.verify(
            token,
            pubkey
        );
  console.log(payload); 
  next();
 }
    
    catch (err) {
        console.log('Invalid token');
    }
}
else {
    console.log('Invalid "Authorization" header');
}
}


module.exports = { requireLogin };