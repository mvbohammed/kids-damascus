import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, Sparkles, Volume2 } from 'lucide-react';
import { places, type Place } from '@/data/content';
import { getGradient } from '@/utils/gradients';
import { playClick, playPop, speak } from '@/utils/effects';

export default function Places() {
  const [selected, setSelected] = useState<Place | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 bg-kid-green text-white rounded-full px-4 py-1.5 font-bold mb-3">
          <MapPin className="w-5 h-5" />
          معالم دمشق
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800">
          أماكن رائعة تنتظرك!
        </h1>
        <p className="text-gray-600 font-semibold mt-2">
          اضغط على أي مكان لتتعرّف على قصته
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {places.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => {
                playClick();
                setSelected(p);
              }}
              className={`card-kid bg-gradient-to-br ${getGradient(p.gradient)} p-6 cursor-pointer`}
            >
              <div className="flex items-start justify-between">
                <div className="bg-white/30 rounded-2xl w-14 h-14 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-5xl">{p.emoji}</span>
              </div>
              <h3 className="text-xl font-extrabold text-white drop-shadow mt-3">{p.name}</h3>
              <p className="text-sm text-white/90 font-semibold mt-1">{p.short}</p>
              <div className="mt-4 bg-white/25 rounded-2xl px-3 py-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-bold">{p.funFact}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-4xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative"
            >
              <button
                onClick={() => {
                  playPop();
                  setSelected(null);
                }}
                className="absolute top-4 left-4 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <div className={`bg-gradient-to-br ${getGradient(selected.gradient)} rounded-3xl p-6 text-center`}>
                <span className="text-7xl block">{selected.emoji}</span>
                <h2 className="text-2xl font-extrabold text-white drop-shadow mt-2">
                  {selected.name}
                </h2>
              </div>

              <p className="text-gray-700 font-semibold mt-4 leading-relaxed text-lg">
                {selected.description}
              </p>

              <div className="mt-4 bg-kid-yellow/40 rounded-2xl p-4 flex items-center gap-3">
                <span className="text-3xl">💡</span>
                <p className="text-gray-700 font-bold flex-1">{selected.funFact}</p>
              </div>

              <button
                onClick={() => speak(`${selected.name}. ${selected.description} ${selected.funFact}`)}
                className="btn-kid bg-kid-blue hover:bg-kid-blueDark w-full mt-4 py-3 flex items-center justify-center gap-2"
              >
                <Volume2 className="w-5 h-5" />
                استمع للقصة
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
