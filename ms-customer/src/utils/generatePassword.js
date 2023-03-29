/* eslint-disable no-console */
import bcryptjs from 'bcryptjs';

const passwords = ['123456', '987654', 'abcd123', 'A@bcp123', 'Sucodeuvaintegralsabormorango123@'];

const saltRounds = 12;

for (let i = 0; i < passwords.length; i + 1) {
  const password = passwords[i];

  bcryptjs.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Hash for ${password}: ${hash}`);
    }
  });
}
