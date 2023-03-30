import passport from 'passport';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import jwt from 'jsonwebtoken';
import { SECRET } from './generateToken.js';

passport.use(
  new BearerStrategy(
    async (token, done) => {
      try {
        jwt.verify(token, SECRET);
        return done(null, null, { token });
      } catch (err) {
        return done(err);
      }
    },
  ),
);

export default passport;
