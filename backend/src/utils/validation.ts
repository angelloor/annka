import { _validationMessages } from './message/message';
/**
 * Función para validar un campo de acuerdo a los criterios ingresados
 * @param attribute nombre del atributo a validar
 * @param value valor a validar
 * @param type tipo de dato correcto del atributo (string, number, boolean, object)
 * @param _length longitud correcta del atributo
 * @returns true || error
 */
export const attributeValidate = (
	attribute: string,
	value: any,
	type: string,
	_length: number = 0
) => {
	return new Promise<Boolean>((resolve, reject) => {
		if (value != undefined || value != null) {
			if (typeof value == `${type}`) {
				if (typeof value == 'string' || typeof value == 'number') {
					if (value.toString().length > _length) {
						reject({
							..._validationMessages[3],
							description: _validationMessages[3].description
								.replace('_nameAttribute', `${attribute}`)
								.replace('_expectedCharacters', `${_length}`),
						});
					} else {
						resolve(true);
					}
				} else {
					resolve(true);
				}
			} else {
				reject({
					..._validationMessages[2],
					description: _validationMessages[2].description
						.replace('_nameAttribute', `${attribute}`)
						.replace('_expectedType', `${type}`),
				});
			}
		} else {
			reject({
				..._validationMessages[1],
				description: _validationMessages[1].description.replace(
					'_nameAttribute',
					`${attribute}`
				),
			});
		}
	});
};

/**
 * Funciones para validar si una cédula o RUC son válidos.
 * @param numero
 * @returns boolean, true si es correcto, false si es incorrecto
 */
export function validarCedulaRUC(numero: string): boolean {
	if (numero.length === 10) {
		// Validar cédula de ciudadanía
		return validarCedula(numero);
	}

	if (numero.length === 13) {
		// Validar RUC
		return validarRUC(numero);
	}

	// Longitud inválida
	return false;
}
/**
 * Funcion para validar si una cedula es correcta
 * @param cedula
 * @returns boolean, true si es correcta la cedula, false si es incorrecta
 */
function validarCedula(cedula: string): boolean {
	// Verificar que la cédula tenga 10 dígitos
	if (cedula.length !== 10) {
		return false;
	}

	// Verificar que los dos primeros dígitos sean válidos
	const provincia = Number(cedula.substring(0, 2));
	if (provincia < 1 || provincia > 24) {
		return false;
	}

	// Verificar que el tercer dígito sea válido
	const tercerDigito = Number(cedula.charAt(2));
	if (tercerDigito > 5) {
		return false;
	}

	// Verificar el dígito verificador
	const digitoVerificador = Number(cedula.charAt(9));
	return validarDigitoVerificador(cedula.substring(0, 9), digitoVerificador);
}
/**
 * Funcion para validar si un RUC es correcto
 * @param ruc
 * @returns boolean, true si es correcto el RUC, false si es incorrecto
 */
function validarRUC(ruc: string): boolean {
	// Verificar longitud del RUC
	if (ruc.length !== 13) {
		return false;
	}

	// Verificar que los dos primeros dígitos sean válidos
	const codigoProvincia = Number(ruc.substring(0, 2));
	if (codigoProvincia < 1 || codigoProvincia > 22) {
		return false;
	}

	// Verificar que el tercer dígito sea válido
	const tercerDigito = Number(ruc.charAt(2));
	if (!(tercerDigito <= 6 || tercerDigito === 9)) {
		return false;
	}

	// Verificar los últimos dígitos según el tipo de RUC
	const ultimosDigitos = Number(ruc.substring(10));
	if (tercerDigito <= 6 && ultimosDigitos === 0) {
		return false; // RUC personas jurídicas no puede terminar en 000
	}
	if (tercerDigito === 9 && ultimosDigitos === 0) {
		return false; // RUC instituciones públicas no puede terminar en 0000
	}

	// Verificar el dígito verificador
	const digitoVerificador = Number(ruc.charAt(9));
	return validarDigitoVerificador(ruc.substring(0, 9), digitoVerificador);
}
/**
 * Funcion para validar el digito verificador de una cedula o RUC
 * @param numero
 * @param digitoVerificador
 * @returns boolean, true si es correcto el digito verificador, false si es incorrecto
 */
function validarDigitoVerificador(
	numero: string,
	digitoVerificador: number
): boolean {
	// Algoritmo de Luhn
	const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
	let suma = 0;

	// Multiplicar cada dígito por su coeficiente correspondiente
	for (let i = 0; i < coeficientes.length; i++) {
		const digito = Number(numero.charAt(i)) * coeficientes[i];
		suma += digito > 9 ? digito - 9 : digito;
	}

	// Calcular el dígito verificador esperado
	const digitoVerificadorEsperado = (10 - (suma % 10)) % 10;

	return digitoVerificador === digitoVerificadorEsperado;
}
