import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Token from '../models/Token.js';



const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ name, email, password, role });
    await user.save();

    console.log('Hashed Password:', user.password);  // Log the hashed password

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getRegisters = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // exclude passwords
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate access and refresh tokens
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    // Log token details for debugging
    console.log('Access Token:', token);
    console.log('Refresh Token:', refreshToken);

    // Store the refresh token in the database
    const savedToken = await Token.create({
      userId: user._id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    });

    console.log('Token Saved:', savedToken);

    // Send the response with token, refresh token, and user details
    res.json({
      token,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Error logging in:", err.message);
    res.status(500).json({ message: err.message });
  }
};






// Refresh token
const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    // 1. Check if token exists in DB
    const storedToken = await Token.findOne({ token: refreshToken });
    if (!storedToken) {
      return res.status(400).json({ message: 'Invalid refresh token' });
    }

    // 2. Check if refresh token has expired (optional step to improve security)
    if (new Date() > new Date(storedToken.expiresAt)) {
      return res.status(400).json({ message: 'Refresh token expired' });
    }

    // 3. Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // 4. Create new access token
    const newToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token: newToken });
  } catch (err) {
    console.error('Refresh error:', err.message);
    res.status(400).json({ message: 'Invalid refresh token' });
  }
};



// Logout user
const logoutUser = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    // Remove refresh token from the database
    await Token.findOneAndDelete({ token: refreshToken });

    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error logging out' });
  }
};

export { registerUser, loginUser, refreshAccessToken, logoutUser, getRegisters };
