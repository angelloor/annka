import multer from 'multer';

const _storageCSV = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './');
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '.csv');
		0;
	},
});

export const uploadCSV = multer({ storage: _storageCSV });
