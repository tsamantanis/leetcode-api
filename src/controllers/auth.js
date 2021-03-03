const jwt = require('express-jwt');

function getTokenFromHeader(req){
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
        req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }

    return null;
}

const auth = {
    required: jwt({
        secret: process.env.SECRET,
        userProperty: 'payload',
        getToken: getTokenFromHeader,
        algorithms: ['sha1', 'RS256', 'HS256'],
    }),
    optional: jwt({
        secret: process.env.SECRET,
        userProperty: 'payload',
        credentialsRequired: false,
        getToken: getTokenFromHeader,
        algorithms: ['sha1', 'RS256', 'HS256'],
    })
};

module.exports = auth;
