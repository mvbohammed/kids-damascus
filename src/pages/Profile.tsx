import { motion } from 'framer-motion';
import { Star, Award, TrendingUp, Zap } from 'lucide-react';
import { defaultProfile, badges } from '@/data/content';

export default function Profile() {
  const totalProgress = Math.round(
    (badges.filter((b) => b.unlocked).length / badges.length) * 100,
  );
  const nextLevel = (defaultProfile.level + 1) * 100;
  const levelProgress = Math.min(100, Math.round((defaultProfile.points / nextLevel) * 100));

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-10">
      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-kid-blue via-kid-purple to-kid-pink rounded-4xl p-6 md:p-8 shadow-kid text-white relative overflow-hidden"
      >
        <motion.div
          className="absolute top-4 left-4 text-4xl opacity-40"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          ⭐
        </motion.div>

        <div className="flex flex-col md:flex-row items-center gap-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 150, delay: 0.2 }}
            className="bg-white rounded-full w-28 h-28 md:w-32 md:h-32 flex items-center justify-center shadow-lg overflow-hidden ring-4 ring-white/50"
          >
            <img
              src="/images/image2.png"
              alt={defaultProfile.name}
              className="w-full h-full object-contain"
              style={{ mixBlendMode: 'multiply' }}
            />
          </motion.div>
          <div className="text-center md:text-right flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold drop-shadow">
              {defaultProfile.name}
            </h1>
            <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
              <span className="bg-white/25 rounded-full px-4 py-1.5 font-bold flex items-center gap-1">
                <Award className="w-4 h-4" />
                المستوى {defaultProfile.level}
              </span>
              <span className="bg-white/25 rounded-full px-4 py-1.5 font-bold flex items-center gap-1">
                <Zap className="w-4 h-4" />
                {defaultProfile.points} نقطة
              </span>
            </div>

            {/* Level progress */}
            <div className="mt-4">
              <div className="flex justify-between text-sm font-bold mb-1">
                <span>المستوى {defaultProfile.level}</span>
                <span>المستوى {defaultProfile.level + 1}</span>
              </div>
              <div className="bg-white/25 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="h-full bg-kid-yellow rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${levelProgress}%` }}
                  transition={{ delay: 0.4, type: 'spring' }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8"
      >
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-7 h-7 text-kid-orangeDark" />
          <h2 className="text-2xl font-extrabold text-gray-800">شاراتي</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 150 }}
              className={`rounded-3xl p-5 text-center shadow-md ${
                b.unlocked
                  ? 'bg-gradient-to-br from-kid-yellow to-kid-orange text-white'
                  : 'bg-white'
              }`}
            >
              <motion.span
                className={`text-5xl block ${b.unlocked ? '' : 'grayscale opacity-40'}`}
                animate={b.unlocked ? { rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >
                {b.emoji}
              </motion.span>
              <h3 className={`font-extrabold mt-2 ${b.unlocked ? 'text-white' : 'text-gray-500'}`}>
                {b.title}
              </h3>
              <p className={`text-xs font-semibold mt-1 ${b.unlocked ? 'text-white/90' : 'text-gray-400'}`}>
                {b.description}
              </p>
              {!b.unlocked && (
                <div className="mt-3 bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-kid-orange rounded-full"
                    style={{ width: `${b.progress}%` }}
                  />
                </div>
              )}
              {b.unlocked && (
                <span className="inline-block bg-white/25 rounded-full px-2 py-0.5 text-xs font-bold mt-2">
                  مفتوحة ✓
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Overall progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 bg-white rounded-3xl p-6 shadow-md"
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-6 h-6 text-kid-greenDark" />
          <h2 className="text-xl font-extrabold text-gray-800">تقدّمي العام</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-24 h-24 shrink-0">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#e5e7eb" strokeWidth="10" />
              <motion.circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#66bb6a"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 42}
                initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - totalProgress / 100) }}
                transition={{ delay: 0.5, duration: 1.2 }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-extrabold text-xl text-gray-800">
              {totalProgress}%
            </span>
          </div>
          <div className="flex-1">
            <p className="text-gray-700 font-bold">
              فتحت {badges.filter((b) => b.unlocked).length} من {badges.length} شارات
            </p>
            <p className="text-gray-500 font-semibold text-sm mt-1">
              استمر في اللعب والتعلّم لفتح المزيد من الشارات!
            </p>
            <div className="flex items-center gap-2 mt-3">
              <Star className="w-5 h-5 text-kid-yellow fill-kid-yellow" />
              <span className="font-extrabold text-gray-800">{defaultProfile.points} نقطة</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
