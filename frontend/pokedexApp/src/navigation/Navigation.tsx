import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image } from 'react-native';
import AccountNavigation from './AccountNavigation';
import FavoriteNavigation from './FavoriteNavigation';
import PokedexNavigation from './PokedexNavigation';

const Tab = createBottomTabNavigator();

export default function Navigation() {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="TabAccount"
				component={AccountNavigation}
				options={{
					tabBarLabel: '',
					title: '',
					headerTransparent: true,
					tabBarIcon: () => renderAccount(),
				}}
			/>

			<Tab.Screen
				name="TabPokedex"
				component={PokedexNavigation}
				options={{
					tabBarLabel: '',
					title: '',
					headerTransparent: true,
					tabBarIcon: () => renderPokeball(),
				}}
			/>
			<Tab.Screen
				name="TabFavorite"
				component={FavoriteNavigation}
				options={{
					tabBarLabel: '',
					title: '',
					headerTransparent: true,
					tabBarIcon: () => renderFavorite(),
				}}
			/>
		</Tab.Navigator>
	);
}

function renderPokeball() {
	return (
		<Image
			source={require('../assets/pokeball.png')}
			style={{ width: 75, height: 75, top: -15 }}
		/>
	);
}

function renderAccount() {
	return (
		<Image
			source={require('../assets/account.png')}
			style={{ width: 50, height: 50, top: 0 }}
		/>
	);
}

function renderFavorite() {
	return (
		<Image
			source={require('../assets/favorite.png')}
			style={{ width: 50, height: 50, top: 0 }}
		/>
	);
}
