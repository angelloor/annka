import fs from 'fs';
import { generateRandomNumber } from '../../../utils/global';
import { generateMail, sendMail } from '../../../utils/mail/mail';
import { WelcomeMessage } from '../../../utils/mail/mail.declarate';
import { _validationMessages } from '../../../utils/message/message';
import { MessageAPI } from '../../../utils/message/message.type';
import { validation } from './partner.controller';
import {
	dml_partner_create,
	dml_partner_delete,
	dml_partner_update,
	view_partner_query_read,
	view_partner_specific_read,
} from './partner.store';
// import * as csv from "csvtojson";
const csv = require('csvtojson');

export class Partner {
	/** Attributes */
	public id_user_?: number;
	public id_partner: number;
	public type_document_partner?: TYPE_DOCUMENT;
	public dni_partner?: string;
	public name_partner?: string;
	public last_name_partner?: string;
	public birthdate_partner?: string;
	public city_partner?: string;
	public province_partner?: string;
	public email_partner?: string;
	public phone_partner?: string;
	public deleted_partner?: boolean;
	/** Constructor */
	constructor(
		id_user_: number = 0,
		id_partner: number = 0,
		type_document_partner: TYPE_DOCUMENT = 'cedula',
		dni_partner: string = '',
		name_partner: string = '',
		last_name_partner: string = '',
		birthdate_partner: string = '',
		city_partner: string = '',
		province_partner: string = '',
		email_partner: string = '',
		phone_partner: string = '',
		deleted_partner: boolean = false
	) {
		this.id_user_ = id_user_;
		this.id_partner = id_partner;
		this.type_document_partner = type_document_partner;
		this.dni_partner = dni_partner;
		this.name_partner = name_partner;
		this.last_name_partner = last_name_partner;
		this.birthdate_partner = birthdate_partner;
		this.city_partner = city_partner;
		this.province_partner = province_partner;
		this.email_partner = email_partner;
		this.phone_partner = phone_partner;
		this.deleted_partner = deleted_partner;
	}
	/** Setters and Getters */
	set _id_user_(id_user_: number) {
		this.id_user_ = id_user_;
	}
	get _id_user_() {
		return this.id_user_!;
	}

	set _id_partner(id_partner: number) {
		this.id_partner = id_partner;
	}
	get _id_partner() {
		return this.id_partner;
	}

	set _type_document_partner(type_document_partner: TYPE_DOCUMENT) {
		this.type_document_partner = type_document_partner;
	}
	get _type_document_partner() {
		return this.type_document_partner!;
	}

	set _dni_partner(dni_partner: string) {
		this.dni_partner = dni_partner;
	}
	get _dni_partner() {
		return this.dni_partner!;
	}

	set _name_partner(name_partner: string) {
		this.name_partner = name_partner;
	}
	get _name_partner() {
		return this.name_partner!;
	}

	set _last_name_partner(last_name_partner: string) {
		this.last_name_partner = last_name_partner;
	}
	get _last_name_partner() {
		return this.last_name_partner!;
	}

	set _birthdate_partner(birthdate_partner: string) {
		this.birthdate_partner = birthdate_partner;
	}
	get _birthdate_partner() {
		return this.birthdate_partner!;
	}

	set _city_partner(city_partner: string) {
		this.city_partner = city_partner;
	}
	get _city_partner() {
		return this.city_partner!;
	}

	set _province_partner(province_partner: string) {
		this.province_partner = province_partner;
	}
	get _province_partner() {
		return this.province_partner!;
	}

	set _email_partner(email_partner: string) {
		this.email_partner = email_partner;
	}
	get _email_partner() {
		return this.email_partner!;
	}

	set _phone_partner(phone_partner: string) {
		this.phone_partner = phone_partner;
	}
	get _phone_partner() {
		return this.phone_partner!;
	}

	set _deleted_partner(deleted_partner: boolean) {
		this.deleted_partner = deleted_partner;
	}
	get _deleted_partner() {
		return this.deleted_partner!;
	}

