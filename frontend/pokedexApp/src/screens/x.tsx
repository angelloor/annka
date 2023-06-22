import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput } from 'react-native';
import {
	getInitialUrlPokemons,
	getPokemonDetailByUrl,
	getPokemons,
} from '../APIs/pokemonAPI';
import { appConfig } from '../app.config';
import PokemonList from '../components/PokemonList';
import { commonStyles } from '../styles/common';

export default function PokedexScreen() {
	const url: string = getInitialUrlPokemons();

	const [isSearch, setIsSearch]: any = useState(false);
	const [pokemons, setPokemons]: any = useState([]);
	const [nextUrl, setNextUrl]: any = useState(url);
	const [filterPokemons, setFilterPokemons]: any = useState([]);

	const searchPokemon = (nameOrIdPokemon: string) => {
		if (nameOrIdPokemon === '') {
			setIsSearch(false);
		} else {
			setIsSearch(true);

			const filterPokemos = pokemons.filter(
				(pokemon: any) =>
					pokemon.name.toLowerCase().includes(nameOrIdPokemon.toLowerCase()) ||
					pokemon.order.toString().includes(nameOrIdPokemon.toLowerCase())
			);

			setFilterPokemons(filterPokemos);
		}
	};

	useEffect(() => {
		(async () => {
			await loadPokemons();
		})();
	}, []);

	const loadPokemons = async () => {
		try {
			const pokemons = await getPokemons(nextUrl);
			setNextUrl(pokemons.next);

			const pokemonsList: any = [];

			for await (const pokemon of pokemons.results) {
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
		<SafeAreaView style={styles.container}>
			<TextInput
				placeholder="Buscar por id o nombre"
				placeholderTextColor={appConfig.appColors.color}
				style={commonStyles.input}
				onChangeText={(nameOrIdPokemon: any) => searchPokemon(nameOrIdPokemon)}
			/>
			<PokemonList
				MorePokemons={nextUrl}
				isSearch={isSearch}
				pokemons={isSearch ? filterPokemons : pokemons}
				loadPokemons={loadPokemons}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: appConfig.appColors.background,
	},
});
