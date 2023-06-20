import { suma } from '../../src/app/public/suma';

test('Suma 1 + 2 es igual a 3', () => {
	const result = suma(1, 2);
	expect(result).toBe(3);
});
