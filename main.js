import 'dotenv/config';
import express from 'express';
import setMiddleware from './middleware/setMiddleware.js';
import setRoutes from './routes/setRoutes.js';
import connectDB from './db/connectDB.js';
import notFound from './middleware/custom/notFound.js';

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
setRoutes(app);

app.use(notFound);
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
