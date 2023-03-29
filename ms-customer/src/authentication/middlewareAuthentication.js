import passport from 'passport';

export const middlewareLocal = (req, res, next) => {
  passport.authenticate(
    'local',
    { session: false },
    (err, user) => {
      if (err) {
        return res.status(401).json({ error: err.message });
      }
      if (!user) {
        return res.status(400).json();
      }

      req.user = user;
      return next();
    },
  )(req, res, next);
};

export const middlewareBearer = (req, res, next) => {
  passport.authenticate(
    'bearer',
    { session: false },
    async (err, user, info) => {
      if (err && err.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: err.message });
      }
      if (err && err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: err.message, expiradoEm: err.expiredAt });
      }
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      if (!user) {
        return res.status(401).json({ error: 'Invalid request.' });
      }

      req.token = info.token;
      req.user = user;
      return next();
    },
  )(req, res, next);
};
