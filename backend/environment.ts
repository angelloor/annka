declare global {
	interface Window {
		MyNamespace: any;
	}
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: string;
			PORT: string;
			BD_PG_USER: string;
			BD_PG_HOST: string;
			BD_PG_DATABASE: string;
			BD_PG_PASSWORD: string;
			BD_PG_PORT: string;
			MAILER_HOST: string;
			MAILER_PORT: string;
			MAILER_SECURE: string;
			MAILER_USER: string;
			MAILER_PASSWORD: string;
		}
	}
}

export {};
