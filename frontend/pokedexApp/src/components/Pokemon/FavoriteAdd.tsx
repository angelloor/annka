import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
	addPokemonFavoriteApi,
	isPokemonFavoriteApi,
	removePokemonFavoriteApi,
} from '../../api/favoriteStorage';

export default function FavoriteAdd(props: any) {
	const { id } = props;
	const [isFavorite, setIsFavorite] = useState<any>(undefined);
	const [reloadCheck, setReloadCheck] = useState(false);
	const Icon = isFavorite ? FontAwesome : FontAwesome5;

	useEffect(() => {
		(async () => {
			try {
				const response: any = await isPokemonFavoriteApi(id);
				setIsFavorite(response);
			} catch (error) {
				setIsFavorite(false);
			}
		})();
	}, [id, reloadCheck]);

	const onReloadCheckFavorite = () => {
		setReloadCheck((prev) => !prev);
	};

	const addFavorite = async () => {
		try {
			await addPokemonFavoriteApi(id);
			onReloadCheckFavorite();
		} catch (error) {
			console.log(error);
		}
	};

	const removeFavorite = async () => {
		try {
			await removePokemonFavoriteApi(id);
			onReloadCheckFavorite();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={styles.contentIcon}>
			<Icon
				name="heart"
				color="#f8312f"
				size={30}
				onPress={isFavorite ? removeFavorite : addFavorite}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	contentIcon: {
		flex: 1,
		alignItems: 'center',
		marginTop: 20,
		paddingVertical: 10,
	},
	icon: {},
});
