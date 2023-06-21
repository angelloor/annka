import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import getColorByPokemonType from '../../utils/getColorByPokemonType';

export default function PokemonInfo(props: any) {
	let { weight, height, type } = props;

	const { weightFormated, heightFormated } = addCeros(weight, height);

	const pokemonColor = getColorByPokemonType(type);

	return (
		<View style={styles.contentInfo}>
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
	contentInfo: {
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
		color: 'black',
		fontSize: 16,
		fontWeight: '500',
		marginTop: 5,
	},
});

function addCeros(weight: number, height: number): any {
	if (weight >= height) {
		var amountCharactersWeight = weight.toString().length;

		return {
			weightFormated: weight,
			heightFormated: height.toString().padStart(amountCharactersWeight, '0'),
		};
	} else {
		var amountCharactersHeight = height.toString().length;

		return {
			weightFormated: weight.toString().padStart(amountCharactersHeight, '0'),
			heightFormated: height,
		};
	}
}
