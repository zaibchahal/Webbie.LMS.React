import axios from 'axios';

export const userAuth = async () => {
	const resp = await axios
		.post(
			'https://stupefied-proskuriakova.69-10-42-234.plesk.page/api/services/app/Account/IsTenantAvailable',
			'aims',
		)
		.then((res) => {
			return res.data;
		});
};
