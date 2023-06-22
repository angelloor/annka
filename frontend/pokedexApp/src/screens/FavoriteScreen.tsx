import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { getPokemonDetailById } from '../APIs/pokemonAPI';
import { appConfig } from '../app.config';
import PokemonList from '../components/PokemonList';
import { getPokemonsFavoriteStorage } from '../storage/favoriteStorage';
import { commonStyles } from '../styles/common';

export default function FavoriteScreen() {
	const auth = true;

	const [isSearch, setIsSearch]: any = useState(false);
	const [pokemons, setPokemons] = useState([]);
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

	useFocusEffect(
		useCallback(() => {
			if (auth) {
				(async () => {
					const pokemonsFavorite = await getPokemonsFavoriteStorage();

					const pokemonsArray: any = [];
					for await (const id of pokemonsFavorite) {
						const pokemonDetails = await getPokemonDetailById(id);

						pokemonsArray.push({
							id: pokemonDetails.id,
							name: pokemonDetails.name,
							type: pokemonDetails.types[0].type.name,
							order: pokemonDetails.order,
							image:
								pokemonDetails.sprites.other['official-artwork'].front_default,
						});
					}

					setPokemons(pokemonsArray);
				})();
			}
		}, [auth])
	);

	return (
		<View style={styles.container}>
			<TextInput
				placeholder="Buscar por id o nombre"
				placeholderTextColor={appConfig.appColors.color}
				style={commonStyles.input}
				onChangeText={(nameOrIdPokemon: any) => searchPokemon(nameOrIdPokemon)}
			/>
			<PokemonList pokemons={isSearch ? filterPokemons : pokemons} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: appConfig.appColors.background,
	},
});
