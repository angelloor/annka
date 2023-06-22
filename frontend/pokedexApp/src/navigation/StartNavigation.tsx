import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { size } from 'lodash';
import React, { useCallback, useState } from 'react';
import {
	renderAccount,
	renderClosePokeball,
	renderFavorite,
} from '../Icons/Pokedex';
import { appConfig } from '../app.config';
import { getPokemonsFavoriteStorage } from '../storage/favoriteStorage';
import AccountNavigation from './AccountNavigation';
import FavoriteNavigation from './FavoriteNavigation';
import PokedexNavigation from './PokedexNavigation';

const Tab = createBottomTabNavigator();

export default function StartNavigation() {
	const [totalFavorites, setTotalFavorites] = useState(0);

	useFocusEffect(
		useCallback(() => {
			(async () => {
				try {
					const pokemonsFavorite = await getPokemonsFavoriteStorage();
					setTotalFavorites(size(pokemonsFavorite));
				} catch (error) {
					setTotalFavorites(0);
				}
			})();
		}, [])
	);

	return (
		<Tab.Navigator
			screenOptions={{
				tabBarStyle: { backgroundColor: appConfig.appColors.backgroundHeader },
			}}
		>
			<Tab.Screen
				name="TabAccount"
				component={AccountNavigation}
				options={{
					tabBarLabel: '',
					title: '',
					headerTransparent: true,
					tabBarIcon: () => renderAccount(50, 50),
				}}
			/>

			<Tab.Screen
				name="TabPokedex"
				component={PokedexNavigation}
				options={{
					tabBarLabel: '',
					title: '',
					headerTransparent: true,
					tabBarIcon: () => renderClosePokeball(75, 75, -15),
				}}
			/>
			<Tab.Screen
				name="TabFavorite"
				component={FavoriteNavigation}
				options={{
					tabBarLabel: '',
					title: '',
					headerTransparent: true,
					tabBarBadge: totalFavorites,
					tabBarIcon: () => renderFavorite(50, 50),
				}}
			/>
		</Tab.Navigator>
	);
}
