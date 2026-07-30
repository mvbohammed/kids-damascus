import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, ArrowRight, RotateCcw, Trophy, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { playClick, playPop, playSuccess, playError, fireConfetti, speak } from '@/utils/effects';

interface Card {
  id: number;
  emoji: string;
  pairId: number;
  flipped: boolean;
  matched: boolean;
}

const cardEmojis = ['🕌', '🏰', '🛍️', '🚪', '🚂', '🏡', '⛲', '🗺️'];

function shuffleCards(): Card[] {
  const pairs = cardEmojis.length;
  const cards: Card[] = [];
  for (let i = 0; i < pairs; i++) {
    cards.push({ id: i * 2, emoji: cardEmojis[i], pairId: i, flipped: false, matched: false });
    cards.push({ id: i * 2 + 1, emoji: cardEmojis[i], pairId: i, flipped: false, matched: false });
  }
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

export default function Memory() {
  const [cards, setCards] = useState<Card[]>(shuffleCards);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [busy, setBusy] = useState(false);
  const [won, setWon] = useState(false);
  const [bestMoves, setBestMoves] = useState<number | null>(null);

  const totalPairs = cardEmojis.length;

  const handleFlip = useCallback(
    (idx: number) => {
      if (busy) return;
      setCards((prev) => {
        if (prev[idx].flipped || prev[idx].matched) return prev;
        const next = [...prev];
        next[idx] = { ...next[idx], flipped: true };
        return next;
      });
      setFlipped((prev) => [...prev, idx]);
      playPop();
    },
    [busy],
  );

  useEffect(() => {
    if (flipped.length !== 2) return;
    setBusy(true);
    setMoves((m) => m + 1);
    const [a, b] = flipped;
    const cardA = cards[a];
    const cardB = cards[b];

    if (cardA.pairId === cardB.pairId) {
      // match
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c, i) =>
            i === a || i === b ? { ...c, matched: true } : c,
          ),
        );
        setMatchedPairs((p) => p + 1);
        setFlipped([]);
        setBusy(false);
        playSuccess();
      }, 500);
    } else {
      // no match — flip back
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c, i) =>
            i === a || i === b ? { ...c, flipped: false } : c,
          ),
        );
        setFlipped([]);
        setBusy(false);
        playError();
      }, 1000);
    }
  }, [flipped, cards]);

  useEffect(() => {
    if (matchedPairs === totalPairs && !won) {
      setWon(true);
      fireConfetti();
      speak('أحسنت! لقد طابقت كل البطاقات!');
      setBestMoves((prev) => (prev === null ? moves : Math.min(prev, moves)));
    }
  }, [matchedPairs, totalPairs, won, moves]);

  function restart(): void {
    playClick();
    setCards(shuffleCards());
    setFlipped([]);
    setMoves(0);
    setMatchedPairs(0);
    setBusy(false);
    setWon(false);
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
          {bestMoves !== null && (
            <span className="bg-kid-yellow text-kid-orangeDark rounded-full px-3 py-1.5 font-bold text-sm flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              أفضل: {bestMoves}
            </span>
          )}
          <span className="bg-white rounded-full px-4 py-1.5 font-bold text-gray-700 shadow">
            <Zap className="w-4 h-4 inline ml-1 text-kid-orange" />
            {moves} محاولة
          </span>
          <button
            onClick={restart}
            className="bg-kid-orange text-white rounded-full px-3 py-1.5 font-bold flex items-center gap-1"
          >
            <RotateCcw className="w-4 h-4" />
            جديد
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-5"
      >
        <div className="inline-flex items-center gap-2 bg-kid-purple text-white rounded-full px-4 py-1.5 font-bold mb-2">
          <Brain className="w-5 h-5" />
          لعبة الذاكرة
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800">
          طابق بطاقات المعالم!
        </h1>
        <p className="text-gray-600 font-semibold mt-1 text-sm">
          اقلب البطاقات ووجد الزوج المتطابق
        </p>
      </motion.div>

      {/* Progress */}
      <div className="bg-white rounded-full h-3 overflow-hidden mb-5 shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-l from-kid-purple to-kid-pink"
          initial={{ width: 0 }}
          animate={{ width: `${(matchedPairs / totalPairs) * 100}%` }}
        />
      </div>
      <p className="text-center text-gray-600 font-bold mb-5">
        طابقت {matchedPairs} من {totalPairs} أزواج
      </p>

      {/* Cards grid */}
      <div className="grid grid-cols-4 gap-2 md:gap-3">
        {cards.map((card, idx) => (
          <motion.button
            key={card.id}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleFlip(idx)}
            disabled={card.matched || card.flipped || busy}
            className="aspect-square relative"
            style={{ perspective: '600px' }}
          >
            <motion.div
              className="relative w-full h-full rounded-2xl"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: card.flipped || card.matched ? 180 : 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Back */}
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-kid-blue to-kid-purple flex items-center justify-center shadow-md"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <span className="text-3xl md:text-4xl">❓</span>
              </div>
              {/* Front */}
              <div
                className={`absolute inset-0 rounded-2xl flex items-center justify-center shadow-md ${
                  card.matched ? 'bg-kid-green/30 ring-4 ring-kid-green' : 'bg-white'
                }`}
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <span className={`text-4xl md:text-5xl ${card.matched ? 'opacity-100' : ''}`}>
                  {card.emoji}
                </span>
              </div>
            </motion.div>
          </motion.button>
        ))}
      </div>

      {/* Win modal */}
      <AnimatePresence>
        {won && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={restart}
          >
            <motion.div
              className="bg-white rounded-4xl p-8 text-center max-w-sm w-full"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.span
                className="text-8xl block"
                animate={{ rotate: [0, 20, -20, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🧠
              </motion.span>
              <h2 className="text-2xl font-extrabold text-kid-purpleDark mt-4">ذاكرة قوية!</h2>
              <p className="text-gray-700 font-bold mt-2">
                طابقت كل الأزواج في {moves} محاولة!
              </p>
              {bestMoves === moves && (
                <p className="text-kid-orangeDark font-extrabold mt-2">🏆 رقم قياسي جديد!</p>
              )}
              <button
                onClick={restart}
                className="btn-kid bg-kid-purple hover:bg-kid-purpleDark w-full mt-5 py-3 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                العب مرة أخرى
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
