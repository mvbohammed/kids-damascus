import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gamepad2, ArrowLeft } from 'lucide-react';
import { activities } from '@/data/content';
import { getGradient } from '@/utils/gradients';
import { playClick } from '@/utils/effects';

export default function Activities() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 bg-kid-orange text-white rounded-full px-4 py-1.5 font-bold mb-3">
          <Gamepad2 className="w-5 h-5" />
          ألعاب وأنشطة
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800">
          العب وتعلّم!
        </h1>
        <p className="text-gray-600 font-semibold mt-2">
          اختر لعبتك المفضّلة وابدأ المتعة
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {activities.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, type: 'spring', stiffness: 150 }}
            whileHover={{ scale: 1.03, rotate: -1 }}
          >
            <Link to={a.path} onClick={playClick} className="block">
              <div className={`card-kid bg-gradient-to-br ${getGradient(a.gradient)} p-8 h-full flex items-center gap-5`}>
                <motion.span
                  className="text-7xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                >
                  {a.emoji}
                </motion.span>
                <div className="flex-1 text-right">
                  <h3 className="text-2xl font-extrabold text-white drop-shadow">{a.title}</h3>
                  <p className="text-white/90 font-semibold mt-2">{a.description}</p>
                  <span className="inline-flex items-center gap-1 text-white font-bold mt-3 bg-white/25 rounded-full px-3 py-1">
                    ابدأ <ArrowLeft className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
