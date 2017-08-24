import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import passport from 'passport';
import { logger } from './lib/util';
import api from './api';
import config from './config';
import initializeDb from './db';
import passportMiddleware from './middleware/passport';

const app = express();

app.server = http.createServer(app);

app.use(morgan('dev'));
app.use(cors({ exposedHeaders: config.corsHeaders }));
app.use(bodyParser.json({ limit : config.bodyLimit }));

initializeDb(() => {
	app.use(passport.initialize());
	
	passportMiddleware(passport);

	app.use('/api', api);
	app.server.listen(process.env.PORT || config.port, () => {
		logger.info(`Started on port ${app.server.address().port}`);
	});
});

export default app;
