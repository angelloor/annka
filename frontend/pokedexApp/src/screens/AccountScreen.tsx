import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { appConfig } from '../app.config';
import LoginForm from '../components/Auth/LoginForm';
import WelcomeModal from '../components/Common/Modal/WelcomeModal';

export default function AccountScreen() {
	useEffect(() => {
		(() => {
			if (appConfig.showWelcomeMessage) {
				setTimeout(() => {
					openModalWelcome();
				}, appConfig.timeWelcomeMessage);
			}
		})();
	}, []);

	/**
	 * Modal
	 */
	const [statusModal, setStatusModal] = useState(false);

	const openModalWelcome = async () => {
		setStatusModal(true);
	};

	const closeModal = () => {
		setStatusModal(false);
	};

	/**
	 * Modal
	 */

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar hidden={true} />
			<WelcomeModal
				title={appConfig.welcomeTitle}
				text={appConfig.welcomeMessage}
				btnText="Iniciar aventura!"
				modalVisible={statusModal}
				setModalVisible={closeModal}
				bgModal={appConfig.appColors.backgroundHeader}
				colorText={appConfig.appColors.color}
				bgBtn={'red'}
				colorTextBtn={appConfig.appColors.color}
			/>

			<LoginForm />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: appConfig.appColors.background,
		paddingHorizontal: 20,
	},
});
