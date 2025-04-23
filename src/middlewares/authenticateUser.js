// authenticateUser.js

import jwt from 'jsonwebtoken';

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token

    // Attach the user data to the request object
    req.user = {
      userId: decoded.id,  // Ensure that the `id` from the token is used as `userId`
      role: decoded.role
    };

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};

// Correct export statement
export { authenticateUser };
