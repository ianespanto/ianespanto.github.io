import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Contact() {
	gsap.registerPlugin(ScrollToPlugin);
	const { t } = useTranslation();

	const navigate = useNavigate();
	const location = useLocation();

	const fadeInElms = useRef([]);
	const form = useRef();
	const nameRef = useRef();
	const emailRef = useRef();
	const subjectRef = useRef();
	const messageRef = useRef();

	const [message, setMessage] = useState('');
	const [success, setSuccess] = useState(false);
	const [failed, setFailed] = useState(false);
	const [sending, setSending] = useState(false);

	const devMode = false; // do not actually send email
	const minCharCount = 100;
	const maxCharCount = 1000;

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

		if (
			!val ||
			(e.target.name === 'email' && !isValidEmailAddress(val)) ||
			(e.target.name === 'message' && (message?.length < minCharCount || message?.length > maxCharCount))
		) {
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

		// only process send request if no send request is already currently in progress
		if (!sending) {
			let hasError = false;

			[nameRef.current, emailRef.current, subjectRef.current, messageRef.current].forEach(field => {
				const val = field.value.trim();
				field.value = val;
				if (
					!val ||
					(field.name === 'email' && !isValidEmailAddress(val)) ||
					(field.name === 'message' &&
						(message?.length < minCharCount || message?.length > maxCharCount))
				) {
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
				setSending(true);
				if (!devMode) {
					emailjs
						.sendForm('service_qebiq6j', 'template_erhzsac', form.current, 'iayBg-ydeMU9ypk7L')
						.then(
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
								setSending(false);
							}
						);
				}
			}
		}
	};

	useEffect(() => {
		// second layer of security measure, disable form when a send request is in progress
		sending ? form.current.classList.add('no-action') : form.current.classList.remove('no-action');
	}, [sending]);

	useEffect(() => {
		document.title = 'Contact · Ian Espanto';
		gsap.set(window, { scrollTo: 0 });

		if (location.pathname !== '/contact') {
			navigate('/contact', { replace: true });
		}

		if (fadeInElms?.current?.length > 0) {
			gsap.from(fadeInElms.current, {
				delay: 0.4,
				duration: 1,
				ease: 'power4.inOut',
				y: 50,
				alpha: 0,
				stagger: 0.1,
			});
		}
	}, []);

	return (
		<>
			<main className="contact">
				<section>
					<div className="inner-wrapper inner-wrapper--narrow">
						<div className="hero-area">
							<h1 className="hero-heading" ref={elm => (fadeInElms.current[0] = elm)}>
								<span>{t('need_help.part1')}</span>
								<span>{t('need_help.part2')}</span>
							</h1>
							<div className="contact-info responsive-row responsive-row--medium">
								<div className="contact-email" ref={elm => (fadeInElms.current[1] = elm)}>
									<a
										className="link-hover link-hover--light"
										href="mailto:ianjespanto@gmail.com"
										target="_blank"
										rel="noreferrer">
										ianjespanto@gmail.com
									</a>
								</div>
								<div className="" ref={elm => (fadeInElms.current[2] = elm)}>
									<a className="link-hover link-hover--light" href="/resume.pdf" download>
										{t('download_resume')}
									</a>
								</div>
							</div>
						</div>
						<div className="form-container" ref={elm => (fadeInElms.current[3] = elm)}>
							{success || (
								<form onSubmit={sendEmail} noValidate ref={form}>
									<div className="grid grid--gutters">
										<div className="grid__item">
											<div className="fg">
												<input
													type="text"
													name="name"
													id="input-name"
													placeholder={t('form.name')}
													autoComplete="off"
													ref={nameRef}
													onBlur={validateField}
												/>
												<label htmlFor="input-name" className="required">
													{t('form.name')}
												</label>
											</div>
										</div>
										<div className="grid__item">
											<div className="fg">
												<input
													type="email"
													name="email"
													id="input-email"
													placeholder={t('form.email')}
													autoComplete="off"
													ref={emailRef}
													onBlur={validateField}
												/>
												<label htmlFor="input-email" className="required">
													{t('form.email')}
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
													placeholder={t('form.subject')}
													autoComplete="off"
													ref={subjectRef}
													onBlur={validateField}
												/>
												<label htmlFor="input-subject" className="required">
													{t('form.subject')}
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
													placeholder={t('form.message')}
													ref={messageRef}
													onChange={e => setMessage(e.target.value)}
													onBlur={validateField}></textarea>
												<label htmlFor="input-message" className="required">
													{t('form.message')}
												</label>
												<AnimatePresence>
													{message?.length > 0 && (
														<motion.span
															initial={{ opacity: 0, x: 5 }}
															animate={{ opacity: 1, x: 0 }}
															exit={{ opacity: 0, x: 5 }}
															transition={{ duration: 0.15 }}
															className="char-count">
															{message.length}
															{message?.length < minCharCount && (
																<span>
																	{' '}
																	/ {t('form.min')} {minCharCount}
																</span>
															)}
															{message?.length > maxCharCount && (
																<span>
																	{' '}
																	/ {t('form.max')} {maxCharCount}
																</span>
															)}
														</motion.span>
													)}
												</AnimatePresence>
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
												<span data-hover={t('form.submit')}>{t('form.submit')}</span>
											</button>

											{sending && <span className="sending-span">{t('form.sending')}</span>}
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
									{t('form.sent')}
								</motion.p>
							)}
							{failed && (
								<motion.p
									initial={'initial'}
									animate={'animate'}
									variants={variants}
									className="space-top">
									{t('form.failed')}
								</motion.p>
							)}
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
