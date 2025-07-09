const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use environment variable for MongoDB URI or fallback to a placeholder
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/avyakta';
    
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Don't exit process in development, just log the error
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

module.exports = connectDB; 