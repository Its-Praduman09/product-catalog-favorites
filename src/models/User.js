import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
  { timestamps: true }
);

// Pre-save hook to hash the password before saving to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();  // Skip if the password has not been modified
  }
  try {
    const salt = await bcrypt.genSalt(10);  // Create a salt with 10 rounds
    this.password = await bcrypt.hash(this.password, salt);  // Hash the password
    next();  // Proceed with saving the user
  } catch (err) {
    next(err);  // Pass error to next middleware if any
  }
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);  // Compare entered password with hashed password
};

// Create the User model
const User = mongoose.model('User', userSchema);
export default User;
