import React from 'react';
import {
	ActivityIndicator,
	FlatList,
	Platform,
	StyleSheet,
	View,
} from 'react-native';
import PokemonCard from './PokemonCard';

export default function PokemonList(props: any) {
	const { pokemons, loadPokemons, MorePokemons }: any = props;

	const loadMore = () => {
		loadPokemons();
	};

	return (
		<View>
			<FlatList
				data={pokemons}
				numColumns={2}
				showsVerticalScrollIndicator={true}
				keyExtractor={(pokemon: any) => String(pokemon.id)}
				renderItem={({ item }) => <PokemonCard pokemon={item} />}
				contentContainerStyle={styles.flatListContentContainer}
				onEndReached={MorePokemons && loadMore}
				onEndReachedThreshold={0.1}
				ListFooterComponent={
					MorePokemons && (
						<ActivityIndicator
							size="large"
							style={styles.spinner}
							color="#AEAE"
						/>
					)
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	flatListContentContainer: {
		paddingHorizontal: 5,
		marginTop: Platform.OS === 'android' ? 30 : 0,
	},
	spinner: {
		marginTop: 20,
		marginBottom: Platform.OS === 'android' ? 90 : 60,
	},
});
