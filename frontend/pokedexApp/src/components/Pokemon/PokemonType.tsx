import { capitalize, map } from 'lodash';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import getColorByPokemonType from '../../utils/getColorByPokemonType';

export default function PokemonType(props: any) {
	const { types } = props;

	return (
		<View style={styles.content}>
			{map(types, (type, index) => (
				<View
					key={index}
					style={{
						...styles.pill,
						backgroundColor: getColorByPokemonType(type.type.name),
					}}
				>
					<Text>{capitalize(type.type.name)}</Text>
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	content: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 10,
	},
	pill: {
		paddingHorizontal: 30,
		paddingVertical: 5,
		borderRadius: 20,
		marginHorizontal: 10,
	},
});
