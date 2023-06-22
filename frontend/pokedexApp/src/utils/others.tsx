import { appConfig } from '../app.config';
/**
 * Return color by pokemon type
 * @param type
 * @returns color in hexadecimal
 */
export const getColorByPokemonType = (type: string): string =>
	appConfig.pokemonColors[type.toLowerCase()] !== undefined
		? appConfig.pokemonColors[type]
		: '#ffffff';

/**
 * Return formated order pokemon
 * @param order
 * @returns order formated
 */
export const returnFormatedOrder = (order: string) =>
	'#' + `${order}`.padStart(3, '0');

/**
 * Return formated weight and height
 * @param weight
 * @param height
 * @returns weight and height formated
 */
export const addCeros = (weight: number, height: number): any => {
	if (weight >= height) {
		var amountCharactersWeight = weight.toString().length;

		return {
			weightFormated: weight,
			heightFormated: height.toString().padStart(amountCharactersWeight, '0'),
		};
	} else {
		var amountCharactersHeight = height.toString().length;

		return {
			weightFormated: weight.toString().padStart(amountCharactersHeight, '0'),
			heightFormated: height,
		};
	}
};
