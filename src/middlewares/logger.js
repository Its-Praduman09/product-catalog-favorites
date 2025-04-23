import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import { fileURLToPath } from 'url';

// Define the directory and file paths
const __filename = fileURLToPath(import.meta.url); // Corrected this line for module compatibility
const logDir = path.join(path.dirname(__filename), '../../logs'); // Corrected path joining
const logFile = path.join(logDir, 'action.log');

// Ensure the logs directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Ensure the log file exists
if (!fs.existsSync(logFile)) {
  fs.writeFileSync(logFile, '');  // Create the file if it doesn't exist
}

// Create a write stream (in append mode)
const logStream = fs.createWriteStream(logFile, { flags: 'a' });

// Setup the logger using morgan
const logger = morgan('combined', { stream: logStream });

export default logger;
