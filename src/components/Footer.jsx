import { creditList, langList } from './utils/variables';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import useTooltipControls from './utils/useTooltipControls';

const variants = {
	initial: {
		opacity: 0,
		scale: 0.5,
		x: '-50%',
		pointerEvents: 'none',
	},
	animate: {
		opacity: 1,
		scale: 1,
		x: '-50%',
		transition: { duration: 0.2 },
		transitionEnd: {
			pointerEvents: 'auto',
		},
	},
	exit: {
		opacity: 0,
		scale: 0.5,
		x: '-50%',
		pointerEvents: 'none',
		transition: { duration: 0.2 },
	},
};

export default function Footer({ isMobileNav, activeTooltip, setActiveTooltip, lang, setLang }) {
	const { t } = useTranslation();
	const { handleGroupBlur, handleTooltipSelection, handleTriggerFocus, isTooltipOpen, setTooltipRef, toggleTooltip } =
		useTooltipControls({
		activeTooltip,
		setActiveTooltip,
		tooltipNames: ['links', 'credit', 'lang'],
		});

	const tooltipItems = [
		{
			name: 'links',
			label: t('links'),
			id: 'footer-links-tooltip',
			panelClassName: 'tooltip tooltip--links',
			triggerClassName: 'pointer links-trigger tooltipTrigger',
			content: (
				<>
					<div>
						<a href="https://codepen.io/ianespanto" target="_blank" rel="noreferrer">
							Codepen
						</a>
					</div>
					<div>
						<a href="https://github.com/ianespanto" target="_blank" rel="noreferrer">
							Github
						</a>
					</div>
					<div>
						<a href="https://wellfound.com/u/ianespanto" target="_blank" rel="noreferrer">
							Wellfound
						</a>
					</div>
					<div>
						<a href="https://soundcloud.com/ianespanto" target="_blank" rel="noreferrer">
							SoundCloud
						</a>
					</div>
				</>
			),
		},
		{
			name: 'credit',
			label: t('credit'),
			id: 'footer-credit-tooltip',
			panelClassName: 'tooltip tooltip--credit',
			triggerClassName: 'pointer credit-trigger tooltipTrigger',
			content: creditList.map(({ role, name }, i) => {
				return (
					<div key={`creditItem_${i}`}>
						<span>
							<span className="underline">{t(role)}</span>:{typeof name === 'string' ? ` ${name}` : ''}
						</span>
						{Array.isArray(name) &&
							name.map((listItem, j) => <span key={`creditItem_${i}_${j}`}>{listItem}</span>)}
					</div>
				);
			}),
		},
		{
			name: 'lang',
			label: langList.find(({ id }) => id === lang).name,
			id: 'footer-lang-tooltip',
			panelClassName: 'tooltip tooltip--lang',
			triggerClassName: 'pointer lang-trigger tooltipTrigger',
			content: langList.map(({ id, name }, i) => {
				return (
					<button
						key={`langListItem_${i}`}
						type="button"
						className={`langOption ${id}${lang === id ? ' current' : ''}`}
						onClick={() => setLang(id)}
					>
						<span>{name}</span>
					</button>
				);
			}),
		},
	];

	return (
		<div className="inner-wrapper">
			<nav className="footer-nav" aria-label={isMobileNav ? 'Mobile footer' : 'Footer'}>
				<div className="copyright">
					<span>{t('copyright_line', { year: new Date().getFullYear() })}</span>
				</div>
				<ul>
					{tooltipItems.map(({ name, label, id, panelClassName, triggerClassName, content }) => (
						<li key={name} ref={setTooltipRef(name, 'group')} onBlur={e => handleGroupBlur(name, e)}>
							<button
								ref={setTooltipRef(name, 'trigger')}
								type="button"
								aria-expanded={isTooltipOpen(name)}
								aria-haspopup="true"
								aria-controls={id}
								onClick={() => toggleTooltip(name)}
								onFocus={() => handleTriggerFocus(name)}
								className={`${triggerClassName}${isTooltipOpen(name) ? ' active' : ''}`}
							>
								{label}
							</button>
							<AnimatePresence>
								{isTooltipOpen(name) && (
									<motion.div
										id={id}
										initial={'initial'}
										animate={'animate'}
										exit={'exit'}
										variants={variants}
										className={panelClassName}
										onClickCapture={e => handleTooltipSelection(name, e)}
									>
										{content}
									</motion.div>
								)}
							</AnimatePresence>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
}