	/** Methods */
	create(_partner: Partner) {
		return new Promise<Partner>(async (resolve, reject) => {
			await dml_partner_create(_partner)
				.then(async (partner: Partner) => {
					/**
					 * Dar la bienvenida a ANNKA
					 */
					if (partner) {
						const generatedMail = generateMail(
							`"ANNKA" <${process.env.MAILER_USER}>`,
							partner.email_partner!,
							'Mensaje de bienvenida',
							WelcomeMessage(partner)
						);

						await sendMail(generatedMail)
							.then((response) => {
								console.log(response);
							})
							.catch((error) => {
								reject(error);
							});

						resolve(partner);
					}
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	queryRead(_partner: Partner) {
		return new Promise<Partner[]>(async (resolve, reject) => {
			await view_partner_query_read(_partner)
				.then((partners: Partner[]) => {
					resolve(partners);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	specificRead(_partner: Partner) {
		return new Promise<Partner>(async (resolve, reject) => {
			await view_partner_specific_read(_partner)
				.then((partner: Partner) => {
					resolve(partner);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	update(_partner: Partner) {
		return new Promise<Partner>(async (resolve, reject) => {
			await dml_partner_update(_partner)
				.then((partner: Partner) => {
					resolve(partner);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	delete(_partner: Partner) {
		return new Promise<boolean>(async (resolve, reject) => {
			await dml_partner_delete(_partner)
				.then((response: boolean) => {
					resolve(response);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	batchUpdate() {
		return new Promise<boolean | any>(async (resolve, reject) => {
			/**
			 * Reubicar el csv subido
			 */
			const initialPath = `./csv.csv`;
			const ramdomNumber: number = generateRandomNumber(6);
			const newCSVPath = `csv-partner-${ramdomNumber}.csv`;
			const pathCSV = `./file_store/csv_partner/${newCSVPath}`;

			if (fs.existsSync(initialPath)) {
				const pathBaseFileStore = `./file_store`;
				if (!fs.existsSync(pathBaseFileStore)) {
					fs.mkdir(pathBaseFileStore, (error) => {
						if (error) {
							reject(`Ocurrió un error al crear la file_store`);
						}
					});
				}

				const pathBaseCSVPartner = `./file_store/csv_partner`;
				if (!fs.existsSync(pathBaseCSVPartner)) {
					fs.mkdir(pathBaseCSVPartner, (error) => {
						if (error) {
							reject(`Ocurrió un error al crear la carpeta resource`);
						}
					});
				}

				fs.rename(`./csv.csv`, `${pathBaseCSVPartner}/${newCSVPath}`, (err) => {
					if (err) {
						reject(err);
					}
				});
			} else {
				reject(false);
			}
			/**
			 * Transformamos el csv a json
			 */
			const partnersArray: Partner[] | any = await csv().fromFile(pathCSV);

			let messages: any[] = [];

			for (const partner of partnersArray) {
				this.queryRead(partner)
					.then(async (_partners: Partner[]) => {
						if (_partners.length > 0) {
							/**
							 * Existe - Lo actualizamos
							 */
							/**
							 * Obtenemos el id del partner
							 */
							const id_partner: string | any = _partners[0].id_partner;
							/**
							 * Mutamos el objeto para que tenga el id
							 */
							let _partner: any = {
								id_partner: parseInt(id_partner),
								...partner,
							};
							/**
							 * Validamos el objeto y si todo esta Ok lo actualizamos
							 */
							await validation(_partner, '/update')
								.then((partner: Partner) => {
									messages.push(partner);
									/**
									 * Si el array de mensajes es igual al array de partners, resolvemos
									 */
									if (partnersArray.length === messages.length) {
										resolve(messages);
									}
								})
								.catch((err: MessageAPI | any) => {
									messages.push(err);
									/**
									 * Si el array de mensajes es igual al array de partners, resolvemos
									 */
									if (partnersArray.length === messages.length) {
										resolve(messages);
									}
								});
						} else {
							/**
							 * No existe - Lo creamos
							 */
							/**
							 * Validamos el objeto y si todo esta Ok lo actualizamos
							 */
							await validation(partner, '/create')
								.then((partner: Partner) => {
									messages.push(partner);
									/**
									 * Si el array de mensajes es igual al array de partners, resolvemos
									 */
									if (partnersArray.length === messages.length) {
										resolve(messages);
									}
								})
								.catch((err: MessageAPI | any) => {
									messages.push(err);
									/**
									 * Si el array de mensajes es igual al array de partners, resolvemos
									 */
									if (partnersArray.length === messages.length) {
										resolve(messages);
									}
								});
						}
					})
					.catch((error: any) => {
						reject(error);
					});
			}
		});
	}
}

/**
 * Type TYPE_DOCUMENT
 */
export type TYPE_DOCUMENT = 'cedula' | 'ruc' | 'passport';

export interface TYPE_DOCUMENT_ENUM {
	name_type: string;
	value_type: TYPE_DOCUMENT;
}

export const _typeDocumentPartner: TYPE_DOCUMENT_ENUM[] = [
	{
		name_type: 'Cedula',
		value_type: 'cedula',
	},
	{
		name_type: 'Ruc',
		value_type: 'ruc',
	},
	{
		name_type: 'Pasaporte',
		value_type: 'passport',
	},
];

export const validationTypeDocumentPartner = (
	attribute: string,
	value: string | TYPE_DOCUMENT
) => {
	return new Promise<Boolean>((resolve, reject) => {
		const typeDocumentPartner = _typeDocumentPartner.find(
			(typeDocumentPartner: TYPE_DOCUMENT_ENUM) =>
				typeDocumentPartner.value_type == value
		);

		if (!typeDocumentPartner) {
			reject({
				..._validationMessages[2],
				description: _validationMessages[2].description
					.replace('_nameAttribute', `${attribute}`)
					.replace('_expectedType', 'TYPE_DOCUMENT'),
			});
		}
	});
};
