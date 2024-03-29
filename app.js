const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { PORT, DB_CONNECT_PATH } = require('./config');
const errorHandler = require('./midldlewares/error-handler');
const { requestLogger, errorLogger } = require('./midldlewares/logger');
const { limiter } = require('./midldlewares/rateLimiter');

mongoose
  .connect(DB_CONNECT_PATH)
  .then(() => {
    console.log('Database connected.');
  })
  .catch((err) => {
    console.log('Error on database connection');
    console.error(err);
  });

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('*', cors());

app.use(requestLogger);

app.use(limiter);
app.use(routes);
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
