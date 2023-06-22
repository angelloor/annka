import React, { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	FlatList,
	Platform,
	StyleSheet,
	TextInput,
	View,
} from 'react-native';
import { getDetailTypeByName, getPokemonDetailByUrl } from '../APIs/pokemonAPI';
import { appConfig } from '../app.config';
import { commonStyles } from '../styles/common';
import PokemonCard from './PokemonCard';

export default function PokemonTypeList(props: any) {
	const {
		route: { params },
		navigation,
	} = props;
	const { name } = params;

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

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => null,
			headerLeft: () => null,
		});
	}, [navigation, params]);

	useEffect(() => {
		(async () => {
			try {
				const detailType = await getDetailTypeByName(name);
				loadMoreInformationPokemon(detailType.pokemon);
			} catch (error) {
				navigation.goBack();
			}
		})();
	}, [params]);

	const loadMoreInformationPokemon = async (listPok: any) => {
		try {
			const pokemonsList: any = [];

			for await (const pokemon of listPok) {
				const pokemonDetail = await getPokemonDetailByUrl(pokemon.pokemon.url);

				pokemonsList.push({
					id: pokemonDetail.id,
					name: pokemonDetail.name,
					type: pokemonDetail.types[0].type.name,
					order: pokemonDetail.order,
					image: pokemonDetail.sprites.other.home.front_default,
				});
			}

			setPokemons(pokemonsList);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={styles.containerScreen}>
			<TextInput
				placeholder="Buscar por id o nombre"
				placeholderTextColor={appConfig.appColors.color}
				style={commonStyles.input}
				onChangeText={(nameOrIdPokemon: any) => searchPokemon(nameOrIdPokemon)}
			/>
			<FlatList
				data={isSearch ? filterPokemons : pokemons}
				numColumns={2}
				showsVerticalScrollIndicator={true}
				keyExtractor={(pokemon: any, index: number) => String(index)}
				renderItem={({ item }) => (
					<PokemonCard pokemon={{ ...item, type: name }} />
				)}
				contentContainerStyle={styles.flatListContentContainer}
				onEndReachedThreshold={0.1}
				ListFooterComponent={
					!isSearch ? (
						<ActivityIndicator
							size="large"
							style={commonStyles.spinner}
							color="#AEAE"
						/>
					) : null
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	containerScreen: {
		flex: 1,
		backgroundColor: appConfig.appColors.background,
	},
	btnGoBack: {
		marginTop: 30,
		backgroundColor: 'red',
		padding: 10,
	},
	flatListContentContainer: {
		paddingHorizontal: 5,
		marginTop: Platform.OS === 'android' ? 30 : 0,
	},
});
