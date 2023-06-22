import AsyncStorage from '@react-native-async-storage/async-storage';
import { includes, pull } from 'lodash';

export async function getPokemonsFavoriteStorage() {
	try {
		const favorites = await AsyncStorage.getItem('favorites');
		return JSON.parse(favorites || '[]');
	} catch (error) {
		throw error;
	}
}

export async function addPokemonFavoriteStorage(id_favorite: string) {
	try {
		const favorites = await getPokemonsFavoriteStorage();
		favorites.push(id_favorite);
		await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
	} catch (error) {
		throw error;
	}
}

export async function isPokemonFavoriteStorage(id_favorite: string) {
	try {
		const favorites = await getPokemonsFavoriteStorage();
		return includes(favorites, id_favorite);
	} catch (error) {
		throw error;
	}
}

export async function removePokemonFavoriteStorage(id_favorite: string) {
	try {
		const favorites = await getPokemonsFavoriteStorage();
		const newFavorites = pull(favorites, id_favorite);
		await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
	} catch (error) {
		throw error;
	}
}
