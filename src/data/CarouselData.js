export const data = [
	{
		title: 'Step 1: Data Collection ',
		description:
			'The system gathers essential details about the child, including:',
		points: [
		"	Physical attributes (height, weight, flexibility, endurance) ",
"Medical history (injuries, conditions affecting performance)",
" Personal preferences & past sports experience",
" Genetic & family sports history (if applicable)"

		],
		image: './assets/dataCollection.png'
	},
	{
		title: 'Step2:AI',
		description: 'AI-Based Evaluation with Drools Rule Engine',
		points: [
		"Drools Rule Engine processes the collected inputs and test scores.",
"Defined rule sets classify the child’s abilities based on performance thresholds.",
"AI compares the child’s test results with benchmarks from professional athletes.",
"The system identifies the most suitable sports category based on predefined rules."

		],
		image: './assets/security.jpg',
	},
	{
		title: 'Step3',
		description: 'Personalized  Sports  Recommendation  ',
		points: [
		"The AI system provides sports recommendations tailored to the child’s profile.",
"Each recommendation includes reasoning based on rule-based decision-making.",
"Parents and coaches receive a report with insights on strengths and improvement areas."

		],
		image: './assets/teamwork.jpg',
	},
	{
		title: 'Step4 ',
		description:
			' Continuous Learning & Optimization',
		points: [
		"The system refines recommendations as more data is gathered",
"User feedback helps fine-tune the Drools rules for better accuracy",
"Future updates may integrate real-time motion tracking for advanced analysis"

		],
		image: './assets/dataCollection.png'
	},
	
];

export const sliderSettings = {
	arrows: false,
	slidesToShow: 3,
	focusOnselect: false,
	accessability: false,
	responsive: [
		{
			breakpoint: 1280,
			settings: {
				slidesToShow: 2,
			},
		},

		{
			breakpoint: 900,
			settings: {
				slidesToShow: 1,
			},
		},
	],
};
