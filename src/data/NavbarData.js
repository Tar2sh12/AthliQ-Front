export const data = (t) => [
	{
		to: '/',
		text: '',
		id: '',
		role:"not loggedin"
	},
	{
		to: '/',
		text: 'About',
		id: t('about'),
		role:"not loggedin"
	},
	{
		to: '/',
		text: '',
		id: '',
		role: 'User',
	},	
	{
		to: '/',
		text: t('About'),
		role: 'User',
	},
	{
		to: '/children',
		text: t('Children'),
		role: 'User',
	},
	{
		to:'/login',
		text: t('Log Out'),
		role: 'User',
	},
	
	{
		to: '/signup',
		text: t('Sign Up'),
		role:"not loggedin"
	},
	{
		to: '/login',
		text: t('Log In'),
		role:"not loggedin"
	},
];
