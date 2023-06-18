import fs from 'fs';
/**
 * Esta funcion permite registrar el error el servidor
 * @param error the error to generate
 */
export const logGenerate = (error: any): void => {
	const date = new Date();

	const day = date.getDate();
	const month = date.getMonth() + 1;
	const fullYear = date.getFullYear();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();

	const time = `${hours}-${minutes}-${seconds}`;

	var dirFileStore = `./file_store`;
	if (!fs.existsSync(dirFileStore)) {
		fs.mkdirSync(dirFileStore);
	}

	var dirLog = `./file_store/logs`;
	if (!fs.existsSync(dirLog)) {
		fs.mkdirSync(dirLog);
	}

	var dirComplete = `./file_store/logs/${day}-${month}-${fullYear}`;

	if (!fs.existsSync(dirComplete)) {
		fs.mkdirSync(dirComplete);
	}
	/**
	 * Escribimos el archivo con el error generado
	 */
	fs.writeFileSync(`${dirComplete}/${time}.txt`, JSON.stringify(error));
};
