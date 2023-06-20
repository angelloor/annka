import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AccountNavigation from './AccountNavigation';
import FavoriteNavigation from './FavoriteNavigation';
import PokedexNavigation from './PokedexNavigation';

const Tab = createBottomTabNavigator();

export default function Navigation() {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="TabFavorite"
				component={FavoriteNavigation}
				options={{
					tabBarLabel: 'Favoritos',
					title: '',
					headerTransparent: true,
					tabBarIcon: ({ color, size }) => (
						<Icon name="heart" color={color} size={size} />
					),
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
				name="TabAccount"
				component={AccountNavigation}
				options={{
					tabBarLabel: 'Mi cuenta',
					title: '',
					headerTransparent: true,
					tabBarIcon: ({ color, size }) => (
						<Icon name="user" color={color} size={size} />
					),
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
