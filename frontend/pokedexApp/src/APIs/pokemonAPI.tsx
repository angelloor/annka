import { appConfig } from '../app.config';

export function getInitialUrlPokemons(
	offset: number = appConfig.offsetPokemonInitial,
	amount: number = appConfig.amountPokemonsByPage
) {
	return `${appConfig.hostPokeapi}/pokemon?offset=${offset}&limit=${amount}`;
}
/**
 * Obtenemos los pokemons de acuerdo a la url
 * @param url
 * @returns pokemons
 */
export async function getPokemons(url: string) {
	try {
		const pokemonsJson = await fetch(url);
		const pokemons = await pokemonsJson.json();
		return pokemons;
	} catch (error: any) {
		throw error;
	}
}
/**
 * Obtenemos el detalle de un pokemon de acuerdo a la url
 * @param url
 * @returns detalle de pokemon
 */
export async function getPokemonDetailByUrl(url: string) {
	try {
		const pokemonDetailJson = await fetch(url);
		const pokemonDetail = await pokemonDetailJson.json();
		return pokemonDetail;
	} catch (error: any) {
		throw error;
	}
}
/**
 * Obtenemos el detalle de un pokemon de acuerdo al id
 * @param url
 * @returns detalle de pokemon
 */
export async function getPokemonDetailById(id: string) {
	try {
		const pokemonDetailJson = await fetch(
			`${appConfig.hostPokeapi}/pokemon/${id}`
		);
		const pokemonDetail = await pokemonDetailJson.json();
		return pokemonDetail;
	} catch (error: any) {
		throw error;
	}
}
/**
 * Obtenemos el detalle de la habilidad de acuerdo a la url
 * @param url
 * @returns detalle de habilidad
 */
export async function getAbilityDetailByUrl(url: string) {
	try {
		const abilityDetailJson = await fetch(url);
		const abilityDetail = await abilityDetailJson.json();
		return abilityDetail;
	} catch (error: any) {
		throw error;
	}
}
/**
 * Obtenemos el detalle del tipo de pokemon de acuerdo al nombre
 * @param name
 * @returns
 */
export async function getDetailTypeByName(name: string) {
	try {
		const detailTypeJson = await fetch(`${appConfig.hostPokeapi}/type/${name}`);
		const detailType = await detailTypeJson.json();
		return detailType;
	} catch (error: any) {
		throw error;
	}
}
