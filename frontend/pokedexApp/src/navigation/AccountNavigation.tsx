import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AccountScreen from '../screens/AccountScreen';

const Stack = createStackNavigator();

export default function AccountNavigation() {
	return (
		<Stack.Navigator screenOptions={{}}>
			<Stack.Screen
				name="StackAccount"
				component={AccountScreen}
				options={{ title: '', headerTransparent: true }}
			/>
		</Stack.Navigator>
	);
}
