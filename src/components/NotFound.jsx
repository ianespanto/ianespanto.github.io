import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

export default function NotFound() {
	gsap.registerPlugin(ScrollToPlugin);

	const navigate = useNavigate();
	const location = useLocation();

	// route guard should only run on mount for this page
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		document.title = '404 · Ian Espanto';
		gsap.set(window, { scrollTo: 0 });

		if (location.pathname !== '/404') {
			navigate('/404', { replace: true });
		}
	}, []);

	return (
		<>
			<main className="error row align-center">
				<div className="inner-wrapper">
					<section aria-labelledby="not-found-heading">
						<h1 id="not-found-heading" className="hidden">
							Page Not Found
						</h1>
						<p>Sorryyy, page not found &#x1F645;</p>
					</section>
				</div>
			</main>
		</>
	);
}
