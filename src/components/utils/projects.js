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
		tooltip: 'open_application',
	},
	{
		link: 'https://clearseas.org/en/who-pays-oil-spill/',
		id: 'clearseas-oil-spills',
		color: '#bed8d8',
		img: clearseasImg1,
		tooltip: 'visit_site',
	},
	{
		link: 'https://foundrybc.ca/',
		id: 'foundry',
		color: '#f8efe0',
		img: foundryImg,
		tooltip: 'visit_site',
	},
	{
		id: 'about',
	},
	{
		link: 'https://foundrybc.ca/get-support/find-community-services/',
		id: 'youth-service-finder',
		color: '#d0deea',
		img: youthServiceFinderImg,
		tooltip: 'open_application',
	},
	{
		link: 'https://grahamboeckhfoundation.org/',
		id: 'gbf',
		color: '#dfeef4',
		img: gbfImg,
		tooltip: 'visit_site',
	},
	{
		link: 'https://annualreport.bcnu.org/report/2017/',
		id: 'bcnu',
		color: '#e8e8ea',
		img: bcnuImg,
		tooltip: 'visit_site',
	},
	{
		link: 'https://clearseas.org/en/underwater-noise/',
		id: 'underwater-noise',
		color: '#c5e4ef',
		img: clearseasImg2,
		tooltip: 'visit_site',
	},
	{
		link: 'https://ianespanto.000webhostapp.com/archive/asher/',
		id: 'asher',
		color: '#e9dac7',
		img: asherImg,
		tooltip: 'view_project',
	},
	{
		link: 'https://ianespanto.000webhostapp.com/archive/la/',
		id: 'la',
		color: '#dfdcd7',
		img: laImg,
		tooltip: 'view_project',
	},
	{
		link: 'https://ianespanto.000webhostapp.com/archive/goonerblog/',
		id: 'gooner',
		color: '#d7d7d7',
		img: goonerImg,
		tooltip: 'view_project',
	},
	{
		link: 'https://ianespanto.000webhostapp.com/archive/blackjack/',
		id: 'blackjack',
		color: '#e8e8e8',
		img: blackjackImg,
		tooltip: 'play_game',
	},
];
