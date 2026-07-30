
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, ArrowRight, Check, Star, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { initialMissions, type Mission } from '@/data/content';
import { playClick, playSuccess, fireStarBurst, speak } from 
'@/utils/effects';

export default function Missions() {
  const [missions, setMissions] = useState<Mission[]>(initialMissions);

  const doneCount = missions.filter((m) => m.done).length;
  const totalPoints = missions.filter((m) => m.done).reduce((s, m) => s + m.points, 0);
  const progress = Math.round((doneCount / missions.length) * 100);

  function toggle(id: string): void {
    setMissions((prev) => {
      const next = prev.map((m) => (m.id === id ? { ...m, done: !m.done } : m));
      const m = next.find((x) => x.id === id);
      if (m?.done) {
        playSuccess();
        fireStarBurst();
        speak(`أحسنت! أنجزت ${m.title} وحصلت على ${m.points} نقطة!`);
      } else {
        playClick();
      }
      return next;
    });
  }

  const allDone = doneCount === missions.length;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <Link
          to="/activities"
          onClick={playClick}
          className="flex items-center gap-2 bg-white rounded-2xl px-4 py-2 font-bold text-gray-700 shadow"
        >
          <ArrowRight className="w-5 h-5" />
          رجوع
        </Link>
        <span className="bg-kid-yellow text-kid-orangeDark rounded-full px-4 py-1.5 font-extrabold flex items-center gap-1">
          <Trophy className="w-4 h-4" />
          {totalPoints} نقطة
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <div className="inline-flex items-center gap-2 bg-kid-green text-white rounded-full px-4 py-1.5 font-bold mb-2">
          <Target className="w-5 h-5" />
          مهمات المدينة
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800">
          أكمل المهمات واجمع النقاط!
        </h1>
      </motion.div>

      {/* Progress */}
      <div className="bg-white rounded-3xl p-4 shadow mb-5">
        <div className="flex justify-between font-bold text-gray-700 mb-2">
          <span>التقدّم</span>
          <span>{doneCount}/{missions.length}</span>
        </div>
        <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-l from-kid-green to-kid-blue rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 60 }}
          />
        </div>
      </div>

      <div className="grid gap-3">
        {missions.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`rounded-3xl p-4 shadow-md flex items-center gap-4 transition-all ${
              m.done ? 'bg-kid-green/20' : 'bg-white'
            }`}
          >
            <span className="text-4xl">{m.emoji}</span>
            <div className="flex-1">
              <h3 className={`font-extrabold text-lg ${m.done ? 'text-kid-greenDark line-through' : 'text-gray-800'}`}>
                {m.title}
              </h3>
              <p className="text-sm text-gray-600 font-semibold">{m.description}</p>
              <span className="inline-flex items-center gap-1 bg-kid-yellow/40 text-kid-orangeDark rounded-full px-2 py-0.5 text-xs font-bold mt-1">
                <Star className="w-3 h-3" />
                {m.points} نقطة
              </span>
            </div>
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => toggle(m.id)}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition ${
                m.done
                  ? 'bg-kid-green text-white'
                  : 'bg-gray-100 hover:bg-kid-green hover:text-white text-gray-400'
              }`}
              aria-label={m.done ? 'إلغاء الإنجاز' : 'إنجاز المهمة'}
            >
              <Check className="w-6 h-6" />
            </motion.button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {allDone && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-6 bg-gradient-to-br from-kid-yellow to-kid-orange rounded-3xl p-6 text-center text-white shadow-kid-orange"
          >
            <motion.span
              className="text-6xl block"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🏆
            </motion.span>
            <h2 className="text-2xl font-extrabold mt-2">بطل المدينة!</h2>
            <p className="font-bold mt-1">أنجزت كل المهمات وحصلت على {totalPoints} نقطة!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
