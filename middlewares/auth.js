const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers.auth;
    
    if(!token) return res.send({error: 'Token não enviado'});

    jwt.verify(token, 'jwtNodeProjet2019', (err, decoded) => {
        
        if(err) return res.send({error: 'Token errado'});

        res.locals.local_auth = decoded;

        return next();

    });
}


module.exports = auth;