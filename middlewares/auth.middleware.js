import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../config/env.js'
import User from '../models/user.model.js'

const authorize = async (req, res, next) => {
  try {
    let token;

    // get token form the request header
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // check if the token exits
    if(!token) return res.status(401).json({ message: 'Unauthorized' });

    // verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // get user from db by id
    const user = await User.findById(decoded.userId);

    // check if user exits if not send unathorized
    if(!user) return res.status(401).json({ message: 'Unauthorized' });

    // add user to reqest
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
}

export default authorize;