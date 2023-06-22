import { capitalize } from 'lodash';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { appConfig } from '../../app.config';

export default function TitleComponent(props: any) {
	const { title } = props;

	return (
		<View style={styles.container}>
			<Text style={styles.text}>{capitalize(title)}</Text>
		</View>
	);
}

const styles: any = StyleSheet.create({
	container: {
		alignItems: 'center',
		paddingVertical: 10,
	},
	text: {
		color: appConfig.appColors.color,
		fontSize: 18,
		fontWeight: 'bold',
	},
});
