import sfuImg from '../../assets/img/projects/sfu.jpg';
import clearseasImg1 from '../../assets/img/projects/clearseas1.jpg';
import clearseasImg2 from '../../assets/img/projects/clearseas2.jpg';
import bcnuImg from '../../assets/img/projects/bcnu.jpg';
import foundryImg from '../../assets/img/projects/foundry.jpg';
import gbfImg from '../../assets/img/projects/gbf.jpg';
import ubcPathwaysImg from '../../assets/img/projects/ubc-pathways.jpg';

export const projects = [
	{
		link: 'https://www.sfu.ca/',
		id: 'sfu',
		color: 'var(--color-project-sfu)',
		img: sfuImg,
		tooltip: 'visit_site',
	},
	{
		link: 'https://foundrybc.ca/',
		id: 'foundry',
		color: 'var(--color-project-foundry)',
		img: foundryImg,
		tooltip: 'visit_site',
	},
	{
		link: 'https://clearseas.org/en/who-pays-oil-spill/',
		id: 'clearseas-oil-spills',
		color: 'var(--color-project-clearseas-oil-spills)',
		img: clearseasImg1,
		tooltip: 'visit_site',
	},
	{
		id: 'about',
	},
	{
		link: 'https://pathways.med.ubc.ca/issue-1/',
		id: 'ubc-med-pathways',
		color: 'var(--color-project-ubc-med-pathways)',
		img: ubcPathwaysImg,
		tooltip: 'visit_site',
	},
	{
		link: 'https://grahamboeckhfoundation.org/',
		id: 'gbf',
		color: 'var(--color-project-gbf)',
		img: gbfImg,
		tooltip: 'visit_site',
	},
	{
		link: 'https://annualreport.bcnu.org/previous/report/2017/',
		id: 'bcnu',
		color: 'var(--color-project-bcnu)',
		img: bcnuImg,
		tooltip: 'visit_site',
	},
	{
		link: 'https://clearseas.org/en/underwater-noise/',
		id: 'underwater-noise',
		color: 'var(--color-project-underwater-noise)',
		img: clearseasImg2,
		tooltip: 'visit_site',
	},
];
