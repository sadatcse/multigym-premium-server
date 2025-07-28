import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import routes from './routes/routes.js';

// Import routes using ES module syntax
import createImageUploadRoute from './config/uploadImage/imageupload.js';
import createSmsRoute from './config/Sms/smsRoute.js';

dotenv.config();

// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up the port
const port = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Initialize Express app
const app = express();

// Set up CORS
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://web-apps-iota.vercel.app',
    'https://multigympremium.com',
    'http://multigympremium.com',
    'https://gymwebsite-pearl.vercel.app',
    'https://www.multigympremium.com'
  ],
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api', routes);
app.use('/api/image', createImageUploadRoute('uploads/images'));
app.use('/api/profile', createImageUploadRoute('uploads/profile'));
app.use('/api/sms', createSmsRoute());

// Error handling middleware
app.use(errorHandler);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port} at ${new Date()}.`.green);
});
