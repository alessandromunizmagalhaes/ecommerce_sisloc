const jsonwebtoken = require("jsonwebtoken");

const PRIVATE_KEY = "1010FFF";
const user = {
    name: 'Frederico',
    email: 'fredx@sisloc.com.br'
}

function tokenValidated (
    request,
    response,
    next
) {
    const [, token] = request.headers.authorization?.split(' ') || [' ', ' '];

    if(!token) return response.status(401).send('Access denied. No token provided.');

    try{
        const payload = jsonwebtoken.verify(token, PRIVATE_KEY);
        const userIdFromToken = typeof payload !== 'string' && payload.user;

        if(!user && !userIdFromToken) {
            return response.send(401).json({message: 'Invalid token'});
        }

        request.headers['user'] = payload.user;

        return next();
    }
    catch(error){
        console.log(error);
        return response.status(401).json({message: 'invalid token.'});
    }
}

module.exports = { PRIVATE_KEY, user, tokenValidated }