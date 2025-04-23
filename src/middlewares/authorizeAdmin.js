import jwt from 'jsonwebtoken';

const authorizeAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Assuming token is sent in the Authorization header (Bearer token)

  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token using your secret
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied, admin role required' }); // Check if the user is admin
    }

    req.user = decoded; // Add the decoded user info to the request object
    next(); // Proceed to the next middleware or route handlers
  } catch (err) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};

export default authorizeAdmin;
