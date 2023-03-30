import passport from 'passport';
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import jwt from 'jsonwebtoken';
import Customer from '../controller/customerController.js';
import Customers from '../models/Customer.js';
import { SECRET } from './generateToken.js';

function verifyUser(user) {
  if (!user) {
    throw new Error('Username or password invalid.');
  }
}

async function verifyPassword(password, hashPassword) {
  const validPassword = await bcrypt.compare(password, hashPassword);

  if (!validPassword) {
    throw new Error('Username or password invalid.');
  }
}

passport.use(
  new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false,
  }, async (username, password, done) => {
    try {
      const user = await Customer.findByUsername(username);
      verifyUser(user);
      const hashPassword = user.password;
      await verifyPassword(password, hashPassword);

      done(null, user);
    } catch (erro) {
      done(erro);
    }
  }),
);

passport.use(
  new BearerStrategy(
    async (token, done) => {
      try {
        const payload = jwt.verify(token, SECRET);
        const user = await Customers.findById(payload.sub);

        if (!user) {
          return done(null, false, { message: 'User not found.' });
        }

        return done(null, user, { token });
      } catch (err) {
        return done(err);
      }
    },
  ),
);

export default passport;
