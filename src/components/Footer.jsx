import { useEffect } from 'react';
import { creditList } from './utils/variables';
import { AnimatePresence, motion } from 'framer-motion';

export default function Footer({ isMobileNav, creditTooltipOpen, setCreditTooltipOpen }) {
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
						className="credits"
						onClick={() => {
							setCreditTooltipOpen(cur => !cur);
						}}>
						<span className="pointer credits-trigger">Credits</span>
						<AnimatePresence>
							{creditTooltipOpen && (
								<motion.div
									initial={{ opacity: 0, scale: 0.5, x: '-50%' }}
									animate={{ opacity: 1, scale: 1, x: '-50%', transition: { duration: 0.2 } }}
									exit={{ opacity: 0, scale: 0.5, x: '-50%', transition: { duration: 0.2 } }}
									className={`tooltip tooltip--${isMobileNav ? 'mn' : 'main'}`}>
									{creditList.map(({ role, name }, i) => {
										return (
											<div key={`creditItem_${i}`}>
												<span>
													<span className="underline">{role}</span>:
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
				</ul>
			</div>
		</div>
	);
}
