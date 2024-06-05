const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config({ path: 'config.env' });
const dbConnection = require('./config/database');
const categoryRoute = require('./routes/categoryRoute');
const statusText = require('../utility/httpStatusText');

// Connect with db
dbConnection();

// App
const app = express();
app.use(express.json());

// Middlewares
if (process.env.MODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`Mode: ${process.env.MODE_ENV}`);
}

// Mount routes
app.use('/api/v1/categories', categoryRoute);

app.all('*', (req, res, next) => {
  res.status(400).json({
    status: httpStatusText.ERROR,
    message: `${req.originalUrl} is not available`,
    code: 400,
  });
});

app.use((error, req, res, next) => {
  res
    .status(400)
    .json({ status: statusText.ERROR, message: error.errmsg, data: null });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`);
});
