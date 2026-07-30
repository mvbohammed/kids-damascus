import {
  Landmark,
  ShoppingBag,
  Castle,
  Home as HomeIcon,
  Trees,
  Building2,
  DoorOpen,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

export interface Place {
  id: string;
  name: string;
  short: string;
  description: string;
  emoji: string;
  icon: LucideIcon;
  color: string;
  gradient: string;
  funFact: string;
}

export const places: Place[] = [
  {
    id: 'umayyad',
    name: 'الجامع الأموي',
    short: 'أكبر مساجد دمشق التاريخية',
    description:
      'الجامع الأموي من أعرق وأقدم المساجد في العالم. يحتوي على فناء رحب، وثلاث مآذن شامخة، وفسيفساء ذهبية رائعة تصور أشجاراً ومدناً خيالية.',
    emoji: '🕌',
    icon: Landmark,
    color: 'kid-blue',
    gradient: 'from-kid-blue to-kid-blueDark',
    funFact: 'له قبةٌ خضراء كبيرة تُرى من بعيد!',
  },
  {
    id: 'hamidiyeh',
    name: 'سوق الحميدية',
    short: 'أكبر وأشهر أسواق دمشق القديمة',
    description:
      'سوق الحميدية سوقٌ مغطّى بسقف من الصفيح المُثقّب، تمتلئ جنباته بالمحلات التي تبيع البزق الدمشقي، والحلويات، والمصنوعات اليدوية الجميلة.',
    emoji: '🛍️',
    icon: ShoppingBag,
    color: 'kid-orange',
    gradient: 'from-kid-orange to-kid-orangeDark',
    funFact: 'عندما تمشي فيه تشعر وكأنك في قصة من قصص ألف ليلة وليلة!',
  },
  {
    id: 'citadel',
    name: 'قلعة دمشق',
    short: 'حصنٌ قديم في قلب المدينة',
    description:
      'قلعة دمشق حصنٌ ضخم بُني منذ قرون ليحمي المدينة. لها أبوابٌ كبيرة وأبراجٌ للمراقبة، ويمكنك اليوم التجول فيها ومشاهدة كيف كان يعيش الفرسان قديماً.',
    emoji: '🏰',
    icon: Castle,
    color: 'kid-green',
    gradient: 'from-kid-green to-kid-greenDark',
    funFact: 'بداخلها سردابٌ سري يحكي قصص الفرسان!',
  },

  {
    id: 'bab-sharqi',
    name: 'باب شرقي',
    short: 'أقدم أبواب دمشق',
    description:
      'باب شرقي أقدم أبواب مدينة دمشق، عُرف منذ آلاف السنين. كان نقطة دخول وخروج للقوافل والتجار قديماً ويشتهر بحدادته ومطاعمه الجميلة.',
    emoji: '🚪',
    icon: DoorOpen,
    color: 'kid-purple',
    gradient: 'from-kid-purple to-kid-purpleDark',
    funFact: 'له شكلٌ دائري فريد لا يوجد في بقية الأبواب!',
  },

  {
    id: 'hejaz',
    name: 'محطة الحجاز',
    short: 'محطة قطار تاريخية',
    description:
      'محطة الحجاز قطارٌ تاريخي قديم كان ينقل المسافرين إلى الحجاز. مبنى المحطة بأسلوب جميل وفيه قاعة كبيرة وقطارٌ قديم معروض أمامها.',
    emoji: '🚂',
    icon: Building2,
    color: 'kid-lime',
    gradient: 'from-kid-lime to-kid-greenDark',
    funFact: 'كان هذا القطار يأخذ الناس في رحلة طويلة نحو مكة!',
  },
  {
    id: 'tekkiye',
    name: 'التكية السليمانية',
    short: 'مجمعٌ معماري رائع',
    description:
      'التكية السليمانية مجمعٌ معماري جميل فيه مسجدٌ وخان وحمّام وسوقٌ للحرفيين. تحيط بها حدائق جميلة وأشجارٌ وارفة.',
    emoji: '🏛️',
    icon: Sparkles,
    color: 'kid-yellow',
    gradient: 'from-kid-yellow to-warm-500',
    funFact: 'تحوي سوقاً للحرفيين يعملون حتى اليوم!',
  },
];

export interface Activity {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  gradient: string;
  path: string;
}

export const activities: Activity[] = [
  {
    id: 'coloring',
    title: 'تلوين المعالم',
    description: 'لوّن أشهر معالم دمشق بألوانك المفضّلة!',
    emoji: '🎨',
    color: 'kid-pink',
    gradient: 'from-kid-pink to-kid-purple',
    path: '/coloring',
  },
  {
    id: 'puzzle',
    title: 'تركيب الألغاز',
    description: 'اجمع القطع لتكوين معالم دمشق!',
    emoji: '🧩',
    color: 'kid-blue',
    gradient: 'from-kid-blue to-kid-teal',
    path: '/activities/puzzle',
  },
  {
    id: 'quiz',
    title: 'مسابقات سريعة',
    description: 'أجب عن أسئلة معالم دمشق واجمع النقاط!',
    emoji: '❓',
    color: 'kid-orange',
    gradient: 'from-kid-orange to-kid-orangeDark',
    path: '/activities/quiz',
  },
  {
    id: 'missions',
    title: 'مهمات المدينة',
    description: 'أكمل المهمات واجمع النقاط!',
    emoji: '⭐',
    color: 'kid-green',
    gradient: 'from-kid-green to-kid-greenDark',
    path: '/activities/missions',
  },
  {
    id: 'memory',
    title: 'لعبة الذاكرة',
    description: 'طابق بطاقات المعالم المتطابقة!',
    emoji: '🧠',
    color: 'kid-purple',
    gradient: 'from-kid-purple to-kid-pink',
    path: '/activities/memory',
  },
];

export interface Badge {
  id: string;
  title: string;
  description: string;
  emoji: string;
  unlocked: boolean;
  progress: number;
}

export const badges: Badge[] = [
  {
    id: 'explorer',
    title: 'مستكشف',
    description: 'زرت أول معلم في دمشق',
    emoji: '🧭',
    unlocked: true,
    progress: 100,
  },
  {
    id: 'landmarks',
    title: 'المعالم',
    description: 'تعلّمت عن 3 معالم',
    emoji: '🏛️',
    unlocked: true,
    progress: 100,
  },
  {
    id: 'missions',
    title: 'المهمات',
    description: 'أنجزت مهمتين',
    emoji: '⭐',
    unlocked: false,
    progress: 60,
  },
  {
    id: 'quizzes',
    title: 'المسابقات',
    description: 'أجبت 5 أسئلة صحيحة',
    emoji: '🏆',
    unlocked: false,
    progress: 40,
  },
];

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
  hint: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'ما هو أعرق وأقدم مساجد دمشق؟',
    options: ['الجامع الأموي', 'سوق الحميدية', 'قلعة دمشق', 'باب شرقي'],
    answer: 0,
    hint: 'له قبةٌ خضراء كبيرة تُرى من بعيد!',
  },
  {
    id: 'q2',
    question: 'أين تجد البزق الدمشقي والحلويات؟',
    options: ['قلعة دمشق', 'سوق الحميدية', 'بيت النايلسي', 'محطة الحجاز'],
    answer: 1,
    hint: 'سوقٌ مغطّى بسقف من الصفيح المُثقّب!',
  },
  {
    id: 'q3',
    question: 'ماذا يحمي قلعة دمشق؟',
    options: ['الناس', 'الأبراج الكبيرة', 'الشجر', 'الماء'],
    answer: 1,
    hint: 'لها أبوابٌ كبيرة وأبراجٌ للمراقبة!',
  },
  {
    id: 'q4',
    question: 'ماذا يوجد في وسط بيت النايلسي؟',
    options: ['مسبح', 'بحرة ماء وأزهار', 'ملعب', 'مطبخ كبير'],
    answer: 1,
    hint: 'فيه بحرة ماء صغيرة يتغنى بها الجميع!',
  },
  {
    id: 'q5',
    question: 'ما هو أقدم أبواب دمشق؟',
    options: ['باب توما', 'باب الجابية', 'باب شرقي', 'باب الفرج'],
    answer: 2,
    hint: 'له شكلٌ دائري فريد لا يوجد في بقية الأبواب!',
  },
  {
    id: 'q6',
    question: 'إلى أين كان يأخذ محطة الحجاز المسافرين؟',
    options: ['بيروت', 'الحجاز', 'دمشق', 'حلب'],
    answer: 1,
    hint: 'كان ينقل المسافرين إلى الحجاز!',
  },
];

