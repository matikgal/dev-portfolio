import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
type Language = 'pl' | 'en'

interface Toast {
	id: number
	message: string
	type: 'success' | 'error' | 'info'
}

interface AppContextType {
	theme: Theme
	toggleTheme: () => void
	language: Language
	toggleLanguage: () => void
	t: (typeof translations)['pl']
	toasts: Toast[]
	showToast: (message: string, type?: 'success' | 'error' | 'info') => void
}

const translations = {
	en: {
		nav: {
			home: 'Home',
			about: 'About',
			projects: 'Projects',
			contact: 'Contact',
		},
		hero: {
			greeting: "Hi, I'm",
			name: 'Mateusz Gałuszka',
			status: 'Open to work',
			role: 'Frontend Developer',
			description:
				'I build accessible, pixel-perfect, and performant web experiences. Focusing on the React ecosystem and modern UI engineering.',
			viewWork: 'Featured Work',
			viewAll: 'View all',
			currentStack: 'Current Stack',
			buttons: {
				github: 'GitHub',
				linkedin: 'LinkedIn',
			},
		},
		about: {
			title: 'About Me',
			p1: "Hi, I'm a passionate Junior Frontend Developer based in Poland. I started my coding journey building custom themes for simple websites, which quickly escalated into a love for JavaScript and the modern web ecosystem.",
			p2: "Although I haven't had my first commercial role yet, I treat every personal project as a production-grade application. I focus heavily on code quality, component reusability, and creating intuitive user interfaces.",
			p3: "When I'm not coding, you can find me exploring new UI design trends, optimizing web performance, or learning about backend technologies to become a more well-rounded engineer.",
			skillsTitle: 'Technical Skills',
			skillCats: {
				core: 'Core',
				frameworks: 'Frameworks & Libs',
				tools: 'Tools & Environment',
			},
			timeline: {
				title: 'My Journey',
				steps: [
					{
						year: '2024',
						title: 'Internship at Rekord SI',
						desc: 'Completed programming internship. Gained practical experience working with commercial systems and development workflows.',
					},
					{
						year: '2023',
						title: 'Computer Science Degree',
						desc: 'Started university studies specializing in Software Engineering. Deep diving into algorithms and architecture.',
					},
					{
						year: '2019',
						title: 'IT Technical High School',
						desc: 'Began formal IT education. Learned basics of hardware, networking, and wrote first lines of code.',
					},
				],
			},
			toolbox: {
				title: 'Toolbox',
				desc: 'The software and hardware I use every day.',
			},
		},
		projects: {
			title: 'Selected Works',
			subtitle:
				'A collection of commercial projects, experiments, and open-source contributions. Each project represents a unique challenge and a learning opportunity.',
			readMore: 'Read Case Study',
			modal: {
				challenge: 'The Challenge',
				solution: 'The Solution',
				features: 'Key Features',
				close: 'Close details',
			},
			links: {
				source: 'Source',
				demo: 'Live Demo',
			},
		},
		contact: {
			title: "Let's work together.",
			subtitle:
				"I'm currently looking for new opportunities as a Frontend Developer. Whether you have a question or just want to say hi, my inbox is always open.",
			footer: 'Designed with React & Tailwind.',
			toast: 'Email copied to clipboard!',
		},
		command: {
			placeholder: 'Type a command or search...',
			noResults: 'No results found.',
			actions: {
				goHome: 'Go to Home',
				goAbout: 'Go to About',
				goProjects: 'Go to Projects',
				goContact: 'Go to Contact',
				toggleTheme: 'Toggle Theme',
				toggleLang: 'Change Language',
				copyEmail: 'Copy Email',
			},
			hint: 'Press',
		},
		footer: {
			time: 'Local Time',
			weather: 'Warsaw, PL',
			rights: 'All rights reserved.',
			cmdHint: 'Command Palette',
		},
		notFound: {
			title: '404',
			subtitle: 'Lost in Cyberspace?',
			desc: "The page you are looking for doesn't exist or has been moved.",
			button: 'Back to Home',
		},
	},
	pl: {
		nav: {
			home: 'Start',
			about: 'O mnie',
			projects: 'Projekty',
			contact: 'Kontakt',
		},
		hero: {
			greeting: 'Cześć, jestem',
			name: 'Mateusz Gałuszka',
			status: 'Szukam pracy',
			role: 'Frontend Developer',
			description:
				'Tworzę dostępne, dopracowane i wydajne aplikacje internetowe. Skupiam się na ekosystemie React i nowoczesnej inżynierii UI.',
			viewWork: 'Wybrane Prace',
			viewAll: 'Zobacz wszystkie',
			currentStack: 'Technologie',
			buttons: {
				github: 'GitHub',
				linkedin: 'LinkedIn',
			},
		},
		about: {
			title: 'O mnie',
			p1: 'Cześć, jestem początkującym Frontend Developerem z Polski. Moja przygoda z kodowaniem zaczęła się od prostych modyfikacji stron, co szybko przerodziło się w pasję do JavaScriptu i nowoczesnych technologii webowych.',
			p2: 'Mimo że szukam pierwszej komercyjnej roli, każdy projekt traktuję profesjonalnie. Kładę duży nacisk na jakość kodu, reużywalność komponentów i intuicyjne interfejsy użytkownika.',
			p3: 'Kiedy nie koduję, śledzę nowe trendy w UI, optymalizuję wydajność stron lub uczę się podstaw backendu, aby lepiej rozumieć cały proces tworzenia oprogramowania.',
			skillsTitle: 'Umiejętności Techniczne',
			skillCats: {
				core: 'Baza',
				frameworks: 'Frameworki i Biblioteki',
				tools: 'Narzędzia',
			},
			timeline: {
				title: 'Moja Ścieżka',
				steps: [
					{
						year: '2024',
						title: 'Praktyki w Rekord SI',
						desc: 'Odbycie praktyk programistycznych. Praca w realnym środowisku deweloperskim i poznanie procesów wytwarzania oprogramowania.',
					},
					{
						year: '2023',
						title: 'Studia Informatyczne',
						desc: 'Rozpoczęcie studiów o specjalizacji Inżynieria Oprogramowania. Zgłębianie inżynierii systemów i zaawansowanej algorytmiki.',
					},
					{
						year: '2019',
						title: 'Technikum Informatyczne',
						desc: 'Początek edukacji w IT. Nauka budowy sprzętu, sieci komputerowych oraz pierwsze linie kodu.',
					},
				],
			},
			toolbox: {
				title: 'Narzędzia',
				desc: 'Software i hardware, którego używam na co dzień.',
			},
		},
		projects: {
			title: 'Moje Projekty',
			subtitle:
				'Zbiór projektów i eksperymentów. Każda aplikacja to dla mnie okazja do nauki nowych rozwiązań i szlifowania warsztatu.',
			readMore: 'Zobacz Case Study',
			modal: {
				challenge: 'Wyzwanie',
				solution: 'Rozwiązanie',
				features: 'Główne funkcje',
				close: 'Zamknij szczegóły',
			},
			links: {
				source: 'Kod',
				demo: 'Live Demo',
			},
		},
		contact: {
			title: 'Napisz do mnie.',
			subtitle:
				'Aktualnie poszukuję pracy jako Junior Frontend Developer. Jeśli masz pytania lub propozycję współpracy, moja skrzynka jest otwarta.',
			footer: 'Zaprojektowano w React & Tailwind.',
			toast: 'Email skopiowany do schowka!',
		},
		command: {
			placeholder: 'Wpisz komendę lub szukaj...',
			noResults: 'Brak wyników.',
			actions: {
				goHome: 'Idź do Start',
				goAbout: 'Idź do O mnie',
				goProjects: 'Idź do Projekty',
				goContact: 'Idź do Kontakt',
				toggleTheme: 'Zmień motyw',
				toggleLang: 'Zmień język',
				copyEmail: 'Skopiuj Email',
			},
			hint: 'Wciśnij',
		},
		footer: {
			time: 'Czas lokalny',
			weather: 'Warszawa, PL',
			rights: 'Wszelkie prawa zastrzeżone.',
			cmdHint: 'Paleta Komend',
		},
		notFound: {
			title: '404',
			subtitle: 'Zagubiony w cyberprzestrzeni?',
			desc: 'Strona, której szukasz nie istnieje lub została przeniesiona.',
			button: 'Wróć na Start',
		},
	},
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [theme, setTheme] = useState<Theme>('dark')
	const [language, setLanguage] = useState<Language>('pl')
	const [toasts, setToasts] = useState<Toast[]>([])

	// Init Theme
	useEffect(() => {
		const savedTheme = localStorage.getItem('theme') as Theme
		if (savedTheme) {
			setTheme(savedTheme)
		}
	}, [])

	// Apply Theme to DOM
	useEffect(() => {
		const root = window.document.documentElement
		if (theme === 'dark') {
			root.classList.add('dark')
		} else {
			root.classList.remove('dark')
		}
		localStorage.setItem('theme', theme)
	}, [theme])

	const toggleTheme = () => {
		setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
	}

	const toggleLanguage = () => {
		setLanguage(prev => (prev === 'pl' ? 'en' : 'pl'))
	}

	const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
		const id = Date.now()
		setToasts(prev => [...prev, { id, message, type }])
		setTimeout(() => {
			setToasts(prev => prev.filter(t => t.id !== id))
		}, 3000)
	}

	return (
		<AppContext.Provider
			value={{
				theme,
				toggleTheme,
				language,
				toggleLanguage,
				t: translations[language],
				toasts,
				showToast,
			}}>
			{children}
		</AppContext.Provider>
	)
}

export const useApp = () => {
	const context = useContext(AppContext)
	if (!context) throw new Error('useApp must be used within an AppProvider')
	return context
}
