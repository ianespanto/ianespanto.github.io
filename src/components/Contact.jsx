import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { AnimatePresence, motion } from 'framer-motion';

export default function Contact() {
	gsap.registerPlugin(ScrollToPlugin);

	const navigate = useNavigate();
	const location = useLocation();

	const form = useRef();
	const nameRef = useRef();
	const emailRef = useRef();
	const subjectRef = useRef();
	const messageRef = useRef();

	const [message, setMessage] = useState('');
	const [success, setSuccess] = useState(false);
	const [failed, setFailed] = useState(false);

	const devMode = false; // do not actually send email

	const variants = {
		initial: {
			opacity: 0,
			y: 20,
		},
		animate: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.2 },
		},
	};

	const isValidEmailAddress = email => {
		const emailPattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/i);
		return emailPattern.test(email);
	};

	const validateField = e => {
		let hasError = false;
		const val = e.target.value.trim();

		if (!val || (e.target.name === 'email' && !isValidEmailAddress(val))) {
			hasError = true;
		}

		if (hasError) {
			e.target.classList.add('input-error');
		} else {
			e.target.classList.remove('input-error');
		}
	};

	const sendEmail = e => {
		e.preventDefault();

		let hasError = false;

		form.current.classList.add('no-action');

		[nameRef.current, emailRef.current, subjectRef.current, messageRef.current].forEach(field => {
			const val = field.value.trim();
			field.value = val;
			if (!val || (field.name === 'email' && !isValidEmailAddress(val))) {
				hasError = true;
				field.classList.add('input-error');

				const wiggle = gsap.timeline();
				const totalDuration = 0.4;
				const totalWiggles = 5;
				const wiggleX = 2;

				for (let i = 0; i < totalWiggles; i++) {
					wiggle.to(field, { duration: totalDuration / totalWiggles / 2, x: -wiggleX });
					wiggle.to(field, { duration: totalDuration / totalWiggles / 2, x: wiggleX });
				}
				wiggle.set(field, { clearProps: 'all' });
			}
		});

		if (!hasError) {
			if (!devMode) {
				emailjs.sendForm('service_qebiq6j', 'template_erhzsac', form.current, 'iayBg-ydeMU9ypk7L').then(
					result => {
						console.log(result.text);
						setSuccess(true);
						setFailed(false);
						e.target.reset();
					},
					error => {
						console.log(error.text);
						setSuccess(false);
						setFailed(true);
						form.current.classList.remove('no-action');
					}
				);
			}
		} else {
			form.current.classList.remove('no-action');
		}
	};

	useEffect(() => {
		document.title = 'Contact · Ian Espanto';
		gsap.set(window, { scrollTo: 0 });

		if (location.pathname !== '/contact') {
			navigate('/contact', { replace: true });
		}
	}, []);

	return (
		<>
			<main className="contact">
				<section>
					<div className="inner-wrapper inner-wrapper--narrow">
						<div className="hero-area column">
							<h1 className="hero-heading">Need a hand? Drop me a line!</h1>
							<div className="contact-info responsive-row responsive-row--medium">
								<div className="contact-email">
									<a
										className="link-hover link-hover--light"
										href="mailto:ianjespanto@gmail.com"
										target="_blank"
										rel="noreferrer">
										ianjespanto@gmail.com
									</a>
								</div>
							</div>
						</div>

						<div className="form-container">
							{success || (
								<form onSubmit={sendEmail} noValidate ref={form}>
									<div className="grid grid--gutters">
										<div className="grid__item">
											<div className="fg">
												<input
													type="text"
													name="name"
													id="input-name"
													placeholder="Name"
													autoComplete="off"
													ref={nameRef}
													onBlur={validateField}
												/>
												<label htmlFor="input-name" className="required">
													Name
												</label>
											</div>
										</div>
										<div className="grid__item">
											<div className="fg">
												<input
													type="email"
													name="email"
													id="input-email"
													placeholder="Email"
													autoComplete="off"
													ref={emailRef}
													onBlur={validateField}
												/>
												<label htmlFor="input-email" className="required">
													Email
												</label>
											</div>
										</div>
									</div>
									<div className="grid grid--gutters">
										<div className="grid__item">
											<div className="fg">
												<input
													type="text"
													name="subject"
													id="input-subject"
													placeholder="Subject"
													autoComplete="off"
													ref={subjectRef}
													onBlur={validateField}
												/>
												<label htmlFor="input-subject" className="required">
													Subject
												</label>
											</div>
										</div>
									</div>
									<div className="grid grid--gutters">
										<div className="grid__item">
											<div className="fg">
												<textarea
													name="message"
													id="input-message"
													placeholder="Message"
													ref={messageRef}
													onChange={e => setMessage(e.target.value)}
													onBlur={validateField}></textarea>
												<label htmlFor="input-message" className="required">
													Message
												</label>
												<span className="char-count show-portrait">
													{message?.length > 0 && message.length}
												</span>
											</div>
										</div>
									</div>
									<div className="grid grid--gutters">
										<div className="grid__item button-container">
											<button
												className="btn btn--primary btn--full"
												type="submit"
												name="action"
												value="submit">
												<span data-hover="Send Message">Send Message</span>
											</button>
										</div>
									</div>
								</form>
							)}
							{success && (
								<motion.p
									initial={'initial'}
									animate={'animate'}
									variants={variants}
									className="space-top">
									You message has been sent. I will be in touch!
								</motion.p>
							)}
							{failed && (
								<motion.p
									initial={'initial'}
									animate={'animate'}
									variants={variants}
									className="space-top">
									Oops... Something went wrong. Please try again later or use the contact information
									above.
								</motion.p>
							)}
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
