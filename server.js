const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({ path: 'config.env' });
const dbConnection = require('./config/database');
const categoryRoute = require('./routes/categoryRoute');
const subCategoryRoute = require('./routes/subCategoryRoute');
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');

// Connect with db
dbConnection();

// App
const app = express();
app.use(express.json());

// Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`Mode: ${process.env.NODE_ENV}`);
}

// Mount routes
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/subcategories', subCategoryRoute);

app.all('*', (req, res, next) => {
  next(new ApiError(`${req.originalUrl} is not available`, 400));
});

// Global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`);
});

// Handle rejections outside express
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error('Shutting down...');
    process.exit(1);
  });
});
