/* eslint-disable import/no-extraneous-dependencies */
import passport from 'passport';
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import Customer from '../controller/customerController.js';

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

export default passport;
