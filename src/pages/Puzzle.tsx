import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Puzzle as PuzzleIcon, ArrowRight, RotateCcw, Trophy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { playClick, playSuccess, fireConfetti, speak } from '@/utils/effects';

interface Piece {
  id: number;
  pos: number;
}

const SIZE = 3;
const TOTAL = SIZE * SIZE;

function shuffle(): Piece[] {
  const arr: Piece[] = Array.from({ length: TOTAL }, (_, i) => ({ id: i, pos: i }));
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i].pos, arr[j].pos] = [arr[j].pos, arr[i].pos];
  }
  // Make sure not already solved
  if (arr.every((p) => p.id === p.pos)) arr[0].pos = 1;
  return arr;
}

export default function Puzzle() {
  const [pieces, setPieces] = useState<Piece[]>(shuffle);
  const [moves, setMoves] = useState(0);
  const [solved, setSolved] = useState(false);
  const [selectedPos, setSelectedPos] = useState<number | null>(null);

  const grid = useMemo(() => {
    const g: (Piece | null)[] = new Array(TOTAL).fill(null);
    pieces.forEach((p) => {
      g[p.pos] = p;
    });
    return g;
  }, [pieces]);

  const isSolved = useMemo(() => pieces.every((p) => p.id === p.pos), [pieces]);

  const swap = useCallback(
    (posA: number, posB: number) => {
      if (posA === posB) return;
      setPieces((prev) => {
        const next = prev.map((p) => ({ ...p }));
        const a = next.find((p) => p.pos === posA);
        const b = next.find((p) => p.pos === posB);
        if (a && b) {
          [a.pos, b.pos] = [b.pos, a.pos];
        }
        return next;
      });
      setMoves((m) => m + 1);
      playClick();
    },
    [],
  );

  function handleClick(pos: number): void {
    if (solved) return;
    if (selectedPos === null) {
      setSelectedPos(pos);
      playClick();
    } else {
      swap(selectedPos, pos);
      setSelectedPos(null);
    }
  }

  // Detect solved after move
  useMemo(() => {
    if (isSolved && !solved && moves > 0) {
      setSolved(true);
      playSuccess();
      fireConfetti();
      speak('أحسنت! لقد ركّبت اللغز بنجاح!');
    }
  }, [isSolved, solved, moves]);

  function restart(): void {
    playClick();
    setPieces(shuffle());
    setMoves(0);
    setSolved(false);
    setSelectedPos(null);
  }

  // Tile colors form a gradient of Damascus scene (mosaic)
  const tileColors = useMemo(() => {
    const colors: string[] = [
      '#4fc3f7', '#81d4fa', '#b3e5fc',
      '#66bb6a', '#a5d6a7', '#c8e6c9',
      '#ffa726', '#ffcc80', '#ffe0b2',
    ];
    return colors;
  }, []);

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
          <span className="bg-white rounded-full px-4 py-1.5 font-bold text-gray-700 shadow">
            نقلات: {moves}
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
        <div className="inline-flex items-center gap-2 bg-kid-blue text-white rounded-full px-4 py-1.5 font-bold mb-2">
          <PuzzleIcon className="w-5 h-5" />
          تركيب الألغاز
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800">
          رتّب قطع معلم دمشق!
        </h1>
        <p className="text-gray-600 font-semibold mt-1 text-sm">
          اضغط على قطعتين لتبديل أماكنهما حتى تعود الصورة كما كانت
        </p>
      </motion.div>

      <div className="bg-white rounded-4xl p-4 md:p-6 shadow-kid">
        <div
          className="grid gap-2 mx-auto"
          style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)`, maxWidth: '420px' }}
        >
          {grid.map((piece, pos) => (
            <motion.button
              key={pos}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleClick(pos)}
              className={`aspect-square rounded-2xl flex items-center justify-center text-3xl font-extrabold transition-all ${
                selectedPos === pos
                  ? 'ring-4 ring-kid-orange scale-105'
                  : 'ring-0'
              }`}
              style={{
                backgroundColor: piece ? tileColors[piece.id] : '#f5f5f5',
                color: 'rgba(255,255,255,0.9)',
              }}
            >
              {piece ? piece.id + 1 : ''}
            </motion.button>
          ))}
        </div>

        {/* Reference */}
        <div className="mt-5 bg-kid-gradient rounded-2xl p-3 text-center">
          <p className="text-gray-700 font-bold text-sm">
            الترتيب الصحيح: من 1 إلى {TOTAL}
          </p>
          <div className="flex justify-center gap-1 mt-2 flex-wrap">
            {tileColors.map((c, i) => (
              <span
                key={i}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                style={{ backgroundColor: c }}
              >
                {i + 1}
              </span>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {solved && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          >
            <motion.div
              className="bg-white rounded-4xl p-8 text-center max-w-sm w-full"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
            >
              <motion.span
                className="text-8xl block"
                animate={{ rotate: [0, 20, -20, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🧩
              </motion.span>
              <h2 className="text-2xl font-extrabold text-kid-blueDark mt-4">لغز مكتمل!</h2>
              <p className="text-gray-700 font-bold mt-2">
                ركّبت اللغز في {moves} نقلة!
              </p>
              <div className="flex items-center justify-center gap-2 text-kid-greenDark font-bold mt-3">
                <Check className="w-5 h-5" />
                <Trophy className="w-5 h-5" />
                عمل رائع
              </div>
              <button
                onClick={restart}
                className="btn-kid bg-kid-blue hover:bg-kid-blueDark w-full mt-5 py-3"
              >
                العب مرة أخرى
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
