import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { renderClosePokeball, renderOpenPokeball } from '../../Icons/Pokedex';
import {
	addPokemonFavoriteStorage,
	isPokemonFavoriteStorage,
	removePokemonFavoriteStorage,
} from '../../storage/favoriteStorage';

export default function FavoriteAdd(props: any) {
	const { id } = props;

	// useState
	const [isFavorite, setIsFavorite] = useState<any>(null);
	const [reloadCheck, setReloadCheck] = useState(false);

	// useEffect
	useEffect(() => {
		(async () => {
			try {
				const isPokemonFavorite: any = await isPokemonFavoriteStorage(id);
				setIsFavorite(isPokemonFavorite);
			} catch (error) {
				setIsFavorite(false);
			}
		})();
	}, [id, reloadCheck]);

	// recargamos la lista de favoritos
	const onReloadCheckFavorite = () => {
		setReloadCheck((prev) => !prev);
	};

	// agregar a favoritos
	const addFavorite = async () => {
		try {
			await addPokemonFavoriteStorage(id);
			onReloadCheckFavorite();
		} catch (error) {
			console.log(error);
		}
	};

	// remover de favoritos
	const removeFavorite = async () => {
		try {
			await removePokemonFavoriteStorage(id);
			onReloadCheckFavorite();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={isFavorite ? removeFavorite : addFavorite}>
				{isFavorite ? renderOpenPokeball() : renderClosePokeball()}
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		marginTop: 20,
		paddingVertical: 10,
	},
});
