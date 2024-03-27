const basicAuth = require('basic-auth');
const common = require('./common.js');
const jwt = require('jsonwebtoken');
const fs = require("fs");
const crypto = require("crypto");
const config = require('../../config.js');

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
            pubkey,
            (err, decoded) => {
                if (err) {
                    // Handle invalid token
                    return res.status(401).json({ message: 'Invalid token' });
                }
                
                // Extract the sub from the decoded payload
                const sub = decoded.sub;
                req.sub = sub;
                console.log('Subject:', sub);
                
                // Check if "admin" role exists in the decoded token's roles array
                const roles = decoded.roles || [];
                const isAdmin = roles.map(role => role.toLowerCase()).includes("admin");

                // Set isAdmin property in the request object
                req.isAdmin = isAdmin;
                console.log(isAdmin);
            });
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