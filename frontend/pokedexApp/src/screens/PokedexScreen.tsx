import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import {
	getInitialUrlPokemons,
	getPokemonDetailByUrl,
	getPokemons,
} from '../api/pokemonApi';
import PokemonList from '../components/PokemonList';

export default function PokedexScreen() {
	const url: string = getInitialUrlPokemons();

	const [pokemons, setPokemons]: any = useState([]);
	const [nextUrl, setNextUrl]: any = useState(url);

	useEffect(() => {
		(async () => {
			await loadPokemons();
		})();
	}, []);

	const loadPokemons = async () => {
		try {
			const response = await getPokemons(nextUrl);
			setNextUrl(response.next);

			const pokemonsList: any = [];

			for await (const pokemon of response.results) {
				const pokemonDetail = await getPokemonDetailByUrl(pokemon.url);

				pokemonsList.push({
					id: pokemonDetail.id,
					name: pokemonDetail.name,
					type: pokemonDetail.types[0].type.name,
					order: pokemonDetail.order,
					image: pokemonDetail.sprites.other.home.front_default,
				});
			}

			setPokemons([...pokemons, ...pokemonsList]);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<SafeAreaView>
			<PokemonList
				MorePokemons={nextUrl}
				pokemons={pokemons}
				loadPokemons={loadPokemons}
			/>
		</SafeAreaView>
	);
}
