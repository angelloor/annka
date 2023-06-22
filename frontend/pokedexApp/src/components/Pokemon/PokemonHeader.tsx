import { capitalize } from 'lodash';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appConfig } from '../../app.config';
import { getColorByPokemonType, returnFormatedOrder } from '../../utils/others';

export default function PokemonHeader(props: any) {
	const { name, order, type, image } = props;

	// obtener el color de acuerdo al tipo de pokemon
	const pokemonColor = getColorByPokemonType(type);

	const bgStyles = { backgroundColor: pokemonColor, ...styles.background };

	return (
		<>
			<View style={bgStyles} />
			<SafeAreaView style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.name}>{capitalize(name)}</Text>
					<Text style={styles.order}>{returnFormatedOrder(order)}</Text>
				</View>
				<View style={styles.containerImg}>
					<Image source={{ uri: image }} style={styles.img} />
				</View>
			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	background: {
		width: '100%',
		height: 350,
		position: 'absolute',
		borderBottomEndRadius: 300,
		borderBottomLeftRadius: 300,
		transform: [{ scaleX: 2 }],
	},
	container: {
		marginHorizontal: 20,
		marginTop: 0,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: 20,
	},
	name: {
		color: appConfig.appColors.color,
		fontWeight: 'bold',
		fontSize: 27,
	},
	order: {
		color: appConfig.appColors.color,
		fontWeight: 'bold',
	},
	containerImg: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		top: 0,
	},
	img: {
		width: 400,
		height: 350,
		resizeMode: 'contain',
	},
});
