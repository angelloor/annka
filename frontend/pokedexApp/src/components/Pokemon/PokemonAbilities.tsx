import { capitalize, map } from 'lodash';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getAbilityDetailByUrl } from '../../api/pokemonApi';
import getColorByPokemonType from '../../utils/getColorByPokemonType';
import InformationModal from '../modal/InformationModal';

export default function PokemonAbilities(props: any) {
	const { abilities, type } = props;

	const pokemonColor = getColorByPokemonType(type);

	const [ability, setAbility] = useState('');

	/**
	 * Modal
	 */
	const [titleModal, setTitleModal] = useState('');
	const [textModal, setTextModal] = useState('');
	const [statusModal, setStatusModal] = useState(false);

	const openModal = async (abilitie: any) => {
		setTitleModal(capitalize(abilitie.ability.name));

		try {
			const response = await getAbilityDetailByUrl(abilitie.ability.url);

			const effect_entries = response.effect_entries;

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
				bgModal="#F5F5F5"
				colorText="gray"
				bgBtn={pokemonColor}
				colorTextBtn="white"
			/>
			<View style={styles.content}>
				{map(abilities, (abilitie, index) => (
					<TouchableOpacity
						key={index}
						style={{
							...styles.pill,
							backgroundColor: abilitie.is_hidden ? '#34d634' : '#d83939',
						}}
						onPress={() => {
							openModal(abilitie);
						}}
					>
						<Text style={styles.textName}>
							{capitalize(abilitie.ability.name)}
						</Text>
						<Text style={styles.text}>{abilitie.slot} Ranuras</Text>
					</TouchableOpacity>
				))}
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	content: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 10,
	},
	pill: {
		paddingHorizontal: 15,
		paddingVertical: 5,
		borderRadius: 10,
		marginHorizontal: 10,
		alignItems: 'center',
	},
	textName: {
		color: '#1c1635',
		fontWeight: 'bold',
		fontSize: 15,
	},
	text: {
		color: '#1c1635',
		fontSize: 12,
	},
});
