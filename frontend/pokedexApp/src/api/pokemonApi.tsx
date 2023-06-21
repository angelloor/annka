import {
	AMOUNT_POKEMONS_BY_PAGE,
	API_HOST,
	OFFSET_POKEMON_INITIAL,
} from '../utils/constants';

export function getInitialUrlPokemons(
	offset: number = OFFSET_POKEMON_INITIAL,
	amount: number = AMOUNT_POKEMONS_BY_PAGE
) {
	return `${API_HOST}/pokemon?offset=${offset}&limit=${amount}`;
}

export async function getPokemons(url: string) {
	try {
		const response = await fetch(url);
		const result = await response.json();
		return result;
	} catch (error) {
		throw error;
	}
}

export async function getPokemonDetailByUrl(url: string) {
	try {
		const response = await fetch(url);
		const result = await response.json();
		return result;
	} catch (error) {
		throw error;
	}
}

export async function getPokemonInformationById(id: string) {
	try {
		const response = await fetch(`${API_HOST}/pokemon/${id}`);
		const result = await response.json();
		return result;
	} catch (error) {
		throw error;
	}
}

export async function getAbilityDetailByUrl(url: string) {
	try {
		const response = await fetch(url);
		const result = await response.json();
		return result;
	} catch (error) {
		throw error;
	}
}
