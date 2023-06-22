import { validarCedulaRUC } from '../../src/utils/validation';

test('La cedula 1600744443 es correcta', () => {
	const result = validarCedulaRUC('1600744443');
	expect(result).toBe(true);
});
