import { clientANNKAPostgreSQL } from '../../../utils/conections';
import { _errorMessages } from '../../../utils/message/message';
import { Partner } from './partner.class';

export const dml_partner_create = (partner: Partner) => {
	return new Promise<Partner>(async (resolve, reject) => {
		const query = `select * from public.dml_partner_create_modified('${partner.type_document_partner}',
			'${partner.dni_partner}',
			'${partner.name_partner}',
			'${partner.last_name_partner}',
			'${partner.birthdate_partner}',
			'${partner.city_partner}',
			'${partner.province_partner}',
			'${partner.email_partner}',
			'${partner.phone_partner}')`;

		// console.log(query);

		try {
			const response = await clientANNKAPostgreSQL.query(query);
			resolve(response.rows[0]);
		} catch (error: any) {
			if (error.detail == '_database') {
				reject({
					..._errorMessages[2],
					description: error.toString().slice(7),
				});
			} else {
				reject(error.toString());
			}
		}
	});
};

export const view_partner_query_read = (partner: Partner) => {
	return new Promise<Partner[]>(async (resolve, reject) => {
		const query = `select * from public.view_partner vp${
			partner.dni_partner != '*'
				? ` where lower(vp.dni_partner) LIKE '%${partner.dni_partner}%'`
				: ``
		} order by vp.id_partner desc`;

		// console.log(query);

		try {
			const response = await clientANNKAPostgreSQL.query(query);
			resolve(response.rows);
		} catch (error: any) {
			if (error.detail == '_database') {
				reject({
					..._errorMessages[2],
					description: error.toString().slice(7),
				});
			} else {
				reject(error.toString());
			}
		}
	});
};

export const view_partner_specific_read = (partner: Partner) => {
	return new Promise<Partner>(async (resolve, reject) => {
		const query = `select * from public.view_partner vp where vp.id_partner = ${partner.id_partner}`;

		// console.log(query);

		try {
			const response = await clientANNKAPostgreSQL.query(query);
			resolve(response.rows[0]);
		} catch (error: any) {
			if (error.detail == '_database') {
				reject({
					..._errorMessages[2],
					description: error.toString().slice(7),
				});
			} else {
				reject(error.toString());
			}
		}
	});
};

export const dml_partner_update = (partner: Partner) => {
	return new Promise<Partner>(async (resolve, reject) => {
		const query = `select * from public.dml_partner_update_modified(${partner.id_partner},
			'${partner.type_document_partner}',
			'${partner.dni_partner}',
			'${partner.name_partner}',
			'${partner.last_name_partner}',
			'${partner.birthdate_partner}',
			'${partner.city_partner}',
			'${partner.province_partner}',
			'${partner.email_partner}',
			'${partner.phone_partner}') as result`;

		// console.log(query);

		try {
			const response = await clientANNKAPostgreSQL.query(query);
			resolve(response.rows[0]);
		} catch (error: any) {
			if (error.detail == '_database') {
				reject({
					..._errorMessages[2],
					description: error.toString().slice(7),
				});
			} else {
				reject(error.toString());
			}
		}
	});
};

export const dml_partner_delete = (partner: Partner) => {
	return new Promise<boolean>(async (resolve, reject) => {
		const query = `select * from public.dml_partner_delete(${partner.id_partner}) as result`;

		// console.log(query);

		try {
			const response = await clientANNKAPostgreSQL.query(query);
			resolve(response.rows[0].result);
		} catch (error: any) {
			if (error.detail == '_database') {
				reject({
					..._errorMessages[2],
					description: error.toString().slice(7),
				});
			} else {
				reject(error.toString());
			}
		}
	});
};
