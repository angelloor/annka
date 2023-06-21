import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { getPokemonInformationById } from '../api/pokemonApi';
import FavoriteAdd from '../components/Pokemon/FavoriteAdd';
import PokemonAbilities from '../components/Pokemon/PokemonAbilities';
import PokemonHeader from '../components/Pokemon/PokemonHeader';
import PokemonInfo from '../components/Pokemon/PokemonInfo';
import PokemonType from '../components/Pokemon/PokemonType';
import StatisticsPokemon from '../components/Pokemon/StatisticsPokemon';
import ButtonComponent from '../components/common/ButtonComponent';
import TitleComponent from '../components/common/TitleComponent';

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
			headerLeft: () => null,
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
				abilities={pokemon.abilities}
				image={pokemon.sprites.other.home.front_default}
			/>
			<FavoriteAdd id={pokemon.id} />
			<PokemonInfo
				weight={pokemon.weight}
				height={pokemon.height}
				type={pokemon.types[0].type.name}
			/>
			<TitleComponent title="Tipos" />
			<PokemonType types={pokemon.types} />
			<TitleComponent title="Habilidades" />
			<PokemonAbilities
				abilities={pokemon.abilities}
				type={pokemon.types[0].type.name}
			/>
			<TitleComponent title="Estadisticas Base" />
			<StatisticsPokemon
				statistcs={pokemon.stats}
				type={pokemon.types[0].type.name}
			/>

			<ButtonComponent title="Evolución" type={pokemon.types[0].type.name} />
			<View style={styles.viewSpacer} />
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	viewSpacer: {
		paddingBottom: 80,
	},
});
