import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import PokemonListType from '../components/Pokemon/PokemonListType';
import PokedexScreen from '../screens/PokedexScreen';
import PokemonScreen from '../screens/PokemonScreen';

const Stack = createStackNavigator();

export default function PokedexNavigation() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="StackPokedex"
				component={PokedexScreen}
				options={{
					title: '',
					headerTransparent: true,
				}}
			/>
			<Stack.Screen
				name="StackPokemon"
				component={PokemonScreen}
				options={{
					title: '',
					headerTransparent: true,
				}}
			/>
			<Stack.Screen
				name="StackPokemonList"
				component={PokemonListType}
				options={{
					title: 'Lista de Pokemons',
					headerTransparent: true,
				}}
			/>
		</Stack.Navigator>
	);
}
