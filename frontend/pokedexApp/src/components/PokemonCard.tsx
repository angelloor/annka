import { useNavigation } from '@react-navigation/native';
import { capitalize } from 'lodash';
import React from 'react';
import {
	Image,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import getColorByPokemonType from '../utils/getColorByPokemonType';

export default function PokemonCard(props: any) {
	const navigation: any = useNavigation();
	const { pokemon }: any = props;

	const pokemonColor = getColorByPokemonType(pokemon.type);

	const bgStyles = { backgroundColor: pokemonColor, ...styles.bgStyles };

	const goToPokemon = () => {
		navigation.navigate('StackPokemon', { id: pokemon.id });
	};

	return (
		<TouchableWithoutFeedback onPress={goToPokemon}>
			<View style={styles.card}>
				<View style={styles.spacing}>
					<View style={bgStyles}>
						<Text style={styles.order}>
							{returnFormatedOrder(pokemon.order)}
						</Text>
						<Text style={styles.name}>{capitalize(pokemon.name)}</Text>
						<Image source={{ uri: pokemon.image }} style={styles.image} />
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	card: {
		flex: 1,
		height: 130,
	},
	spacing: {
		flex: 1,
		padding: 5,
	},
	bgStyles: {
		flex: 1,
		borderRadius: 15,
		padding: 10,
	},
	order: {
		position: 'absolute',
		right: 10,
		top: 10,
		color: 'white',
		fontSize: 11,
	},
	name: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 15,
		paddingTop: 10,
		textTransform: 'capitalize',
	},
	image: {
		position: 'absolute',
		bottom: 2,
		right: 2,
		width: 90,
		height: 90,
	},
});

export const returnFormatedOrder = (order: string) =>
	'#' + `${order}`.padStart(3, '0');
