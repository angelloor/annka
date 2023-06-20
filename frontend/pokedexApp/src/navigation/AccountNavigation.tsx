import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AccountScreen from '../screens/AccountScreen';

const Stack = createStackNavigator();

export default function AccountNavigation() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="StackAccount"
				component={AccountScreen}
				options={{ title: 'Mi cuenta' }}
			/>
		</Stack.Navigator>
	);
}