export interface Mission {
  id: string;
  title: string;
  description: string;
  emoji: string;
  points: number;
  done: boolean;
}

export const initialMissions: Mission[] = [
  {
    id: 'm1',
    title: 'زر الجامع الأموي',
    description: 'اقرأ عن الجامع الأموي واكتشف قصته',
    emoji: '🕌',
    points: 50,
    done: false,
  },
  {
    id: 'm2',
    title: 'تلوين معلم واحد',
    description: 'لوّن أي معلم من معالم دمشق',
    emoji: '🎨',
    points: 30,
    done: false,
  },
  {
    id: 'm3',
    title: 'أجب عن 3 أسئلة في المسابقة',
    description: 'أجب عن 3 أسئلة صحيحة في المسابقات',
    emoji: '❓',
    points: 40,
    done: false,
  },
  {
    id: 'm4',
    title: 'ركّب لغزاً كاملاً',
    description: 'اجمع قطع اللغز لتكوين معلم دمشقي',
    emoji: '🧩',
    points: 60,
    done: false,
  },
  {
    id: 'm5',
    title: 'اكتشف باب شرقي',
    description: 'تعرّف على باب شرقي أقدم أبواب دمشق',
    emoji: '🚪',
    points: 20,
    done: false,
  },
];

export interface Profile {
  name: string;
  avatar: string;
  level: number;
  points: number;
}

export const defaultProfile: Profile = {
  name: 'محمد',
  avatar: '👦',
  level: 3,
  points: 250,
};
