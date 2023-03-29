import passport from 'passport';

const middlewareLocal = (req, res, next) => {
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

export default middlewareLocal;
