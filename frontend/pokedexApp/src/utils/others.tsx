import { appConfig } from '../app.config';

export const getColorByPokemonType = (type: string): string =>
	appConfig.pokemonColors[type.toLowerCase()] !== undefined
		? appConfig.pokemonColors[type]
		: '#ffffff';

export const returnFormatedOrder = (order: string) =>
	'#' + `${order}`.padStart(3, '0');

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
