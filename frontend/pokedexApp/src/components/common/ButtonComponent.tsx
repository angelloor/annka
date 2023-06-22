import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { appConfig } from '../../app.config';
import { getColorByPokemonType } from '../../utils/others';

export const ButtonComponent = ({ event, title, type }: any) => {
	// obtener el color de acuerdo al tipo de pokemon
	const pokemonColor = getColorByPokemonType(type);

	const btnStyles = { backgroundColor: pokemonColor, ...styles.btn };

	return (
		<TouchableOpacity activeOpacity={0.6} style={btnStyles} onPress={event}>
			<Text style={styles.btnText}>{title}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	btn: {
		width: '30%',
		paddingHorizontal: 15,
		paddingVertical: 5,
		borderRadius: 10,
		marginVertical: 10,
		alignSelf: 'center',
	},
	btnText: {
		color: appConfig.appColors.color,
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
