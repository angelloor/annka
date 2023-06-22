import React from 'react';
import {
	Image,
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { appConfig } from '../../../app.config';

export default function WelcomeModal(props: any) {
	const {
		title,
		text,
		btnText,
		modalVisible,
		setModalVisible,
		bgModal,
		colorText,
		bgBtn,
		colorTextBtn,
	}: any | any = props;

	const modalViewStyle: any = {
		backgroundColor: bgModal ? bgModal : appConfig.appColors.background,
		...styles.modalView,
	};
	const textStyle: any = { color: colorText, ...styles.text };
	const buttonStyle: any = { backgroundColor: bgBtn, ...styles.btn };
	const textBtnStyle: any = { color: colorTextBtn, ...styles.btnText };

	return (
		<Modal animationType="fade" transparent={true} visible={modalVisible}>
			<View style={styles.centeredView}>
				<View style={modalViewStyle}>
					<Image
						source={require('../../../assets/img/logo.png')}
						style={styles.img}
					/>
					<Text style={textStyle}>{text}</Text>
					<TouchableOpacity
						activeOpacity={0.6}
						style={buttonStyle}
						onPress={() => {
							setModalVisible();
						}}
					>
						<Text style={textBtnStyle}>{btnText}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		width: '90%',
		margin: 20,
		borderRadius: 10,
		padding: 35,
		alignItems: 'center',
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	img: {
		width: 192,
		height: 34,
		alignSelf: 'center',
		marginVertical: 10,
	},
	text: {
		fontSize: 15,
		textAlign: 'justify',
		marginTop: 5,
	},
	btn: {
		width: '50%',
		borderRadius: 10,
		padding: 10,
		elevation: 2,
	},
	btnText: {
		fontSize: 14,
		textAlign: 'center',
	},
});
