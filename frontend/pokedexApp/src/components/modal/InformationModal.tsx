import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface InformationModalProps {
	title?: string;
	text?: string;
	textBtn?: string;
	modalVisible?: any;
	setModalVisible?: any;
	bgModal?: string;
	colorText?: string;
	bgBtn?: string;
	colorTextBtn?: string;
}

export default function InformationModal(props: InformationModalProps) {
	const {
		title,
		text,
		textBtn,
		modalVisible,
		setModalVisible,
		bgModal,
		colorText,
		bgBtn,
		colorTextBtn,
	}: InformationModalProps | any = props;

	const modalViewStyle: any = { backgroundColor: bgModal, ...styles.modalView };
	const textStyle: any = { color: colorText, ...styles.text };
	const buttonStyle: any = { backgroundColor: bgBtn, ...styles.btn };
	const textBtnStyle: any = { color: colorTextBtn, ...styles.textBtn };

	return (
		<Modal animationType="fade" transparent={true} visible={modalVisible}>
			<View style={styles.centeredView}>
				<View style={modalViewStyle}>
					<Text style={{ ...textStyle, fontWeight: 'bold' }}>{title}</Text>
					<Text style={textStyle}>{text}</Text>
					<TouchableOpacity
						activeOpacity={0.6}
						style={buttonStyle}
						onPress={() => {
							setModalVisible();
						}}
					>
						<Text style={textBtnStyle}>{textBtn}</Text>
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
		marginTop: 7,
	},
	textBtn: {
		fontSize: 14,
		textAlign: 'center',
	},
});
