/**
 * Configuracion de la aplicacion
 */
export const appConfig: AppConfig = {
	hostPokeapi: 'https://pokeapi.co/api/v2/',
	amountPokemonsByPage: 20,
	offsetPokemonInitial: 0,
	appColors: {
		background: '#1e293b',
		backgroundHeader: '#111827',
		color: '#fff',
	},
	welcomeTitle: '¡Bienvenido!',
	welcomeMessage:
		'¡PokeDex te da la bienvenida al maravilloso mundo de los Pokémon! Prepárate para embarcarte en una aventura épica llena de criaturas mágicas, batallas emocionantes y amistades duraderas. Explora exuberantes bosques, majestuosas montañas y océanos interminables, donde cada rincón esconde la posibilidad de descubrir nuevas especies con habilidades únicas. Conviértete en un intrépido Entrenador Pokémon y desafía a los Líderes de gimnasio para demostrar tu valía\n\nAdelante, joven Entrenador, la aventura de tu vida te espera. Sumérgete en un mundo lleno de maravillas y emociones indescriptibles. Explora, captura y sé el mejor en el maravilloso mundo de los Pokémon.',
	showWelcomeMessage: true,
	timeWelcomeMessage: 3000,
	pokemonColors: {
		normal: '#A8A878',
		fighting: '#C03028',
		flying: '#A890F0',
		poison: '#A040A0',
		ground: '#E0C068',
		rock: '#B8A038',
		bug: '#A8B820',
		ghost: '#705898',
		steel: '#B8B8D0',
		fire: '#FA6C6C',
		water: '#6890F0',
		grass: '#48CFB2',
		electric: '#FFCE4B',
		psychic: '#F85888',
		ice: '#98D8D8',
		dragon: '#7038F8',
		dark: '#705848',
		fairy: '#EE99AC',
	},
};

/**
 * Types
 */

export interface AppConfig {
	hostPokeapi: string;
	amountPokemonsByPage: number;
	offsetPokemonInitial: number;
	appColors: AppColors;
	welcomeTitle: string;
	welcomeMessage: string;
	showWelcomeMessage: boolean;
	timeWelcomeMessage: number;
	pokemonColors: PokemonColors | any;
}

interface AppColors {
	background: string;
	backgroundHeader: string;
	color: string;
}

interface PokemonColors {
	normal: string;
	fighting: string;
	flying: string;
	poison: string;
	ground: string;
	rock: string;
	bug: string;
	ghost: string;
	steel: string;
	fire: string;
	water: string;
	grass: string;
	electric: string;
	psychic: string;
	ice: string;
	dragon: string;
	dark: string;
	fairy: string;
}
