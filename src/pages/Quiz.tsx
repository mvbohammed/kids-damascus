import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Check, X, Trophy, RotateCcw, ArrowRight, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { quizQuestions } from '@/data/content';
import { playClick, playSuccess, playError, fireConfetti, speak } from '@/utils/effects';

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [streak, setStreak] = useState(0);

  const q = quizQuestions[current];

  function choose(idx: number): void {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === q.answer) {
      setScore((s) => s + 1);
      setStreak((st) => st + 1);
      playSuccess();
      fireConfetti();
      speak('إجابة صحيحة! أحسنت!');
    } else {
      setStreak(0);
      playError();
    }
  }

  function next(): void {
    playClick();
    if (current < quizQuestions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  }

  function restart(): void {
    playClick();
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setStreak(0);
    setShowResult(false);
  }

  if (showResult) {
    const perfect = score === quizQuestions.length;
    return (
      <div className="max-w-lg mx-auto px-4 py-10 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 150 }}
          className="bg-white rounded-4xl p-8 shadow-kid"
        >
          <motion.span
            className="text-8xl block"
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {perfect ? '🏆' : score >= 3 ? '🎉' : '😊'}
          </motion.span>
          <h2 className="text-3xl font-extrabold text-gray-800 mt-4">
            {perfect ? 'بطل دمشق!' : 'أحسنت!'}
          </h2>
          <p className="text-xl text-gray-700 font-bold mt-3">
            أجبت عن {score} من {quizQuestions.length} أسئلة بشكل صحيح
          </p>
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: quizQuestions.length }).map((_, i) => (
              <span
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  i < score ? 'bg-kid-green text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {i < score ? '✓' : '✗'}
              </span>
            ))}
          </div>
          <button
            onClick={restart}
            className="btn-kid bg-kid-orange hover:bg-kid-orangeDark w-full mt-6 py-3 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            العب مرة أخرى
          </button>
          <Link
            to="/activities"
            onClick={playClick}
            className="inline-flex items-center gap-2 text-gray-600 font-bold mt-4"
          >
            <ArrowRight className="w-4 h-4" />
            العودة للأنشطة
          </Link>
        </motion.div>
      </div>
    );
  }

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
        <div className="flex items-center gap-3">
          {streak >= 2 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-kid-orange text-white rounded-full px-3 py-1 font-bold text-sm"
            >
              🔥 {streak} متتالية
            </motion.span>
          )}
          <span className="bg-kid-green text-white rounded-full px-4 py-1.5 font-bold">
            <Trophy className="w-4 h-4 inline ml-1" /> {score}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-full h-3 overflow-hidden mb-6 shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-l from-kid-green to-kid-blue"
          initial={{ width: 0 }}
          animate={{ width: `${((current + 1) / quizQuestions.length) * 100}%` }}
        />
      </div>
      <p className="text-center text-gray-600 font-bold mb-4">
        السؤال {current + 1} من {quizQuestions.length}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="bg-white rounded-4xl p-6 md:p-8 shadow-kid"
        >
          <div className="flex items-center gap-2 text-kid-blueDark font-extrabold mb-4">
            <Brain className="w-6 h-6" />
            <span>سؤال</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-gray-800 mb-6">
            {q.question}
          </h2>

          <div className="grid grid-cols-1 gap-3">
            {q.options.map((opt, idx) => {
              const isCorrect = idx === q.answer;
              const isPicked = idx === selected;
              let cls = 'bg-gray-100 hover:bg-gray-200 text-gray-700';
              if (answered && isCorrect) cls = 'bg-kid-green text-white scale-105';
              else if (answered && isPicked && !isCorrect) cls = 'bg-kid-red text-white';
              else if (answered) cls = 'bg-gray-100 text-gray-400 opacity-60';
              return (
                <motion.button
                  key={idx}
                  whileTap={{ scale: 0.95 }}
                  disabled={answered}
                  onClick={() => choose(idx)}
                  className={`rounded-2xl px-5 py-4 font-bold text-lg text-right transition-all flex items-center justify-between ${cls}`}
                >
                  <span>{opt}</span>
                  {answered && isCorrect && <Check className="w-5 h-5" />}
                  {answered && isPicked && !isCorrect && <X className="w-5 h-5" />}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {answered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4"
              >
                {selected === q.answer ? (
                  <div className="bg-kid-green/20 rounded-2xl p-4 text-center">
                    <p className="text-kid-greenDark font-extrabold text-lg">✓ إجابة صحيحة!</p>
                  </div>
                ) : (
                  <div className="bg-kid-yellow/30 rounded-2xl p-4 flex items-center gap-3">
                    <Volume2 className="w-5 h-5 text-kid-orangeDark shrink-0" />
                    <p className="text-gray-700 font-bold">{q.hint}</p>
                  </div>
                )}
                <button
                  onClick={next}
                  className="btn-kid bg-kid-blue hover:bg-kid-blueDark w-full mt-4 py-3 flex items-center justify-center gap-2"
                >
                  {current < quizQuestions.length - 1 ? 'السؤال التالي' : 'النتيجة'}
                  <ArrowRight className="w-5 h-5 rotate-180" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
