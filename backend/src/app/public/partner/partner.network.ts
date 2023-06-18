import express from 'express';
import { error, success } from '../../../network/response';
import { uploadCSV } from '../../../utils/fileStorage';
import { MessageAPI } from '../../../utils/message/message.type';
import { Partner } from './partner.class';
import { validation } from './partner.controller';
const routerPartner = express.Router();

routerPartner.post('/create', async (req: any, res: any) => {
	await validation(req.body, req.url)
		.then((partner: Partner) => {
			success(res, partner);
		})
		.catch((err: MessageAPI | any) => {
			error(res, err);
		});
});

routerPartner.get('/queryRead/:dni_partner', async (req: any, res: any) => {
	await validation(req.params, req.url)
		.then((partners: Partner[]) => {
			res.status(200).send(partners);
		})
		.catch((err: MessageAPI | any) => {
			error(res, err);
		});
});

routerPartner.get('/specificRead/:id_partner', async (req: any, res: any) => {
	await validation(req.params, req.url)
		.then((partner: Partner) => {
			res.status(200).send(partner);
		})
		.catch((err: MessageAPI | any) => {
			error(res, err);
		});
});

routerPartner.patch('/update', async (req: any, res: any) => {
	await validation(req.body, req.url)
		.then((partner: Partner) => {
			success(res, partner);
		})
		.catch((err: MessageAPI | any) => {
			error(res, err);
		});
});

routerPartner.delete('/delete', async (req: any, res: any) => {
	await validation(req.query, req.url)
		.then((response: boolean) => {
			success(res, response);
		})
		.catch((err: MessageAPI | any) => {
			error(res, err);
		});
});

routerPartner.post(
	'/batchUpdate',
	uploadCSV.single(`csv`),
	async (req: any, res: any) => {
		await validation(req.body, req.url)
			.then((partner: Partner) => {
				success(res, partner);
			})
			.catch((err: MessageAPI | any) => {
				error(res, err);
			});
	}
);

export { routerPartner };
