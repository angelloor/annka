import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import FavoriteScreen from '../screens/FavoriteScreen';

const Stack = createStackNavigator();

export default function FavoriteNavigation() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="StackFavorite"
				component={FavoriteScreen}
				options={{ title: 'Favoritos' }}
			/>
		</Stack.Navigator>
	);
}
