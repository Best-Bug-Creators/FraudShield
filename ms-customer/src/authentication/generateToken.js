/* eslint-disable no-underscore-dangle */
import jwt from 'jsonwebtoken';

export const SECRET = process.env.JWT_KEY || 'OtvveuTs8HEvSQHzXQtVFxIgOExVr7uOiCHlGBf/3v/i9g9zKGhM9+YGTDDGi6Gbhjx6GXXI6brrGV4w3Nh4I9UUotrgqmNL4WQnpgtCRQ2+fOiI3g4ghZ9gyYA+vmoQuZ6C0Y/TlYktPBNnn7BHEZsLhsyvd6Ij0NMQFP/ZC3uqTgMvHUD/rrqzwi6rIkaxGLWqHyO/8VOKSQJJoK+Dw99MYJOeFwswFY5J/X8+p7a/UNG/UZm+bGygQO5zHIur9tvnzP/bttCsnOiKIbmNxyjoV31+x/dNmTBOtoo1r5dbLS55sD43qyWpl1TGKprXmxPe80HOz1djc6Gx7U0BjA==';

function createTokenJWT(user) {
  const payload = {
    id: user._id,
    sub: user.customerId,
  };

  const token = jwt.sign(payload, SECRET, { expiresIn: '15m' });
  return token;
}

export default createTokenJWT;
