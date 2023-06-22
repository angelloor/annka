import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import Navigation from './src/navigation/StartNavigation';

export default function App() {
	return (
		<NavigationContainer>
			<Navigation />
		</NavigationContainer>
	);
}
