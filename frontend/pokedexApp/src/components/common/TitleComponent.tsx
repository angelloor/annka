import { capitalize } from 'lodash';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TitleComponent(props: any) {
	const { title } = props;

	return (
		<View style={styles.containerTitle}>
			<Text style={styles.textTitle}>{capitalize(title)}</Text>
		</View>
	);
}

const styles: any = StyleSheet.create({
	containerTitle: {
		flex: 1,
		alignItems: 'center',
		paddingVertical: 10,
	},
	textTitle: {
		color: '#1c1635',
		fontSize: 18,
		fontWeight: 'bold',
	},
});
