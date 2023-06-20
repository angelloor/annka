import { capitalize } from 'lodash';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import getColorByPokemonType from '../../utils/getColorByPokemonType';
import { returnFormatedOrder } from '../PokemonCard';

export default function PokemonHeader(props: any) {
	const { name, order, type, image } = props;

	const pokemonColor = getColorByPokemonType(type);

	const bgStyles = { backgroundColor: pokemonColor, ...styles.bg };

	return (
		<>
			<View style={bgStyles} />
			<SafeAreaView style={styles.content}>
				<View style={styles.header}>
					<Text style={styles.name}>{capitalize(name)}</Text>
					<Text style={styles.order}>{returnFormatedOrder(order)}</Text>
				</View>
				<View style={styles.contentImg}>
					<Image source={{ uri: image }} style={styles.image} />
				</View>
			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	bg: {
		width: '100%',
		height: 400,
		position: 'absolute',
		borderBottomEndRadius: 300,
		borderBottomLeftRadius: 300,
		transform: [{ scaleX: 2 }],
	},
	content: {
		marginHorizontal: 20,
		marginTop: 30,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: 40,
	},
	name: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 27,
	},
	order: {
		color: '#fff',
		fontWeight: 'bold',
	},
	contentImg: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		top: 30,
	},
	image: {
		width: 250,
		height: 300,
		resizeMode: 'contain',
	},
});
