import React from 'react';
import { Image } from 'react-native';

export function renderClosePokeball(
	width: number = 40,
	height: number = 40,
	top: number = 0
) {
	return (
		<Image
			source={require('../assets/img/pokeball.png')}
			style={{ width, height, top }}
		/>
	);
}

export function renderOpenPokeball(
	width: number = 40,
	height: number = 40,
	top: number = 0
) {
	return (
		<Image
			source={require('../assets/img/pokeballOpen.png')}
			style={{ width, height, top }}
		/>
	);
}

export function renderAccount(
	width: number = 40,
	height: number = 40,
	top: number = 0
) {
	return (
		<Image
			source={require('../assets/img/account.png')}
			style={{ width, height, top }}
		/>
	);
}

export function renderFavorite(
	width: number = 40,
	height: number = 40,
	top: number = 0
) {
	return (
		<Image
			source={require('../assets/img/favorite.png')}
			style={{ width, height, top }}
		/>
	);
}
