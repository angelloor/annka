import { Platform, StyleSheet } from 'react-native';
import { appConfig } from '../app.config';

export const commonStyles = StyleSheet.create({
	input: {
		height: 40,
		borderWidth: 1,
		borderColor: appConfig.appColors.color,
		color: appConfig.appColors.color,
		backgroundColor: appConfig.appColors.backgroundHeader,
		padding: 10,
		borderRadius: 10,
		marginHorizontal: 10,
		marginTop: 30,
	},
	spinner: {
		marginTop: 20,
		marginBottom: Platform.OS === 'android' ? 90 : 60,
	},
});
