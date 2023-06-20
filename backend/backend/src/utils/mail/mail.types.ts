export interface Attachments {
	filename: string;
	path?: string;
	content?: string | Buffer;
	contentType?: string;
	cid: string;
}

export interface Mail {
	from: string;
	to: string;
	subject: string;
	html: string;
	attachments: Attachments[];
}
