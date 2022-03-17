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

export const skillLists = [
	{
		title: 'Programming Languages',
		icon: 'bag',
		icon_paths: 19,
		list: ['JavaScript / ES6', 'React JSX', 'HTML5', 'CSS / SCSS', 'PHP'],
	},
	{
		title: 'Professional Skillset',
		icon: 'bulb',
		icon_paths: 15,
		list: ['React.js (latest)', 'CMS / Wordpress', 'SPA Development', 'GSAP Animation', 'SQL Database'],
	},
	{
		title: 'Development Tools',
		icon: 'gear',
		icon_paths: 17,
		list: ['Adobe Photoshop', 'Sublime Text', 'Git', 'Node.js / NPM', 'Gulp.js'],
	},
];

export const jobList = [
	{
		company: 'Signals Design',
		role: 'Interactive Web Developer',
		time: 'July 2017 - July 2020',
		description:
			"Worked on a wide range of projects with clients from businesses and organizations such as UBC, Clearseas, Foundry BC, BC Nurses' Union, Crofton House School, MYM Nutraceuticals, Graham Boeckh Foundation and so on. Integrated various APIs to develop a custom internal team and project management tool that was extensively used by managers and accountants of the company.",
		footnote: 'Vancouver based design agency',
	},
	{
		company: 'Shoes.com',
		role: 'Front-end Developer',
		time: 'November 2015 - August 2016',
		description:
			"Collaborated with designers, project managers, marketing strategists, and other developers to create new UI functionalities and produce responsive webpages for company's e-commerce sites in various development environments. Subscribed to modern workflows including automation via grunt and gulp, version control via Git, and A/B testing via Maxymiser.",
		footnote: 'Vancouver & Seattle based e-commerce company',
	},
];

export const schoolList = [
	{
		name: 'University of British Columbia',
		short: 'UBC',
		degree: 'Bachelor of Science, Computer Science and Statistics',
		degree_short: 'BSc. Computer Science and Statistics',
		grad: 'Vancouver BC, May 2015',
	},
	{
		name: 'British Columbia Institute of Technology',
		short: 'BCIT',
		degree: 'Certificate, Front-end Developer with Distinction',
		degree_short: 'Front-end Developer w/ Distinction',
		grad: 'Vancouver BC, October 2015',
	},
];

export const creditList = [
	{
		role: 'Design',
		name: 'Ian Espanto',
	},
	{
		role: 'Code',
		name: 'Ian Espanto',
	},
	{
		role: 'Photos',
		name: ['Unsplash', 'Pexels'],
	},
];
