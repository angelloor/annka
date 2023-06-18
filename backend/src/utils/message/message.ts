import { Messages } from './message.type';

export const _successMessages: Messages = {
	1: {
		id: true,
		code: '01-001',
		status: 200,
		component: 'success',
		description: 'Transaction Ok!',
	},
};

export const _errorMessages: Messages = {
	1: {
		id: false,
		code: '002-001',
		status: 500,
		component: 'unknown',
		description: 'Excepción desconocida: ExCePcIoN',
	},
	2: {
		id: false,
		code: '002-002',
		status: 400,
		component: 'database',
		description: 'Database MessageAPI',
	},
};

export const _validationMessages: Messages = {
	1: {
		id: false,
		code: '03-001',
		status: 400,
		component: 'validations',
		description: 'No se ha recibido el _nameAttribute',
	},
	2: {
		id: false,
		code: '03-002',
		status: 400,
		component: 'validations',
		description:
			'El tipo de dato de _nameAttribute es incorrecto, se esperaba _expectedType',
	},
	3: {
		id: false,
		code: '03-003',
		status: 400,
		component: 'validations',
		description:
			'La longitud de _nameAttribute no puede ser mayor a _expectedCharacters caracteres',
	},
	4: {
		id: false,
		code: '03-004',
		status: 400,
		component: 'validations',
		description:
			'El dni _dni_partner no paso la validación de la Cedula o Ruc, por favor verifique los datos ingresados',
	},
	5: {
		id: false,
		code: '03-005',
		status: 400,
		component: 'validations',
		description:
			'La fecha de nacimiento no cumple con el formato establecido dd-mm-yyyy',
	},
	6: {
		id: false,
		code: '03-006',
		status: 400,
		component: 'validations',
		description: 'EL correo ingresado no valido',
	},
};
