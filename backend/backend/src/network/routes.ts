import { routerPartner } from '../app/public/partner/partner.network';

export const appRoutes = (app: any) => {
	/**
	 * Public Routes
	 */
	app.use('/app/public/partner', routerPartner);
};
