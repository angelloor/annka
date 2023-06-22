import React from 'react';
import {
	ActivityIndicator,
	FlatList,
	Platform,
	StyleSheet,
	View,
} from 'react-native';
import { commonStyles } from '../styles/common';
import PokemonCard from './PokemonCard';

export default function PokemonList(props: any) {
	const { pokemons, loadPokemons, MorePokemons, isSearch }: any = props;

	/**
	 * Funcion que permite cargar mas pokemones (Infinite Scroll)
	 */
	const loadMore = () => {
		loadPokemons();
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={pokemons}
				numColumns={2}
				showsVerticalScrollIndicator={true}
				keyExtractor={(pokemon: any) => String(pokemon.id)}
				renderItem={({ item }) => <PokemonCard pokemon={item} />}
				contentContainerStyle={styles.contentFlatList}
				onEndReached={MorePokemons && !isSearch && loadMore}
				onEndReachedThreshold={0.1}
				ListFooterComponent={
					MorePokemons &&
					!isSearch && (
						<ActivityIndicator
							size="large"
							style={commonStyles.spinner}
							color="#AEAE"
						/>
					)
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: '100%',
	},
	contentFlatList: {
		paddingHorizontal: 5,
		marginTop: Platform.OS === 'android' ? 20 : 10,
		paddingBottom: 160,
	},
});
