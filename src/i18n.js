import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import childManagementEn from "./localize/childManagementEn.json";
import childManagementAr from "./localize/childManagementAr.json";
import addPlayerFormEn from "./localize/addPlayerEn.json";
import addPlayerFormAr from "./localize/addPlayerAr.json";

const resources = {
  en: {
    translation: {
      "How AthliQ Works": "How AthliQ Works",

      // Step 1
      "Step 1: Data Collection": "Step 1: Data Collection",
      "The system gathers essential details about the child, including:":
        "The system gathers essential details about the child, including:",
      "Physical attributes (height, weight, flexibility, endurance)":
        "Physical attributes (height, weight, flexibility, endurance)",
      "Medical history (injuries, conditions affecting performance)":
        "Medical history (injuries, conditions affecting performance)",
      "Personal preferences & past sports experience":
        "Personal preferences & past sports experience",
      "Genetic & family sports history (if applicable)":
        "Genetic & family sports history (if applicable)",

      // Step 2
      "Step2:AI": "Step 2: AI Evaluation",
      "AI-Based Evaluation with Drools Rule Engine":
        "AI-Based Evaluation with Drools Rule Engine",
      "Drools Rule Engine processes the collected inputs and test scores.":
        "Drools Rule Engine processes the collected inputs and test scores.",
      "Defined rule sets classify the child's abilities based on performance thresholds.":
        "Defined rule sets classify the child's abilities based on performance thresholds.",
      "AI compares the child's test results with benchmarks from professional athletes.":
        "AI compares the child's test results with benchmarks from professional athletes.",
      "The system identifies the most suitable sports category based on predefined rules.":
        "The system identifies the most suitable sports category based on predefined rules.",

      // Step 3
      Step3: "Step 3",
      "Personalized Sports Recommendation":
        "Personalized Sports Recommendation",
      "The AI system provides sports recommendations tailored to the child's profile.":
        "The AI system provides sports recommendations tailored to the child's profile.",
      "Each recommendation includes reasoning based on rule-based decision-making.":
        "Each recommendation includes reasoning based on rule-based decision-making.",
      "Parents and coaches receive a report with insights on strengths and improvement areas.":
        "Parents and coaches receive a report with insights on strengths and improvement areas.",

      // Step 4
      Step4: "Step 4",
      "Continuous Learning & Optimization":
        "Continuous Learning & Optimization",
      "The system refines recommendations as more data is gathered":
        "The system refines recommendations as more data is gathered",
      "User feedback helps fine-tune the Drools rules for better accuracy":
        "User feedback helps fine-tune the Drools rules for better accuracy",
      "Future updates may integrate real-time motion tracking for advanced analysis":
        "Future updates may integrate real-time motion tracking for advanced analysis",

      // Features translations
      "Injury Prevention": "Injury Prevention",
      "Injury Prevention Description":
        "Prevent injuries by matching children with sports suited to their body structure and endurance levels.",
      "Time and Money Savings": "Time and Money Savings",
      "Time and Money Savings Description":
        "Reduce the time and financial burden associated with trial-and-error sports selection.",
      "Performance Boost": "Performance Boost",
      "Performance Boost Description":
        "Enhance performance, engagement, and long-term participation in sports.",
      "24/7 Support": "24/7 Support",
      "24/7 Support Description":
        "Our team is available at all times in case you need us",
      "Ease of Use": "Ease of Use",
      "Ease of Use Description": "Our system is easy to use",
      "Physical Assessment": "Physical Assessment",
      "Physical Assessment Description":
        "Provide accurate, personalized sports recommendations based on a child's physical attributes, preferences, and health data.",
      "What We Offer": "What We Offer",
      // Hero One
      "Challenge in Sports Selection": "Challenge in Sports Selection",
      "Hero One Headline":
        "Parents choose sports for their children based on Personal preference, Family history, Cultural influences.",
      "Hero One Description":
        "This approach often overlooks the child's unique: * Physical traits: Height, body structure, stamina, flexibility. * Personality and preferences: What sport excites or motivates them. * Genetic potential: Some children may have untapped athletic gifts.",
      "Find More": "Find More",

      // Hero Two
      "Designed & Developed": "Designed & Developed",
      "The best practices": "The best practices",
      "Hero Two Description":
        "AthliQ is dedicated to revolutionizing sports selection for children by leveraging cutting-edge AI technologies.",
      "View Project": "View Project",

      // Hero Three
      "Highly Motivated Software Engineers":
        "Highly Motivated Software Engineers",
      "Why us?": "Why us?",
      "Hero Three Description":
        "We are continuously improving AthliQ to provide more accurate and insightful sports recommendations.",
      // Hero translations
      "Your Child is our Priority": "Your Child is our Priority",
      "Hero Text":
        "We Provide accurate, personalized sports recommendations based on a child's physical attributes, preferences, and health data.",
      "Get Started": "Get Started",
      "Find More": "Find More",
      "years old": "years old",
      Male: "Male",
      Female: "Female",
      "Your Players": "Your Players",
      "No players found. Add some players to get started!":
        "No players found. Add some players to get started!",
      /**
       * Log In
       * Sign Up
       * Log Out
       * Children
       * About
       */
      "Log In": "Log In",
      "Sign Up": "Sign Up",
      "Log Out": "Log Out",
      Children: "Children",
      About: "About",
      // Instructions Page
      "Instructions Before Entering Test Results":
        "Instructions Before Entering Test Results",
      "Welcome Instruction":
        "Welcome! Before you proceed to enter your physical test results, please read the following important instructions carefully:",
      "Why Your Input Matters": "Why Your Input Matters",
      "Input Matters Text":
        "The values you provide for each test are the foundation of our recommendation system. These values help us assess your current fitness level and guide you toward the most suitable <1>sports category or discipline</1> based on your strengths and potential.",
      "Accuracy is Key": "Accuracy is Key",
      "Accuracy Item 1":
        "Your test results <1>directly affect</1> the outcome of your sport or category recommendation.",
      "Accuracy Item 2":
        "Entering incorrect or estimated values may lead to <1>misleading suggestions</1> that do not reflect your true abilities.",
      "Ensure Correct Results": "Ensure Correct Results",
      "Correct Results Item 1":
        "We highly recommend performing each test <1>more than once</1> to ensure accuracy and consistency.",
      "Correct Results Item 2":
        "Record your <1>best valid result</1> after repeating the test at least 2–3 times for reliability.",
      "How to Perform the Tests": "How to Perform the Tests",
      "Perform Tests Item 1":
        "Make sure you're in a <1>safe and open environment</1> suitable for physical activity.",
      "Perform Tests Item 2": "Warm up properly before beginning.",
      "Perform Tests Item 3":
        "Have someone assist you or record results if needed for accuracy.",
      "Perform Tests Item 4":
        "If you're unsure how to perform a test, refer to the <1>detailed guide</1> or contact support.",
      "Before You Begin": "Before You Begin",
      "Begin Item 1":
        "Double-check all entries for <1>correct units</1> (e.g., seconds, centimeters, count).",
      "Begin Item 2":
        "Only submit the data <1>after you are confident</1> the values reflect your performance.",
      "Closing Instruction":
        "By entering accurate and honest results, you help us give you the best possible recommendation tailored to your abilities. We're excited to help you find the right path in sports!",
      "Accept Terms": "I have read and understood all instructions",
      Next: "Next",
      /**
       * No players found
       * Loading...
       */
      "No players found": "No players found",
      "Loading...": "Loading...",
      "Search players...": "Search players...",
      childManagement: childManagementEn,
      addPlayer: addPlayerFormEn,
    },
  },
  ar: {
    translation: {
      "How AthliQ Works": "كيف يعمل AthliQ",

      // Step 1
      "Step 1: Data Collection": "الخطوة 1: جمع البيانات",
      "The system gathers essential details about the child, including:":
        "يقوم النظام بجمع التفاصيل الأساسية عن الطفل، بما في ذلك:",
      "Physical attributes (height, weight, flexibility, endurance)":
        "الخصائص البدنية (الطول، الوزن، المرونة، التحمل)",
      "Medical history (injuries, conditions affecting performance)":
        "التاريخ الطبي (الإصابات، الحالات التي تؤثر على الأداء)",
      "Personal preferences & past sports experience":
        "التفضيلات الشخصية والخبرات الرياضية السابقة",
      "Genetic & family sports history (if applicable)":
        "التاريخ الرياضي العائلي والجيني (إن وجد)",

      // Step 2
      "Step2:AI": "الخطوة 2: التقييم بالذكاء الاصطناعي",
      "AI-Based Evaluation with Drools Rule Engine":
        "التقييم باستخدام الذكاء الاصطناعي ومحرك قواعد Drools",
      "Drools Rule Engine processes the collected inputs and test scores.":
        "يقوم محرك قواعد Drools بمعالجة المدخلات المجمعة ونتائج الاختبارات.",
      "Defined rule sets classify the child's abilities based on performance thresholds.":
        "تصنف مجموعات القواعد المحددة قدرات الطفل بناءً على عتبات الأداء.",
      "AI compares the child's test results with benchmarks from professional athletes.":
        "يقارن الذكاء الاصطناعي نتائج اختبارات الطفل بمعايير من الرياضيين المحترفين.",
      "The system identifies the most suitable sports category based on predefined rules.":
        "يحدد النظام الفئة الرياضية الأنسب بناءً على القواعد المحددة مسبقًا.",

      // Step 3
      Step3: "الخطوة 3",
      "Personalized Sports Recommendation": "توصيات رياضية مخصصة",
      "The AI system provides sports recommendations tailored to the child's profile.":
        "يقدم نظام الذكاء الاصطناعي توصيات رياضية مصممة خصيصًا لملف الطفل.",
      "Each recommendation includes reasoning based on rule-based decision-making.":
        "تتضمن كل توصية أسبابًا مبنية على اتخاذ القرار القائم على القواعد.",
      "Parents and coaches receive a report with insights on strengths and improvement areas.":
        "يتلقى الآباء والمدربون تقريرًا يحتوي على رؤى حول نقاط القوة ومناطق التحسين.",

      // Step 4
      Step4: "الخطوة 4",
      "Continuous Learning & Optimization": "التعلم المستمر والتحسين",
      "The system refines recommendations as more data is gathered":
        "يحسن النظام التوصيات مع جمع المزيد من البيانات.",
      "User feedback helps fine-tune the Drools rules for better accuracy":
        "يساعد ملاحظات المستخدم في ضبط قواعد Drools لتحسين الدقة.",
      "Future updates may integrate real-time motion tracking for advanced analysis":
        "قد تتضمن التحديثات المستقبلية تكامل تتبع الحركة في الوقت الفعلي لتحليل متقدم.",

      "Injury Prevention": "الوقاية من الإصابات",
      "Injury Prevention Description":
        "منع الإصابات بمطابقة الأطفال مع الرياضات المناسبة لبنية أجسامهم ومستويات تحملهم.",
      "Time and Money Savings": "توفير الوقت والمال",
      "Time and Money Savings Description":
        "تقليل العبء المالي والوقت المرتبط باختيار الرياضات بطريقة التجربة والخطأ.",
      "Performance Boost": "تعزيز الأداء",
      "Performance Boost Description":
        "تحسين الأداء والمشاركة والمشاركة طويلة المدى في الرياضات.",
      "24/7 Support": "دعم على مدار الساعة",
      "24/7 Support Description":
        "فريقنا متاح في جميع الأوقات في حالة احتجت إلينا",
      "Ease of Use": "سهولة الاستخدام",
      "Ease of Use Description": "نظامنا سهل الاستخدام",
      "Physical Assessment": "التقييم البدني",
      "Physical Assessment Description":
        "تقديم توصيات رياضية دقيقة ومخصصة بناءً على السمات البدنية للطفل وتفضيلاته وبياناته الصحية.",
      "What We Offer": "ما نقدمه",

      // Hero One Arabic
      "Challenge in Sports Selection": "التحدي في اختيار الرياضة",
      "Hero One Headline":
        "يختار الآباء الرياضات لأطفالهم بناءً على: 1) التفضيل الشخصي، 2) التاريخ العائلي، 3) التأثيرات الثقافية",
      "Hero One Description":
        "هذا النهج غالبًا ما يتجاهل مميزات الطفل الفريدة: * الصفات البدنية: الطول، بنية الجسم، التحمل، المرونة. * الشخصية والتفضيلات: ما الرياضة التي تثير حماسهم أو تحفزهم. * الإمكانات الوراثية: بعض الأطفال قد يمتلكون مواهب رياضية غير مستغلة.",
      "Find More": "المزيد",

      // Hero Two Arabic
      "Designed & Developed": "مصمم ومطور",
      "The best practices": "أفضل الممارسات",
      "Hero Two Description":
        "تلتزم AthliQ بإحداث ثورة في اختيار الرياضات للأطفال من خلال استخدام أحدث تقنيات الذكاء الاصطناعي.",
      "View Project": "عرض المشروع",

      // Hero Three Arabic
      "Highly Motivated Software Engineers": "مهندسو برمجيات متحمسون للغاية",
      "Why us?": "لماذا نحن؟",
      "Hero Three Description":
        "نحن نعمل باستمرار على تحسين AthliQ لتقديم توصيات رياضية أكثر دقة وفعالية.",
      // Arabic translations for Hero
      "Your Child is our Priority": "طفلك هو أولويتنا",
      "Hero Text":
        "نقدم توصيات رياضية دقيقة ومخصصة بناءً على السمات البدنية للطفل وتفضيلاته وبياناته الصحية.",
      "Get Started": "ابدأ الآن",
      "Find More": "اكتشف المزيد",
      "years old": "سنوات",
      Male: "ذكر",
      Female: "انثى",
      "Your Players": "اللاعبين الخاصة بك",
      "No players found. Add some players to get started!":
        "لم يتم العثور على لاعبين. أضف لاعبين للبدء!",

      /**
       * Log In
       * Sign Up
       * Log Out
       * Children
       * About
       */
      "Log In": "تسجيل الدخول",
      "Sign Up": "انشاء حساب",
      "Log Out": "تسجيل الخروج",
      Children: "اللاعبين",
      About: "من نحن",

      // Arabic translations
      "Instructions Before Entering Test Results":
        "تعليمات قبل إدخال نتائج الاختبار",
      "Welcome Instruction":
        "مرحبًا! قبل المتابعة لإدخال نتائج اختبارك البدني، يرجى قراءة التعليمات المهمة التالية بعناية:",
      "Why Your Input Matters": "لماذا بياناتك مهمة",
      "Input Matters Text":
        "القيم التي تقدمها لكل اختبار هي أساس نظام التوصية لدينا. تساعدنا هذه القيم في تقييم مستوى لياقتك الحالي وتوجيهك نحو <1>الفئة أو التخصص الرياضي</1> الأنسب بناءً على نقاط قوتك وإمكاناتك.",
      "Accuracy is Key": "الدقة هي الأساس",
      "Accuracy Item 1":
        "نتائج اختبارك <1>تؤثر مباشرة</1> على نتيجة توصية الرياضة أو الفئة.",
      "Accuracy Item 2":
        "قد يؤدي إدخال قيم غير صحيحة أو تقديرية إلى <1>اقتراحات مضللة</1> لا تعكس قدراتك الحقيقية.",
      "Ensure Correct Results": "تأكد من صحة النتائج",
      "Correct Results Item 1":
        "نوصي بشدة بإجراء كل اختبار <1>أكثر من مرة</1> لضمان الدقة والاتساق.",
      "Correct Results Item 2":
        "سجل <1>أفضل نتيجة صالحة</1> بعد تكرار الاختبار مرتين إلى ثلاث مرات على الأقل لضمان الموثوقية.",
      "How to Perform the Tests": "كيفية إجراء الاختبارات",
      "Perform Tests Item 1":
        "تأكد من أنك في <1>بيئة آمنة ومفتوحة</1> مناسبة للنشاط البدني.",
      "Perform Tests Item 2": "قم بالإحماء بشكل صحيح قبل البدء.",
      "Perform Tests Item 3":
        "اجعل شخصًا يساعدك أو يسجل النتائج إذا لزم الأمر لضمان الدقة.",
      "Perform Tests Item 4":
        "إذا لم تكن متأكدًا من كيفية إجراء اختبار ما، فارجع إلى <1>الدليل التفصيلي</1> أو اتصل بالدعم.",
      "Before You Begin": "قبل أن تبدأ",
      "Begin Item 1":
        "تحقق مرة أخرى من جميع المدخلات للتأكد من <1>صحة الوحدات</1> (مثل الثواني، السنتيمترات، العدد).",
      "Begin Item 2":
        "قم بإرسال البيانات فقط <1>بعد التأكد</1> من أن القيم تعكس أداءك.",
      "Closing Instruction":
        "من خلال إدخال نتائج دقيقة وصادقة، تساعدنا في تقديم أفضل توصية ممكنة مصممة خصيصًا لقدراتك. نحن متحمسون لمساعدتك في العثور على المسار الصحيح في الرياضة!",
      "Accept Terms": "لقد قرأت وفهمت جميع التعليمات",
      Next: "التالي",
      /**
       * No players found
       * Loading...
       */
      "No players found": "لا يوجد لديك لاعبين",
      "Loading...": "جاري التحميل...",
      "Search players...": "ابحث عن لاعبين...",
      childManagement: childManagementAr,
      addPlayer: addPlayerFormAr
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
