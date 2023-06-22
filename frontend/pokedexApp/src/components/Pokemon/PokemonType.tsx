import { useNavigation } from '@react-navigation/native';
import { capitalize, map } from 'lodash';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { appConfig } from '../../app.config';
import { getColorByPokemonType } from '../../utils/others';

export default function PokemonType(props: any) {
	const navigation: any = useNavigation();
	const { types } = props;

	// Navegar a la pantalla de lista de pokemon por tipo de acuerdo al tipo seleccionado
	const navigateTypePokemon: any = (nameType: string) => {
		navigation.navigate('StackPokemonList', { name: nameType });
	};

	return (
		<View style={styles.container}>
			{map(types, (type, index) => (
				<TouchableOpacity
					key={index}
					style={{
						...styles.type,
						backgroundColor: getColorByPokemonType(type.type.name),
					}}
					onPress={() => navigateTypePokemon(type.type.name)}
				>
					<Text style={styles.text}>{capitalize(type.type.name)}</Text>
				</TouchableOpacity>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 10,
	},
	type: {
		paddingHorizontal: 30,
		paddingVertical: 5,
		borderRadius: 20,
		marginHorizontal: 10,
	},
	text: {
		color: appConfig.appColors.color,
	},
});
