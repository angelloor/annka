import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { getPokemonDetailById } from '../APIs/pokemonAPI';
import { appConfig } from '../app.config';
import { ButtonComponent } from '../components/Common/ButtonComponent';
import TitleComponent from '../components/Common/TitleComponent';
import FavoriteAdd from '../components/Pokemon/FavoriteAdd';
import PokemonAbilities from '../components/Pokemon/PokemonAbilities';
import PokemonHeader from '../components/Pokemon/PokemonHeader';
import PokemonInfo from '../components/Pokemon/PokemonInfo';
import StatisticsPokemon from '../components/Pokemon/PokemonStat';
import PokemonType from '../components/Pokemon/PokemonType';

export default function PokemonScreen(props: any) {
	const {
		route: { params },
		navigation,
	} = props;
	const { id } = params;

	const [pokemon, setPokemon] = useState<any>(null);
	/**
	 * Reset header
	 */
	useEffect(() => {
		navigation.setOptions({
			headerRight: () => null,
			headerLeft: () => null,
		});
	}, [navigation, params]);

	/**
	 * Si params cambia, se vuelve a llamar a la API, trayendo la informacion del nuevo pokemon
	 */
	useEffect(() => {
		(async () => {
			try {
				const pokemonDetail = await getPokemonDetailById(id);
				setPokemon(pokemonDetail);
			} catch (error) {
				navigation.goBack();
			}
		})();
	}, [params]);

	if (!pokemon) return null;

	return (
		<ScrollView style={styles.container}>
			<PokemonHeader
				style={{ zIndex: 3 }}
				name={pokemon.name}
				order={pokemon.order}
				type={pokemon.types[0].type.name}
				stats={pokemon.stats}
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
				stats={pokemon.stats}
				type={pokemon.types[0].type.name}
			/>

			<ButtonComponent title="Evolución" type={pokemon.types[0].type.name} />
			<View style={styles.viewSpacer} />
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: appConfig.appColors.background,
	},
	viewSpacer: {
		paddingBottom: 80,
	},
});
