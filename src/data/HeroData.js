// heroData.js
export const getHeroData = (t) => ({
	heroOne: {
	  reverse: true,
	  inverse: true,
	  topLine: {
		text: t("Challenge in Sports Selection"),
	  },
	  headline: t("Hero One Headline"),
	  description: t("Hero One Description"),
	  buttonLabel: t("Find More"),
	  imgStart: 'start',
	  img: './assets/sportDeal2.png',
	  start: 'true',
	},
	heroTwo: {
	  reverse: false,
	  inverse: false,
	  topLine: {
		text: t("Designed & Developed"),
	  },
	  headline: t("The best practices"),
	  description: t("Hero Two Description"),
	  buttonLabel: t("View Project"),
	  linkTo: '/more',
	  imgStart: 'start',
	  img: './assets/chooseSport.png',
	  start: 'true',
	},
	heroThree: {
	  reverse: true,
	  inverse: true,
	  topLine: {
		text: t("Highly Motivated Software Engineers"),
	  },
	  headline: t("Why us?"),
	  description: t("Hero Three Description"),
	  buttonLabel: t("View Project"),
	  linkTo: '/download',
	  imgStart: '',
	  img: './assets/lookForSport.png',
	  start: 'true',
	}
  });