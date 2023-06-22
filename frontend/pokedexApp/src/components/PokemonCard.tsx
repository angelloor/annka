import { useNavigation } from '@react-navigation/native';
import { capitalize } from 'lodash';
import React from 'react';
import {
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native';

const maxWidth = Dimensions.get('window').width;

import { appConfig } from '../app.config';
import { getColorByPokemonType, returnFormatedOrder } from '../utils/others';

export default function PokemonCard(props: any) {
	const { pokemon }: any = props;

	const navigation: any = useNavigation();

	// obtener el color de acuerdo al tipo de pokemon
	const pokemonColor = getColorByPokemonType(pokemon.type);

	const bgStyles = { backgroundColor: pokemonColor, ...styles.bgStyles };
	/**
	 * Navegar a la pantalla de detalle del pokemon
	 */
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
						<Image source={{ uri: pokemon.image }} style={styles.img} />
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
		maxWidth: maxWidth / 2 - 15,
	},
	order: {
		position: 'absolute',
		right: 10,
		top: 10,
		color: appConfig.appColors.color,
		fontSize: 11,
	},
	name: {
		color: appConfig.appColors.color,
		fontWeight: 'bold',
		fontSize: 15,
		paddingTop: 10,
		textTransform: 'capitalize',
	},
	img: {
		position: 'absolute',
		bottom: 2,
		right: 2,
		width: 90,
		height: 90,
	},
});
