import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getPokemonInformationById } from '../api/pokemonApi';
import PokemonHeader from '../components/Pokemon/PokemonHeader';
import PokemonType from '../components/Pokemon/PokemonType';
import StatisticsPokemon from '../components/Pokemon/StatisticsPokemon';

export default function PokemonScreen(props: any) {
	const {
		route: { params },
		navigation,
	} = props;
	const { id } = params;

	const [pokemon, setPokemon] = useState<any>(null);

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => null,
			headerLeft: () => (
				<Icon
					name="arrow-left"
					color="#fff"
					size={20}
					style={{ marginLeft: 20 }}
					onPress={navigation.goBack}
				/>
			),
		});
	}, [navigation, params]);

	useEffect(() => {
		(async () => {
			try {
				const response = await getPokemonInformationById(id);
				setPokemon(response);
			} catch (error) {
				navigation.goBack();
			}
		})();
	}, [params]);

	if (!pokemon) return null;

	return (
		<ScrollView>
			<PokemonHeader
				name={pokemon.name}
				order={pokemon.order}
				type={pokemon.types[0].type.name}
				image={pokemon.sprites.other.home.front_default}
			/>
			<PokemonType types={pokemon.types} />
			<StatisticsPokemon statistcs={pokemon.stats} />
		</ScrollView>
	);
}
