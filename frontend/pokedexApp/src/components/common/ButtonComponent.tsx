import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import getColorByPokemonType from '../../utils/getColorByPokemonType';

const ButtonComponent = ({ event, title, type }: any) => {
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
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});

export default ButtonComponent;
