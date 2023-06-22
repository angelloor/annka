import { appConfig } from '../app.config';

export function getInitialUrlPokemons(
	offset: number = appConfig.offsetPokemonInitial,
	amount: number = appConfig.amountPokemonsByPage
) {
	return `${appConfig.hostPokeapi}/pokemon?offset=${offset}&limit=${amount}`;
}

export async function getPokemons(url: string) {
	try {
		const pokemonsJson = await fetch(url);
		const pokemons = await pokemonsJson.json();
		return pokemons;
	} catch (error: any) {
		throw error;
	}
}

export async function getPokemonDetailByUrl(url: string) {
	try {
		const pokemonDetailJson = await fetch(url);
		const pokemonDetail = await pokemonDetailJson.json();
		return pokemonDetail;
	} catch (error: any) {
		throw error;
	}
}

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

export async function getAbilityDetailByUrl(url: string) {
	try {
		const abilityDetailJson = await fetch(url);
		const abilityDetail = await abilityDetailJson.json();
		return abilityDetail;
	} catch (error: any) {
		throw error;
	}
}

export async function getDetailTypeByName(name: string) {
	try {
		const detailTypeJson = await fetch(`${appConfig.hostPokeapi}/type/${name}`);
		const detailType = await detailTypeJson.json();
		return detailType;
	} catch (error: any) {
		throw error;
	}
}
