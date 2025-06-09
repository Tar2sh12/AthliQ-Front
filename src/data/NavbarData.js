export const data = (t) => [
  {
    to: '/',
    text: '',
    id: '',
    role: "not loggedin"
  },
  {
    to: '/',
    text: 'About',
    id: t('about'),
    role: "not loggedin"
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
    to: '/login',
    text: t('Log Out'),
    role: 'User',
  },
  
  // Admin specific routes
  {
    to: '/adminHomePage',
    text: t('Admin Dashboard'),
    role: 'Admin',
  },
  {
    to: '/admin/acceptOrRejectUsers',
    text: t('Manage Users'),
    role: 'Admin',
  },
  {
    to: '/login',
    text: t('Log Out'),
    role: 'Admin',
  },
  
  {
    to: '/signup',
    text: t('Sign Up'),
    role: "not loggedin"
  },
  {
    to: '/login',
    text: t('Log In'),
    role: "not loggedin"
  },
];