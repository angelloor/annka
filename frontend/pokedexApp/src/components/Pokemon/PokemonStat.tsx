import { capitalize, map } from 'lodash';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { appConfig } from '../../app.config';
import { getColorByPokemonType } from '../../utils/others';

export default function PokemonStat(props: any) {
	const { stats, type } = props;

	const pokemonColor = getColorByPokemonType(type);

	const colors: any = {
		red: '#ff0000',
		yellow: '#ffff00',
		green: '#00ff00',
		base: pokemonColor,
	};

	const barStyles = (num: number) => {
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
		<View style={styles.container}>
			{map(stats, (stat, index) => (
				<View key={index} style={styles.block}>
					<View style={styles.title}>
						<Text style={styles.name}>{capitalize(stat.stat.name)}</Text>
					</View>
					<View style={styles.info}>
						<Text style={styles.number}>{stat.base_stat}</Text>
						<View style={styles.backgroundBar}>
							<View style={[styles.bar, barStyles(stat.base_stat)]} />
						</View>
					</View>
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		marginBottom: 0,
		paddingVertical: 10,
	},
	block: {
		flexDirection: 'row',
		paddingVertical: 5,
	},
	title: {
		width: '30%',
	},
	name: {
		fontSize: 12,
		color: appConfig.appColors.color,
	},
	info: {
		width: '70%',
		flexDirection: 'row',
		alignstats: 'center',
	},
	number: {
		width: '12%',
		fontSize: 12,
		color: appConfig.appColors.color,
	},
	backgroundBar: {
		backgroundColor: '#dedede',
		width: '88%',
		height: 5,
		borderRadius: 20,
		overflow: 'hidden',
	},
	bar: {
		height: 5,
		borderRadius: 20,
	},
});
