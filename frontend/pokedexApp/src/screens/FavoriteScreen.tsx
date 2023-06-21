import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { getPokemonsFavoriteApi } from '../api/favoriteStorage';
import { getPokemonInformationById } from '../api/pokemonApi';
import PokemonList from '../components/PokemonList';

export default function FavoriteScreen() {
	const [pokemons, setPokemons] = useState([]);
	const auth = true;

	useFocusEffect(
		useCallback(() => {
			if (auth) {
				(async () => {
					const response = await getPokemonsFavoriteApi();

					const pokemonsArray: any = [];
					for await (const id of response) {
						const pokemonDetails = await getPokemonInformationById(id);

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

	return !auth ? <View /> : <PokemonList pokemons={pokemons} />;
}
