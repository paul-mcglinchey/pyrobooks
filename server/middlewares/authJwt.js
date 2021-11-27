const jwt = require('jsonwebtoken');

const publicKey = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAtwia657YMu2B65yBueF0
E63BP5NQCAJOGFhl5Aa/RvN836hPG0ulbkNGwU6I0t450/DbJInyPdCk4A3jVkDj
buixS6oattrcM+1hTb6hfNFrWmalcWvpRIG3yK0ytNFDTtGOO9Ly2J+cdQ9hbitH
9WYbgKS1BzcFRXU4xWhDtgBnFnShebjpSh1GJd1jcOW134RaodV9OuIqqDIYn84o
7Hvun67BXvMM2fZjkrdVDhAGWQ2FMZK5VYwKG7RN769f5mM3B6IHAPw4046tfIrj
yI58a7fPVAzwXnfnpPJFnnGB4eS0wOpTBoOeN5eSO3/ZWVFnhQO9e+nzbiQS3r0N
KhDCf+lFbI7zHHobMA5//vQWDn8LjbFrmoHh8BcZIcAllqN+8t79HkQZ7uldVwzd
Ae9pMHL1apehhfLL4E8y1vTqqQxxnJzvKYCEyxMNyCW+y1zdJ4OSRXG1FAVWcFwi
pTGird3GEFtRmsw9FsAAv0A6o2C7Mv6VD37VaLW/NFFGONShFBfRZKXFWsba3br2
QZKVKAYB1iCJh2Ng4H3zYOZ0p+B8UYWekuu4lwjJPYZT1hiei1blxXyP5yccrO0F
9HxWhkBktIRnJ7u3P88jwFe8MsKKlddCzRyA46+f3QyU2yaY8rnbcFA95A3jRP3+
0Yl1MwaxRqbweFSRi9Gl3R8CAwEAAQ==
-----END PUBLIC KEY-----`;

verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, publicKey, (err, auth) => {
    if (err) return res.sendStatus(403);
    req.auth = auth;

    next();
  });
};

const authJwt = {
  verifyToken
};

module.exports = authJwt;