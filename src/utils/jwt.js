import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { getSessionData, SessionKeyService } from '../services/authService.js';

const accessTokenExpiration = '90m'; // Access token expiration time
const refreshTokenExpiration = '14d'; // Refresh token expiration time

// Generate unique keys based on email and mobile
const generateKeys = (email, mobile) => {
  const userKey = email + mobile; // Concatenate email and mobile for uniqueness
  const privateKey = crypto.createHash('sha256').update(userKey + 'private').digest('hex');
  const publicKey = crypto.createHash('sha256').update(userKey + 'public').digest('hex');
  return { privateKey, publicKey };
};

// Generate an access token and refresh token
const generateJWT = async (user, email, mobile) => {
  const { privateKey, publicKey } = generateKeys(email, mobile);

  // Create access token
  const accessToken = jwt.sign(
    { id: user.id, hospital_code: user.hospital_code, code: user.code, role_code: user.role_code }, // Payload
    privateKey,  // Private key to sign the token
    { algorithm: 'HS256', expiresIn: accessTokenExpiration }
  );

  // Create refresh token
  const refreshToken = jwt.sign(
    { id: user.id, hospital_code: user.hospital_code, code: user.code, role_code: user.role_code },
    privateKey,
    { algorithm: 'HS256', expiresIn: refreshTokenExpiration }
  );

  // Store the session data
  const sessionData = await SessionKeyService(privateKey, publicKey);

  return { session_id: sessionData.session_id, refreshToken, accessToken };
};

// Verify the access token using session_id
const verifyAccessToken = async (session_id, token) => {
  try {
    const { public_key } = await getSessionData(session_id);
    const tokenExtracted = token.split(' ')[1]; // Extract token from "Bearer token"

    // Verify the token using public key
    return jwt.verify(tokenExtracted, public_key, { algorithms: ['HS256'] });
  } catch (error) {
    console.error("Error verifying access token:", error);
    return null; // Token is invalid or expired
  }
};

// Verify the refresh token
const verifyRefreshToken = (token, email, mobile) => {
  const { public_key } = generateKeys(email, mobile);

  try {
    return jwt.verify(token, public_key, { algorithms: ['HS256'] });
  } catch (error) {
    console.error("Error verifying refresh token:", error);
    return null; // Token is invalid or expired
  }
};

export {
  generateJWT,
  verifyAccessToken,
  verifyRefreshToken
};
