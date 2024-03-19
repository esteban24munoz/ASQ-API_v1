const path = require('path');
const url = require('url');


function findProjectDir(){
    return path.join(__dirname, '..');
}

const projectDir = findProjectDir();

function projectPath(...localPaths){
    return path.join(projectDir, ...localPaths);
}

const logLevel = (process.env.LOG_LEVEL || 'debug').toLowerCase();

const httpPort = 8000;

//DATABASE VAR
const dbHost = '127.0.0.1';
const dbName = 'asq';

module.exports = {
    projectDir,
    projectPath,
    httpPort,
    logLevel,
    dbHost,
    dbName
};