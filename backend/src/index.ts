import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import http from 'http';
import https from 'https';
import path from 'path';
import { appRoutes } from './network/routes';
const app = express();

dotenv.config({
	path: path.join(path.resolve('./env'), process.env.NODE_ENV + '.env'),
});
/**
 * Verifica el ambiente
 * Si es produccion cargamos as credenciales para levantar el servicio con HTTPS
 */
if (process.env.NODE_ENV == 'production') {
	/**
	 * Set the credentials
	 */
	const credentials = {
		cert: fs.readFileSync(path.resolve('./public.crt')),
		key: fs.readFileSync(path.resolve('./private.key')),
	};

	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use('/', express.static('./public'));

	appRoutes(app);

	const httpsServer = https.createServer(credentials, app);
	httpsServer.listen(process.env.PORT);
	console.log(
		`La aplicación esta escuchando en https://localhost:${process.env.PORT}`
	);
} else {
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use('/', express.static('./public'));

	appRoutes(app);

	const httpServer = http.createServer(app);
	httpServer.listen(process.env.PORT);
	console.log(
		`La aplicación esta escuchando en http://localhost:${process.env.PORT}`
	);
}
