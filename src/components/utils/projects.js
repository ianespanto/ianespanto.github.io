import porterImg from '../../assets/img/projects/porter.jpg';
import flexstatsImg from '../../assets/img/projects/flexstats1.jpg';
import clearseasImg from '../../assets/img/projects/clearseas.jpg';
import clearseasImg1 from '../../assets/img/projects/la2.jpg';
import echoeduImg from '../../assets/img/projects/echoedu.jpg';
import tspImg from '../../assets/img/projects/tsp.jpg';
import laImg from '../../assets/img/projects/la.jpg';
import foundryImg from '../../assets/img/projects/foundry.jpg';
import gbfImg from '../../assets/img/projects/tsp.jpg';
import youthServiceFinderImg from '../../assets/img/projects/youth-service-finder.jpg';
import asherImg from '../../assets/img/projects/asher.jpg';
import goonerImg from '../../assets/img/projects/gooner.jpg';

export const projects = [
	{
		link: 'https://flexstats.netlify.app',
		id: 'flexstats',
		color: '#d6eae8',
		img: flexstatsImg,
		title: 'Flexstats',
		description:
			'An ETH mining pool React app built from scratch that utilizes APIs to display dynamic data.',
		footnote: 'React Application',
		tooltip: 'Open Application',
	},
	{
		link: 'https://clearseas.org/en/who-pays-oil-spill/',
		id: 'clearseas-oil-spills',
		color: '#bed8d8',
		img: clearseasImg1,
		title: 'Clear Seas',
		description:
			'One of the six bilingual microsites I have built for Clear Seas with custom Wordpress themes.',
		footnote: 'Wordpress Microsite',
		tooltip: 'Visit Site',
	},
	{
		link: 'https://foundrybc.ca/',
		id: 'foundry',
		color: '#f8efe0',
		img: foundryImg,
		title: 'Foundry BC',
		description:
			'A large-scale Wordpress site that helps youth and young adults of BC find services and help they need.',
		footnote: 'Complex Wordpress Site',
		tooltip: 'Visit Site',
	},
	{
		id: 'about',
	},
	{
		link: 'https://foundrybc.ca/get-support/find-community-services/',
		id: 'youth-service-finder',
		color: '#d0deea',
		img: youthServiceFinderImg,
		title: 'Youth Service Finder',
		description:
			'A Foundry app that groups data and allows users to search and filter services fetched from an API.',
		footnote: 'Location Search App',
		tooltip: 'Open Application',
	},
	{
		link: 'https://grahamboeckhfoundation.org/',
		id: 'gbf',
		color: '#dfeef4',
		img: gbfImg,
		title: 'Graham Boeckh Foundation',
		description: 'A full Wordpress theme built for a private foundation with various custom components',
		footnote: 'Wordpress Theme',
		tooltip: 'Visit Site',
	},
	{
		link: 'https://annualreport.bcnu.org/report/2017/',
		id: 'bcnu',
		color: '#e8e8ea',
		img: echoeduImg,
		title: 'BCNU Annual Report',
		description: "A brochure site built for BC Nurses' Union using a Wordpress theme written from scratch.",
		footnote: 'Brochure Site',
		tooltip: 'Visit Site',
	},
	{
		link: 'https://clearseas.org/en/underwater-noise/',
		id: 'underwater-noise',
		color: '#c5e4ef',
		img: clearseasImg,
		title: 'Underwater Noise',
		description:
			'One of the six bilingual microsites I have built for Clear Seas with custom Wordpress themes.',
		footnote: 'Wordpress Microsite',
		tooltip: 'Visit Site',
	},
	{
		link: 'http://iane.atwebpages.com/archive/asher/',
		id: 'asher',
		color: '#e9dac7',
		img: asherImg,
		title: 'Asher Eyewear',
		description:
			'A five-page e-commerce demo site with some basic hover and scroll effects. School project.',
		footnote: 'School Project',
		tooltip: 'View Project',
	},
	{
		link: 'http://iane.atwebpages.com/archive/la/',
		id: 'la',
		color: '#dfdcd7',
		img: laImg,
		title: 'Los Angeles',
		description:
			'A single-page responsive site that showcases some simple user interactions. School Project.',
		footnote: 'School Project',
		tooltip: 'View Project',
	},
];
