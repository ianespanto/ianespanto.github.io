import { useEffect } from 'react';
import { creditList, langList } from './utils/variables';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const variants = {
	initial: {
		opacity: 0,
		scale: 0.5,
		x: '-50%',
	},
	animate: {
		opacity: 1,
		scale: 1,
		x: '-50%',
		transition: { duration: 0.2 },
	},
	exit: {
		opacity: 0,
		scale: 0.5,
		x: '-50%',
		transition: { duration: 0.2 },
	},
};

export default function Footer({
	isMobileNav,
	creditTooltipOpen,
	setCreditTooltipOpen,
	langTooltipOpen,
	setLangTooltipOpen,
	lang,
	setLang,
}) {
	const { t } = useTranslation();

	return (
		<div className="inner-wrapper">
			<div className="footer-nav">
				<ul>
					<li>
						<a href="https://codepen.io/ianespanto/" target="_blank" rel="noreferrer">
							Codepen
						</a>
					</li>
					<li
						onClick={() => {
							setCreditTooltipOpen(cur => !cur);
						}}>
						<span
							className={`pointer credits-trigger tooltipTrigger${
								creditTooltipOpen ? ' active' : ''
							}`}>
							{t('credits')}
						</span>
						<AnimatePresence>
							{creditTooltipOpen && (
								<motion.div
									initial={'initial'}
									animate={'animate'}
									exit={'exit'}
									variants={variants}
									className="tooltip tooltip--credits">
									{creditList.map(({ role, name }, i) => {
										return (
											<div key={`creditItem_${i}`}>
												<span>
													<span className="underline">{t(role)}</span>:
													{typeof name === 'string' ? ` ${name}` : ''}
												</span>
												{Array.isArray(name) &&
													name.map((listItem, j) => (
														<span key={`creditItem_${i}_${j}`}>{listItem}</span>
													))}
											</div>
										);
									})}
									<span className="copyright">&copy; {new Date().getFullYear()} Ian Espanto</span>
								</motion.div>
							)}
						</AnimatePresence>
					</li>
					<li
						onClick={() => {
							setLangTooltipOpen(cur => !cur);
						}}>
						<span className={`pointer lang-trigger tooltipTrigger${langTooltipOpen ? ' active' : ''}`}>
							{langList.find(({ id }) => id === lang).name}
						</span>
						<AnimatePresence>
							{langTooltipOpen && (
								<motion.div
									initial={'initial'}
									animate={'animate'}
									exit={'exit'}
									variants={variants}
									className="tooltip tooltip--lang">
									{langList.map(({ id, name }, i) => {
										return (
											<div
												className={id}
												key={`langListItem_${i}`}
												className={`langOption ${id}${lang === id ? ' current' : ''}`}
												onClick={() => setLang(id)}>
												<span>{name}</span>
											</div>
										);
									})}
								</motion.div>
							)}
						</AnimatePresence>
					</li>
				</ul>
			</div>
		</div>
	);
}
