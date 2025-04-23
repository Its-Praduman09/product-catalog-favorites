


import express from 'express';
import { registerUser, loginUser, refreshAccessToken, logoutUser, getRegisters } from '../controllers/authController.js';
import authorizeAdmin from '../middlewares/authorizeAdmin.js';

const router = express.Router();

router.post('/register', authorizeAdmin, registerUser);
router.get('/registers', authorizeAdmin, getRegisters); // <-- add this line
router.post('/login', loginUser);  // Ensure this is correct
router.post('/refresh-token', authorizeAdmin, refreshAccessToken);
router.post('/logout', authorizeAdmin, logoutUser);     // POST /api/logout


export default router;
