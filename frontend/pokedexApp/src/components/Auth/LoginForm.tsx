import { useFormik } from 'formik';
import React from 'react';
import {
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import * as Yup from 'yup';
import { appConfig } from '../../app.config';
import { commonStyles } from '../../styles/common';
import TitleComponent from '../Common/TitleComponent';

export default function LoginForm() {
	/**
	 * Armamos el formulario con formik, para validar los campos y enviar los datos
	 */
	const formik: any = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object(validationSchema()),
		validateOnChange: false,
		onSubmit: (formValue) => {
			const { username, password } = formValue;
		},
	});

	return (
		<View style={styles.container}>
			<Image source={require('../../assets/img/logo.png')} style={styles.img} />
			<TitleComponent title="Iniciar sesión" />
			<TextInput
				placeholder="Nombre de usuario"
				placeholderTextColor={appConfig.appColors.color}
				style={{ ...commonStyles.input, marginTop: 20 }}
				autoCapitalize="none"
				value={formik.values.username}
				onChangeText={(text) => formik.setFieldValue('username', text)}
			/>
			<TextInput
				placeholder="Contraseña"
				placeholderTextColor={appConfig.appColors.color}
				style={commonStyles.input}
				autoCapitalize="none"
				secureTextEntry={true}
				value={formik.values.password}
				onChangeText={(text) => formik.setFieldValue('password', text)}
			/>
			<TouchableOpacity
				activeOpacity={0.6}
				style={styles.btn}
				onPress={formik.handleSubmit}
			>
				<Text style={styles.btnText}>Ingresar</Text>
			</TouchableOpacity>

			{!formik.isValid ? (
				<View style={styles.containerError}>
					{formik.errors.username ? (
						<Text style={styles.error}>{formik.errors.username}</Text>
					) : null}
					{formik.errors.password ? (
						<Text style={styles.error}>{formik.errors.password}</Text>
					) : null}
				</View>
			) : null}
		</View>
	);
}

function initialValues() {
	return {
		username: '',
		password: '',
	};
}

function validationSchema() {
	return {
		username: Yup.string().required('Usuario requerido'),
		password: Yup.string().required('Contraseña requerida'),
	};
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		width: '100%',
	},
	img: { width: 288, height: 53, alignSelf: 'center', marginVertical: 10 },
	btn: {
		width: '30%',
		backgroundColor: appConfig.appColors.backgroundHeader,
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 10,
		marginVertical: 10,
		alignSelf: 'center',
		marginTop: 20,
	},
	btnText: {
		color: appConfig.appColors.color,
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	containerError: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#dc2626',
		borderColor: 'white',
		borderWidth: 0.5,
		borderRadius: 10,
	},
	error: {
		textAlign: 'center',
		color: '#ffe9d0',
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
});
