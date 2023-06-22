import { capitalize, map } from 'lodash';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getAbilityDetailByUrl } from '../../APIs/pokemonAPI';
import { renderClosePokeball } from '../../Icons/Pokedex';
import { appConfig } from '../../app.config';
import { getColorByPokemonType } from '../../utils/others';
import InformationModal from '../Common/Modal/InformationModal';

export default function PokemonAbilities(props: any) {
	const { abilities, type } = props;

	// obtener el color de acuerdo al tipo de pokemon
	const pokemonColor = getColorByPokemonType(type);
	/**
	 * Modal
	 */
	const [titleModal, setTitleModal] = useState('');
	const [textModal, setTextModal] = useState('');
	const [statusModal, setStatusModal] = useState(false);

	/**
	 * Abrir modal para mostrar el short_effect de la habilidad
	 * @param ability abilidad
	 */
	const openModal = async (ability: any) => {
		setTitleModal(capitalize(ability.ability.name));

		try {
			const abilityDetail = await getAbilityDetailByUrl(ability.ability.url);

			const { effect_entries } = abilityDetail;
			// obtener el short_effect en ingles (otra opcion 'de')
			const short_effect = effect_entries.find(
				(item: any) => item.language.name === 'en'
			).short_effect;

			setTextModal(short_effect);
		} catch (error) {
			closeModal();
		}

		setStatusModal(true);
	};

	const closeModal = () => {
		setTextModal('');
		setStatusModal(false);
	};

	/**
	 * Modal
	 */

	return (
		<>
			<InformationModal
				title={titleModal}
				text={textModal}
				textBtn="OK"
				modalVisible={statusModal}
				setModalVisible={closeModal}
				bgModal={appConfig.appColors.backgroundHeader}
				colorText={appConfig.appColors.color}
				bgBtn={pokemonColor}
				colorTextBtn={appConfig.appColors.color}
			/>
			<View style={styles.container}>
				{map(abilities, (ability, index) => (
					<TouchableOpacity
						key={index}
						onPress={() => {
							openModal(ability);
						}}
					>
						<View
							style={{
								...styles.ability,
								backgroundColor: appConfig.appColors.backgroundHeader,
							}}
						>
							<View
								style={{
									...styles.statusBar,
									backgroundColor: ability.is_hidden ? '#34d634' : '#d83939',
								}}
							></View>
							<Text style={styles.text}>
								{capitalize(ability.ability.name)}
							</Text>
							<View style={styles.containerPokeball}>
								{Array.from({ length: ability.slot }, (item: any, index) => (
									<View style={styles.containerImg} key={index}>
										{renderClosePokeball(20, 20, 0)}
									</View>
								))}
							</View>
						</View>
					</TouchableOpacity>
				))}
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 10,
	},
	ability: {
		marginHorizontal: 10,
		alignItems: 'center',
		borderTopStartRadius: 5,
		borderTopEndRadius: 5,
		borderBottomEndRadius: 10,
		borderBottomStartRadius: 10,
	},
	statusBar: {
		width: '100%',
		height: 5,
		borderTopStartRadius: 10,
		borderTopEndRadius: 10,
	},
	text: {
		color: appConfig.appColors.color,
		fontWeight: '300',
		paddingVertical: 5,
		fontSize: 14,
		paddingHorizontal: 15,
	},
	containerPokeball: {
		flex: 1,
		flexDirection: 'row',
		paddingBottom: 5,
		paddingHorizontal: 5,
	},
	containerImg: {
		padding: 2,
	},
});
