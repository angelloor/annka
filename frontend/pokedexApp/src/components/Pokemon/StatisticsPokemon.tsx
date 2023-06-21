import { capitalize, map } from 'lodash';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import getColorByPokemonType from '../../utils/getColorByPokemonType';

export default function StatisticsPokemon(props: any) {
	const { statistcs, type } = props;

	const pokemonColor = getColorByPokemonType(type);

	const colors: any = {
		red: '#ff0000',
		yellow: '#ffff00',
		green: '#00ff00',
		base: pokemonColor,
	};

	const barStyles = (num: any) => {
		const color =
			num <= 30
				? colors.red
				: num <= 60
				? colors.yellow
				: num <= 90
				? colors.green
				: colors.base;
		return {
			backgroundColor: color,
			width: `${num}%`,
		};
	};

	return (
		<View style={styles.content}>
			{map(statistcs, (item, index) => (
				<View key={index} style={styles.block}>
					<View style={styles.blockTitle}>
						<Text style={styles.statName}>{capitalize(item.stat.name)}</Text>
					</View>
					<View style={styles.blockInfo}>
						<Text style={styles.number}>{item.base_stat}</Text>
						<View style={styles.bgBar}>
							<View style={[styles.bar, barStyles(item.base_stat)]} />
						</View>
					</View>
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	content: {
		paddingHorizontal: 20,
		marginBottom: 0,
		paddingVertical: 10,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 20,
		paddingBottom: 5,
	},
	block: {
		flexDirection: 'row',
		paddingVertical: 5,
	},
	blockTitle: {
		width: '30%',
	},
	statName: {
		fontSize: 12,
		color: '#6b6b6b',
	},
	blockInfo: {
		width: '70%',
		flexDirection: 'row',
		alignItems: 'center',
	},
	number: {
		width: '12%',
		fontSize: 12,
	},
	bgBar: {
		backgroundColor: '#dedede',
		width: '88%',
		height: 5,
		borderRadius: 20,
		overflow: 'hidden',
	},
	bar: {
		// backgroundColor: "red",
		// width: "40%",
		height: 5,
		borderRadius: 20,
	},
});
