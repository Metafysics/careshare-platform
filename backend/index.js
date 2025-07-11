import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/users.js';
import bookingRoutes from './routes/bookings.js';
import availabilityRoutes from './routes/availabilities.js';
import paymentRoutes from './routes/payments.js';
import supportRoutes from './routes/support.js';
import cmsRoutes from './routes/cms.js';
import notificationRoutes from './routes/notifications.js';
import payoutRoutes from './routes/payouts.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/availabilities', availabilityRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/cms', cmsRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/payouts', payoutRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
