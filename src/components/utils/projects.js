import flexstatsImg from '../../assets/img/projects/flexstats.jpg';
import clearseasImg1 from '../../assets/img/projects/clearseas1.jpg';
import clearseasImg2 from '../../assets/img/projects/clearseas2.jpg';
import bcnuImg from '../../assets/img/projects/bcnu.jpg';
import foundryImg from '../../assets/img/projects/foundry.jpg';
import gbfImg from '../../assets/img/projects/gbf.jpg';
import youthServiceFinderImg from '../../assets/img/projects/youth-service-finder.jpg';
import asherImg from '../../assets/img/projects/asher.jpg';
import laImg from '../../assets/img/projects/la.jpg';
import goonerImg from '../../assets/img/projects/gooner.jpg';
import blackjackImg from '../../assets/img/projects/blackjack.jpg';

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
		description: 'A full Wordpress theme built for a private foundation with various custom components.',
		footnote: 'Wordpress Theme',
		tooltip: 'Visit Site',
	},
	{
		link: 'https://annualreport.bcnu.org/report/2017/',
		id: 'bcnu',
		color: '#e8e8ea',
		img: bcnuImg,
		title: 'BCNU Annual Report',
		description: "A brochure site built for BC Nurses' Union using a Wordpress theme written from scratch.",
		footnote: 'Brochure Site',
		tooltip: 'Visit Site',
	},
	{
		link: 'https://clearseas.org/en/underwater-noise/',
		id: 'underwater-noise',
		color: '#c5e4ef',
		img: clearseasImg2,
		title: 'Underwater Noise',
		description:
			'One of the six bilingual microsites I have built for Clear Seas with custom Wordpress themes.',
		footnote: 'Wordpress Microsite',
		tooltip: 'Visit Site',
	},
	{
		link: 'https://ianespanto.000webhostapp.com/archive/asher/',
		id: 'asher',
		color: '#e9dac7',
		img: asherImg,
		title: 'Asher Eyewear',
		description:
			'A five-page e-commerce demo site with some basic hover and scroll effects. School project.',
		footnote: 'E-commerce Template',
		tooltip: 'View Project',
	},
	{
		link: 'https://ianespanto.000webhostapp.com/archive/la/',
		id: 'la',
		color: '#dfdcd7',
		img: laImg,
		title: 'Los Angeles',
		description:
			'A single-page responsive site that showcases some simple user interactions. School Project.',
		footnote: 'School Project',
		tooltip: 'View Project',
	},
	{
		link: 'https://ianespanto.000webhostapp.com/archive/goonerblog/',
		id: 'gooner',
		color: '#d7d7d7',
		img: goonerImg,
		title: 'Gooner Blog',
		description:
			'A single-page blog/news demo site that changes from columns to tabs on mobile. School Project.',
		footnote: 'News Site Template',
		tooltip: 'View Project',
	},
	{
		link: 'https://ianespanto.000webhostapp.com/archive/blackjack/',
		id: 'blackjack',
		color: '#e8e8e8',
		img: blackjackImg,
		title: 'Blackjack',
		description: 'A web game written in jQuery utilizing classes and animation libraries. School project.',
		footnote: 'JavaScript Game',
		tooltip: 'Play Game',
	},
];
