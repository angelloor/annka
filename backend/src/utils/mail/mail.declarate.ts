import { Partner } from '../../app/public/partner/partner.class';

export const defaultMail = () => {
	const html: string = `<h1>Hola mundo!</h1>`;
	return html;
};

export const WelcomeMessage = (partner: Partner) => {
	const html: string = `
	<div>
		<strong>Estimado(a) ${partner.name_partner}</strong>
		<br>
		<p>Bienvenido a <strong>ANNKA</strong></p>
	 	<strong>Saludos Cordiales.</strong>
	 	<br>
	</div>`;
	return html;
};
