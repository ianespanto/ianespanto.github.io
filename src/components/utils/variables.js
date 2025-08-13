import ubcLogo from '../../assets/img/logos/ubc.png';
import bcitLogo from '../../assets/img/logos/bcit.png';

export const ease = {
	power4: {
		in: [0.64, 0, 0.78, 0],
		out: [0.22, 1, 0.36, 1],
		inOut: [0.84, 0, 0.16, 1],
	},
};

export const pageTransitionVariants = {
	initial: {
		opacity: 0,
		y: 200,
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 1.5,
			ease: ease.power4.inOut,
		},
	},
	exit: {
		opacity: 0,
		y: -200,
		transition: { delay: 0.2, duration: 1.5, ease: ease.power4.inOut },
	},
};

export const langList = [
	{ id: 'en', name: 'English' },
	{ id: 'es', name: 'Español' },
	{ id: 'fr', name: 'Français' },
	{ id: 'jp', name: '日本語' },
	{ id: 'zh-TW', name: '中文' },
];

export const menuItems = [
	{
		id: 'work',
		link: '/',
	},
	{
		id: 'about',
		link: '/about',
	},
	{
		id: 'contact',
		link: '/contact',
	},
];

export const jobList = [
	{
		id: 'sfu',
	},
	{
		id: 'signals',
	},
	{
		id: 'shoes',
	},
];

export const schoolList = [
	{
		id: 'ubc',
		logo: ubcLogo,
	},
	{
		id: 'bcit',
		logo: bcitLogo,
	},
];

export const creditList = [
	{
		role: 'design',
		name: 'Ian Espanto',
	},
	{
		role: 'code',
		name: 'Ian Espanto',
	},
	{
		role: 'photos',
		name: ['Unsplash', 'Pexels'],
	},
];
