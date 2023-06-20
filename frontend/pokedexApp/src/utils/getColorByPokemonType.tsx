import { POKEMON_TYPE_COLORS } from '../utils/constants';

const getColorByPokemonType = (type: any): any =>
	POKEMON_TYPE_COLORS[type.toLowerCase()] !== undefined
		? POKEMON_TYPE_COLORS[type.toLowerCase()]
		: '#ffffff';

export default getColorByPokemonType;
