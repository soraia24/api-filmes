import jwt from 'jsonwebtoken';

export function autenticarTokenOptional(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    req.usuario = null; // sem token
    return next();
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, 'Segurança', (err, user) => {
    if (err) req.usuario = null;
    else req.usuario = user;
    next();
  });
}
