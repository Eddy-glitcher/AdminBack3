const jwt = require('jsonwebtoken');

const jwtGenerator = (uid) => {

    return new Promise((resolve, reject)=>{

        const payload = {
            uid
        };

        jwt.sign(payload, process.env.JWT_KEY, {expiresIn : '12d'}, function(err, token){
            if (err) {
                reject('Error al generar el token!');
            };

            resolve(token);
        });
    });
};

module.exports = {
    jwtGenerator
};