export interface IKnowledgeBase {
	category: string | null;
	categoryID: number | null;
	description: string;
	id: number;
	isPopular: boolean;
	tags: string | null;
	tenantId: number;
	thumbnail: string;
	title: string;
}

export const bootstrapColors = [
	'primary',
	'secondary',
	'success',
	'danger',
	'warning',
	'info',
	'light',
	'dark',
];

export const getRandomBootstrapColor = (): string => {
	const randomIndex = Math.floor(Math.random() * bootstrapColors.length);
	return bootstrapColors[randomIndex];
};
