import { logGenerate } from '../utils/log';
import { _errorMessages, _successMessages } from '../utils/message/message';
import { MessageAPI } from '../utils/message/message.type';

export const success = (res: any, body: any) => {
	res.status(_successMessages[1].status || 200).send({
		..._successMessages[1],
		body,
	});
};

export const error = async (res: any, message: MessageAPI) => {
	if (message.status) {
		res.status(message.status || 500).send(message);
	} else {
		res.status(500).send({
			..._errorMessages[1],
			description: _errorMessages[1].description.replace(
				'ExCePcIoN',
				`${message}`
			),
		});
	}
	/**
	 * Generate log message
	 */
	logGenerate(message);
};
