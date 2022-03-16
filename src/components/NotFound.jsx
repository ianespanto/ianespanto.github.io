import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

export default function NotFound() {
	gsap.registerPlugin(ScrollToPlugin);

	const navigate = useNavigate();
	const location = useLocation();

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
					<div>
						<p>Sorryyy, page not found &#x1F645;</p>
					</div>
				</div>
			</main>
		</>
	);
}
