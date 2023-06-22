import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { appConfig } from '../../app.config';
import { addCeros, getColorByPokemonType } from '../../utils/others';

export default function PokemonInfo(props: any) {
	let { weight, height, type } = props;

	const { weightFormated, heightFormated } = addCeros(weight, height);

	// obtener el color de acuerdo al tipo de pokemon
	const pokemonColor = getColorByPokemonType(type);

	return (
		<View style={styles.container}>
			<View style={styles.containerWeight}>
				<Icon name="weight" color={pokemonColor} size={30} />
				<Text style={styles.text}>{weightFormated}</Text>
			</View>
			<View style={styles.containerHeight}>
				<Icon name="ruler-vertical" color={pokemonColor} size={30} />
				<Text style={styles.text}>{heightFormated}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	containerWeight: {
		width: '15%',
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingVertical: 10,
	},
	containerHeight: {
		width: '15%',
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingVertical: 10,
	},
	text: {
		color: appConfig.appColors.color,
		fontSize: 16,
		fontWeight: '500',
		marginTop: 5,
	},
});
