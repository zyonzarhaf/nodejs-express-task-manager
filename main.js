import 'dotenv/config';
import express from 'express';
import setMiddleware from './middleware/setMiddleware.js';
import router from './routes/index.js';
import apiRouter from './api/routes/index.js';
import connectDB from './db/connectDB.js';

import notFoundResponse from './middleware/custom/notFoundResponse.js';

import { 
  logger,
  responder,
  failSafeHandler
} from './controllers/errorsController.js';

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('uri', process.env.URI);
app.set('view engine', 'ejs');

setMiddleware(app);

app.use(router);
app.use(apiRouter);

app.use(notFoundResponse);
app.use(logger);
app.use(responder);
app.use(failSafeHandler);

app.listen(app.get('port'), async () => {
  try {
    await connectDB(app.get('uri'));
    console.log(`Server is listening on port ${app.get('port')}...`);
  } catch (err) {
    console.log(err);
  }
});
