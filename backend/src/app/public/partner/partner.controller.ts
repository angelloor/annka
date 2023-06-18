import { _validationMessages } from '../../../utils/message/message';
import { attributeValidate, validarCedulaRUC } from '../../../utils/validation';
import { Partner, validationTypeDocumentPartner } from './partner.class';

export const validation = (partner: Partner, url: string) => {
	return new Promise<Partner | Partner[] | boolean | any>(
		async (resolve, reject) => {
			/**
			 * Dejamos un estado inicial para ver si las validaciones pasan o no
			 */
			let validationStatus: boolean = false;
			/**
			 * Capa de validaciones
			 */
			if (url == '/update') {
				attributeValidate('id_partner', partner.id_partner, 'number', 10).catch(
					(err) => {
						validationStatus = true;
						reject(err);
					}
				);
			}

			if (url == '/create' || url == '/update') {
				validationTypeDocumentPartner(
					'type_document_partner',
					partner.type_document_partner!
				).catch((err) => {
					validationStatus = true;
					reject(err);
				});
			}

			if (url == '/create' || url == '/update') {
				attributeValidate(
					'dni_partner',
					partner.dni_partner,
					'string',
					partner.type_document_partner === 'cedula'
						? 10
						: partner.type_document_partner === 'ruc'
						? 13
						: 20
				).catch((err) => {
					validationStatus = true;
					reject(err);
				});
				/**
				 * Validacion de Cedula y ruc correcto
				 */
				if (
					partner.type_document_partner &&
					partner.type_document_partner != 'passport'
				) {
					if (!validarCedulaRUC(partner.dni_partner!)) {
						validationStatus = true;
						reject({
							..._validationMessages[4],
							description: _validationMessages[4].description.replace(
								'_dni_partner',
								`${partner.dni_partner}`
							),
						});
					}
				}
			}

			if (url == '/create' || url == '/update') {
				attributeValidate(
					'name_partner',
					partner.name_partner,
					'string',
					50
				).catch((err) => {
					validationStatus = true;
					reject(err);
				});
			}

			if (url == '/create' || url == '/update') {
				attributeValidate(
					'last_name_partner',
					partner.last_name_partner,
					'string',
					50
				).catch((err) => {
					validationStatus = true;
					reject(err);
				});
			}

			if (url == '/create' || url == '/update') {
				attributeValidate(
					'birthdate_partner',
					partner.birthdate_partner,
					'string',
					10
				).catch((err) => {
					validationStatus = true;
					reject(err);
				});
				/**
				 * Validacion de fecha de nacimiento correcta
				 */
				const patternBirthdate =
					/^(0[1-9]|1[0-9]|2[0-9]|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/;

				if (!patternBirthdate.test(partner.birthdate_partner!)) {
					validationStatus = true;
					reject(_validationMessages[5]);
				}
			}

			if (url == '/create' || url == '/update') {
				attributeValidate(
					'city_partner',
					partner.city_partner,
					'string',
					50
				).catch((err) => {
					validationStatus = true;
					reject(err);
				});
			}

			if (url == '/create' || url == '/update') {
				attributeValidate(
					'province_partner',
					partner.province_partner,
					'string',
					50
				).catch((err) => {
					validationStatus = true;
					reject(err);
				});
			}

			if (url == '/create' || url == '/update') {
				attributeValidate(
					'email_partner',
					partner.email_partner,
					'string',
					256
				).catch((err) => {
					validationStatus = true;
					reject(err);
				});

				/**
				 * Validacion de email correcto
				 */
				const patternEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

				if (!patternEmail.test(partner.email_partner!)) {
					validationStatus = true;
					reject(_validationMessages[6]);
				}
			}

			if (url == '/create' || url == '/update') {
				attributeValidate(
					'phone_partner',
					partner.phone_partner,
					'string',
					15
				).catch((err) => {
					validationStatus = true;
					reject(err);
				});
			}

			/**
			 * Continuar solo si no ocurrio errores en la validación
			 */
			if (!validationStatus) {
				/**
				 * Instance the class
				 */
				const _partner = new Partner();
				/**
				 * Execute the url depending on the path
				 */
				if (url == '/create') {
					/** set required attributes for action */
					_partner.type_document_partner = partner.type_document_partner;
					_partner.dni_partner = partner.dni_partner;
					_partner.name_partner = partner.name_partner;
					_partner.last_name_partner = partner.last_name_partner;
					_partner.birthdate_partner = partner.birthdate_partner;
					_partner.city_partner = partner.city_partner;
					_partner.province_partner = partner.province_partner;
					_partner.email_partner = partner.email_partner;
					_partner.phone_partner = partner.phone_partner;
					await _partner
						.create(_partner)
						.then((partner: Partner) => {
							resolve(partner);
						})
						.catch((error: any) => {
							reject(error);
						});
				} else if (url.substring(0, 10) == '/queryRead') {
					/** set required attributes for action */
					_partner.dni_partner = partner.dni_partner;
					await _partner
						.queryRead(_partner)
						.then((_partners: Partner[]) => {
							resolve(_partners);
						})
						.catch((error: any) => {
							reject(error);
						});
				} else if (url.substring(0, 13) == '/specificRead') {
					const id_partner: any = partner.id_partner;

					if (id_partner >= 1) {
						/** set required attributes for action */
						_partner.id_partner = partner.id_partner;
						await _partner
							.specificRead(_partner)
							.then((_partner: Partner) => {
								resolve(_partner);
							})
							.catch((error: any) => {
								reject(error);
							});
					} else {
						reject({
							..._validationMessages[11],
							description: _validationMessages[11].description.replace(
								'name_entity',
								'partner'
							),
						});
					}
				} else if (url == '/update') {
					/** set required attributes for action */
					_partner.id_partner = partner.id_partner;
					_partner.type_document_partner = partner.type_document_partner;
					_partner.dni_partner = partner.dni_partner;
					_partner.name_partner = partner.name_partner;
					_partner.last_name_partner = partner.last_name_partner;
					_partner.birthdate_partner = partner.birthdate_partner;
					_partner.city_partner = partner.city_partner;
					_partner.province_partner = partner.province_partner;
					_partner.email_partner = partner.email_partner;
					_partner.phone_partner = partner.phone_partner;
					await _partner
						.update(_partner)
						.then((partner: Partner) => {
							resolve(partner);
						})
						.catch((error: any) => {
							reject(error);
						});
				} else if (url.substring(0, 7) == '/delete') {
					/** set required attributes for action */
					_partner.id_partner = partner.id_partner;
					await _partner
						.delete(_partner)
						.then((response: boolean) => {
							resolve(response);
						})
						.catch((error: any) => {
							reject(error);
						});
				} else if (url == '/batchUpdate') {
					await _partner
						.batchUpdate()
						.then((response: boolean) => {
							resolve(response);
						})
						.catch((error: any) => {
							reject(error);
						});
				}
			}
		}
	);
};
